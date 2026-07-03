import express from "express";
import mongoose from "mongoose";
import Question from "../models/Question.js";
import Attempt from "../models/Attempt.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { answers = [], seconds = 0 } = req.body;
    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "answers array is required" });
    }

    const ids = answers.map((a) => a.questionId);
    const questions = await Question.find({ _id: { $in: ids } });
    const byId = new Map(questions.map((q) => [q._id.toString(), q]));

    let correctCount = 0;
    const gradedAnswers = answers.map((a) => {
      const q = byId.get(String(a.questionId));
      if (!q) return null;
      const isCorrect = a.picked === q.answer;
      if (isCorrect) correctCount += 1;
      return {
        question: q._id,
        subject: q.subject,
        picked: a.picked ?? null,
        correctIndex: q.answer,
        isCorrect,
      };
    }).filter(Boolean);
    const totalQuestions = gradedAnswers.length;

const scorePct =
  totalQuestions > 0
    ? Math.round((correctCount / totalQuestions) * 100)
    : 0;

    const attempt = await Attempt.create({
      user: req.user._id,
      total: gradedAnswers.length,
      correct: correctCount,
      
      scorePct: Math.round((correctCount / gradedAnswers.length) * 100),
      seconds,
      answers: gradedAnswers,
    });

    
    const reviewQuestions = gradedAnswers.map((ans) => {
      const q = byId.get(ans.question.toString());
      return {
        id: q._id,
        subject: q.subject,
        text: q.text,
        options: q.options,
        answer: q.answer,
        picked: ans.picked,
        isCorrect: ans.isCorrect,
      };
    });

    res.status(201).json({
      _id: attempt._id,
      date: attempt.createdAt,
      total: attempt.total,
      correct: attempt.correct,
      scorePct: attempt.scorePct,
      seconds: attempt.seconds,
      questions: reviewQuestions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/", protect, async (req, res) => {
  const attempts = await Attempt.find({ user: req.user._id })
    .sort({ createdAt: 1 })
    .select("-answers.question");
  res.json(attempts);
});


router.get("/progress", protect, async (req, res) => {
  const attempts = await Attempt.find({ user: req.user._id });

  const bySubject = {};
  attempts.forEach((a) => {
    a.answers.forEach((ans) => {
      bySubject[ans.subject] = bySubject[ans.subject] || { correct: 0, total: 0 };
      bySubject[ans.subject].total += 1;
      if (ans.isCorrect) bySubject[ans.subject].correct += 1;
    });
  });

  res.json({
    bySubject,
    scoreTrend: attempts.map((a) => a.scorePct),
  });
});

export default router;
