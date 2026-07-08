import dotenv from "dotenv";

import Question from "../models/Question.js";

import mongoose from "mongoose";

import fs from "fs";



dotenv.config();

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const data = JSON.parse(
      fs.readFileSync("./seed/questions.json", "utf-8")
    );

    await Question.deleteMany();

    await Question.insertMany(data);

    console.log("Data Imported Successfully");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

importData();