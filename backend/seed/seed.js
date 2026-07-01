import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Question from "../models/Question.js";

dotenv.config();

const QUESTIONS = [
  {
    subject: "constitution",
    text: "How many provinces does Nepal have as per the current constitution?",
    options: ["5", "6", "7", "8"],
    answer: 2,
  },
  {
    subject: "nepal",
    text: "The Gandaki River originates from which region?",
    options: ["Mustang", "Manang", "Dolpa", "Rasuwa"],
    answer: 1,
  },
  {
    subject: "math",
    text: "If a train covers 60 km in 45 minutes, its speed in km/h is:",
    options: ["70", "75", "80", "85"],
    answer: 2,
  },
  {
    subject: "gk",
    text: "Who is regarded as the founder of modern Nepal?",
    options: ["Prithvi Narayan Shah", "Jung Bahadur Rana", "Bhimsen Thapa", "Surya Bahadur Thapa"],
    answer: 0,
  },
  {
    subject: "constitution",
    text: "The current Constitution of Nepal was promulgated in which year (B.S.)?",
    options: ["2070", "2072", "2074", "2076"],
    answer: 1,
  },
  {
    subject: "math",
    text: "What is 15% of 480?",
    options: ["62", "68", "72", "76"],
    answer: 2,
  },
  {
    subject: "nepal",
    text: "Which is the highest peak entirely within Nepal's territory?",
    options: ["Everest", "Kanchenjunga", "Manaslu", "Annapurna I"],
    answer: 2,
  },
  {
    subject: "gk",
    text: "The headquarters of SAARC is located in:",
    options: ["New Delhi", "Kathmandu", "Dhaka", "Colombo"],
    answer: 1,
  },
  {
    subject: "constitution",
    text: "Which body is responsible for amending the Constitution of Nepal?",
    options: ["Supreme Court", "Federal Parliament", "Council of Ministers", "Election Commission"],
    answer: 1,
  },
  {
    subject: "math",
    text: "The next number in the series 2, 6, 12, 20, 30, __ is:",
    options: ["40", "42", "44", "36"],
    answer: 1,
  },
  {
    subject: "nepal",
    text: "Lumbini, the birthplace of Buddha, lies in which province?",
    options: ["Bagmati", "Gandaki", "Lumbini", "Madhesh"],
    answer: 2,
  },
  {
    subject: "gk",
    text: "Nepal became a member of the United Nations in which year?",
    options: ["1950", "1955", "1960", "1965"],
    answer: 1,
  },
];

async function seed() {
  await connectDB();
  await Question.deleteMany({});
  await Question.insertMany(QUESTIONS);
  console.log(`Seeded ${QUESTIONS.length} questions.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
