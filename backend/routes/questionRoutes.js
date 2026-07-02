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
  try {
    const count = Math.min(parseInt(req.query.count, 10) || 6, 30);

    const questions = await Question.aggregate([{ $sample: { size: count } }]);

    // Never leak the answer index to the client before submission.
    const sanitized = questions.map((q) => ({
      id: q._id,
      subject: q.subject,
      text: q.text,
      options: q.options,
    }));

    res.json(sanitized);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/", protect, async (req, res) => {
  const questions = await Question.find().sort({ createdAt: -1 });
  res.json(questions);
});

// POST /api/questions (add a new question to the bank)
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
