import express from "express";
import Question from "../models/Question.js";
import Attempt from "../models/Attempt.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { answers = [], seconds = 0 } = req.body;
    console.log("Received answers:", answers);

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "answers array is required" });
    }

    const ids = answers.map((a) => a.questionId);
    console.log("IDs received:", ids);

    const questions = await Question.find({
      _id: { $in: ids },
    });
    console.log("Questions found:", questions.length);

questions.forEach((q) => {
  console.log("DB Question ID:", q._id.toString());
});

ids.forEach((id) => {
  console.log("Received ID:", id);
});
    console.log("IDs:", ids);
console.log("Questions found:", questions.length);

    console.log("Questions found:", questions);
console.log("Questions length:", questions.length);

    const byId = new Map(
      questions.map((q) => [q._id.toString(), q])
    );

    let correctCount = 0;

    const gradedAnswers = answers
      .map((a) => {
        const q = byId.get(String(a.questionId));

        if (!q) return null;

        const isCorrect = a.picked === q.answer;

        if (isCorrect) correctCount++;

        return {
          question: q._id,
          subject: q.subject,
          picked: a.picked ?? null,
          correctIndex: q.answer,
          isCorrect,
        };
      })
      .filter(Boolean);

    console.log("Questions found:", questions.length);
    console.log("Graded answers:", gradedAnswers.length);

    const totalQuestions = gradedAnswers.length;

    const scorePct =
      totalQuestions > 0
        ? Math.round((correctCount / totalQuestions) * 100)
        : 0;

    const attempt = await Attempt.create({
      user: req.user._id,
      total: totalQuestions,
      correct: correctCount,
      scorePct,
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
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/", protect, async (req, res) => {
  const attempts = await Attempt.find({
    user: req.user._id,
  })
    .sort({ createdAt: 1 })
    .select("-answers.question");

  res.json(attempts);
});

router.get("/progress", protect, async (req, res) => {
  const attempts = await Attempt.find({
    user: req.user._id,
  });

  const bySubject = {};

  attempts.forEach((a) => {
    a.answers.forEach((ans) => {
      if (!bySubject[ans.subject]) {
        bySubject[ans.subject] = {
          correct: 0,
          total: 0,
        };
      }

      bySubject[ans.subject].total++;

      if (ans.isCorrect) {
        bySubject[ans.subject].correct++;
      }
    });
  });

  res.json({
    bySubject,
    scoreTrend: attempts.map((a) => a.scorePct),
  });
});

export default router;