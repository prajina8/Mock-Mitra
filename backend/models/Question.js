import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      enum: ["gk", "nepal", "math", "constitution"],
    },
    text: { type: String, required: true },
    options: {
      type: [String],
      required: true,
      validate: (v) => v.length >= 2,
    },
    answer: { type: Number, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
