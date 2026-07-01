import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    subject: { type: String, required: true },
    picked: { type: Number, default: null },
    correctIndex: { type: Number, required: true },
    isCorrect: { type: Boolean, required: true },
  },
  { _id: false }
);

const attemptSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    total: { type: Number, required: true },
    correct: { type: Number, required: true },
    scorePct: { type: Number, required: true },
    seconds: { type: Number, required: true },
    answers: [answerSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Attempt", attemptSchema);
