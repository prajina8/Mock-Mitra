import express from "express";
import Question from "../models/Question.js";
import protect from "../middleware/auth.js";

const router = express.Router();

export const SUBJECTS = [
  { id: "gk", name: "General Knowledge"  },
  { id: "nepal", name: "Nepal Affairs" },
  { id: "math", name: "Mental Ability"},
  { id: "constitution", name: "Constitution" },
];


router.get("/subjects", protect, (req, res) => {
  res.json(SUBJECTS);
});


router.get("/probable", protect, async (req, res) => {
  console.log(" /probable route called");

  try {
    const count = Math.min(parseInt(req.query.count, 10) || 6, 30);

    const total = await Question.countDocuments();
    console.log("Total questions:", total);

    const questions = await Question.aggregate([
      { $sample: { size: count } }
    ]);

    console.log("Returned:", questions.length);

    res.json(questions);
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


router.get("/", protect, async (req, res) => {
  const questions = await Question.find().sort({ createdAt: -1 });
  res.json(questions);
});


router.post("/", protect, async (req, res) => {
  try {
    const { subject, text, options, answer, difficulty } = req.body;
    const question = await Question.create({ subject, text, options, answer, difficulty });
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
