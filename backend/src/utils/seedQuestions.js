import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/Question.js";

dotenv.config();

const questions = [
  // BEGINNER QUESTIONS (10)
  {
    questionId: 1,
    category: "vocabulary",
    difficulty: "beginner",
    questionText: "What does 'Hello' mean?",
    options: [
      { id: "A", text: "Goodbye", isCorrect: false },
      { id: "B", text: "A greeting when you meet someone", isCorrect: true },
      { id: "C", text: "Thank you", isCorrect: false },
      { id: "D", text: "I don't know", isCorrect: false },
    ],
    correctAnswer: "B",
    points: 1,
  },
  {
    questionId: 2,
    category: "grammar",
    difficulty: "beginner",
    questionText: "Choose the correct sentence:",
    options: [
      { id: "A", text: "She go to school every day", isCorrect: false },
      { id: "B", text: "She goes to school every day", isCorrect: true },
      { id: "C", text: "She going to school every day", isCorrect: false },
      { id: "D", text: "She gone to school every day", isCorrect: false },
    ],
    correctAnswer: "B",
    points: 1,
  },
  {
    questionId: 3,
    category: "vocabulary",
    difficulty: "beginner",
    questionText: "What is the opposite of 'hot'?",
    options: [
      { id: "A", text: "Warm", isCorrect: false },
      { id: "B", text: "Cold", isCorrect: true },
      { id: "C", text: "Big", isCorrect: false },
      { id: "D", text: "Fast", isCorrect: false },
    ],
    correctAnswer: "B",
    points: 1,
  },
  {
    questionId: 4,
    category: "reading",
    difficulty: "beginner",
    questionText: "Read: 'The cat is sleeping on the sofa.' Where is the cat?",
    options: [
      { id: "A", text: "Under the sofa", isCorrect: false },
      { id: "B", text: "On the sofa", isCorrect: true },
      { id: "C", text: "Next to the sofa", isCorrect: false },
      { id: "D", text: "Behind the sofa", isCorrect: false },
    ],
    correctAnswer: "B",
    points: 1,
  },
  {
    questionId: 5,
    category: "grammar",
    difficulty: "beginner",
    questionText: "Complete: 'I ___ a student.'",
    options: [
      { id: "A", text: "am", isCorrect: true },
      { id: "B", text: "is", isCorrect: false },
      { id: "C", text: "are", isCorrect: false },
      { id: "D", text: "be", isCorrect: false },
    ],
    correctAnswer: "A",
    points: 1,
  },
  {
    questionId: 6,
    category: "vocabulary",
    difficulty: "beginner",
    questionText: "What does 'breakfast' mean?",
    options: [
      { id: "A", text: "The meal you eat in the morning", isCorrect: true },
      { id: "B", text: "The meal you eat at night", isCorrect: false },
      { id: "C", text: "A type of bread", isCorrect: false },
      { id: "D", text: "A break from work", isCorrect: false },
    ],
    correctAnswer: "A",
    points: 1,
  },
  {
    questionId: 7,
    category: "grammar",
    difficulty: "beginner",
    questionText: "Choose the correct form: 'We ___ friends.'",
    options: [
      { id: "A", text: "am", isCorrect: false },
      { id: "B", text: "is", isCorrect: false },
      { id: "C", text: "are", isCorrect: true },
      { id: "D", text: "be", isCorrect: false },
    ],
    correctAnswer: "C",
    points: 1,
  },
  {
    questionId: 8,
    category: "vocabulary",
    difficulty: "beginner",
    questionText: "What color is the sky on a clear day?",
    options: [
      { id: "A", text: "Green", isCorrect: false },
      { id: "B", text: "Blue", isCorrect: true },
      { id: "C", text: "Red", isCorrect: false },
      { id: "D", text: "Yellow", isCorrect: false },
    ],
    correctAnswer: "B",
    points: 1,
  },
  {
    questionId: 9,
    category: "reading",
    difficulty: "beginner",
    questionText: "'I like pizza.' What do I like?",
    options: [
      { id: "A", text: "Burger", isCorrect: false },
      { id: "B", text: "Pizza", isCorrect: true },
      { id: "C", text: "Pasta", isCorrect: false },
      { id: "D", text: "Salad", isCorrect: false },
    ],
    correctAnswer: "B",
    points: 1,
  },
  {
    questionId: 10,
    category: "grammar",
    difficulty: "beginner",
    questionText: "What is the plural of 'book'?",
    options: [
      { id: "A", text: "book", isCorrect: false },
      { id: "B", text: "books", isCorrect: true },
      { id: "C", text: "bookes", isCorrect: false },
      { id: "D", text: "bookies", isCorrect: false },
    ],
    correctAnswer: "B",
    points: 1,
  },

  // INTERMEDIATE QUESTIONS (10)
  {
    questionId: 11,
    category: "grammar",
    difficulty: "intermediate",
    questionText: "Complete: 'Right now, they ___ watching TV.'",
    options: [
      { id: "A", text: "is", isCorrect: false },
      { id: "B", text: "am", isCorrect: false },
      { id: "C", text: "are", isCorrect: true },
      { id: "D", text: "was", isCorrect: false },
    ],
    correctAnswer: "C",
    points: 1,
  },
  {
    questionId: 12,
    category: "grammar",
    difficulty: "intermediate",
    questionText: "Which sentence is correct?",
    options: [
      { id: "A", text: "You must to study hard", isCorrect: false },
      { id: "B", text: "You must studying hard", isCorrect: false },
      { id: "C", text: "You must study hard", isCorrect: true },
      { id: "D", text: "You must studies hard", isCorrect: false },
    ],
    correctAnswer: "C",
    points: 1,
  },
  {
    questionId: 13,
    category: "vocabulary",
    difficulty: "intermediate",
    questionText: "'She felt exhausted after running.' What does 'exhausted' mean?",
    options: [
      { id: "A", text: "Happy", isCorrect: false },
      { id: "B", text: "Excited", isCorrect: false },
      { id: "C", text: "Very tired", isCorrect: true },
      { id: "D", text: "Hungry", isCorrect: false },
    ],
    correctAnswer: "C",
    points: 1,
  },
  {
    questionId: 14,
    category: "grammar",
    difficulty: "intermediate",
    questionText: "Yesterday, I ___ to the park.",
    options: [
      { id: "A", text: "go", isCorrect: false },
      { id: "B", text: "goes", isCorrect: false },
      { id: "C", text: "went", isCorrect: true },
      { id: "D", text: "going", isCorrect: false },
    ],
    correctAnswer: "C",
    points: 1,
  },
  {
    questionId: 15,
    category: "vocabulary",
    difficulty: "intermediate",
    questionText: "What does 'purchase' mean?",
    options: [
      { id: "A", text: "To sell", isCorrect: false },
      { id: "B", text: "To buy", isCorrect: true },
      { id: "C", text: "To give", isCorrect: false },
      { id: "D", text: "To borrow", isCorrect: false },
    ],
    correctAnswer: "B",
    points: 1,
  },
  {
    questionId: 16,
    category: "grammar",
    difficulty: "intermediate",
    questionText: "She has ___ to Paris twice.",
    options: [
      { id: "A", text: "go", isCorrect: false },
      { id: "B", text: "went", isCorrect: false },
      { id: "C", text: "been", isCorrect: true },
      { id: "D", text: "going", isCorrect: false },
    ],
    correctAnswer: "C",
    points: 1,
  },
  {
    questionId: 17,
    category: "reading",
    difficulty: "intermediate",
    questionText: "'Despite the rain, we enjoyed the picnic.' What does this mean?",
    options: [
      { id: "A", text: "We didn't go because of rain", isCorrect: false },
      { id: "B", text: "We enjoyed the picnic even though it rained", isCorrect: true },
      { id: "C", text: "The rain stopped before the picnic", isCorrect: false },
      { id: "D", text: "We didn't enjoy the picnic", isCorrect: false },
    ],
    correctAnswer: "B",
    points: 1,
  },
  {
    questionId: 18,
    category: "grammar",
    difficulty: "intermediate",
    questionText: "If I ___ you, I would apologize.",
    options: [
      { id: "A", text: "am", isCorrect: false },
      { id: "B", text: "was", isCorrect: false },
      { id: "C", text: "were", isCorrect: true },
      { id: "D", text: "be", isCorrect: false },
    ],
    correctAnswer: "C",
    points: 1,
  },
  {
    questionId: 19,
    category: "vocabulary",
    difficulty: "intermediate",
    questionText: "What does 'abandon' mean?",
    options: [
      { id: "A", text: "To keep", isCorrect: false },
      { id: "B", text: "To leave behind", isCorrect: true },
      { id: "C", text: "To find", isCorrect: false },
      { id: "D", text: "To protect", isCorrect: false },
    ],
    correctAnswer: "B",
    points: 1,
  },
  {
    questionId: 20,
    category: "grammar",
    difficulty: "intermediate",
    questionText: "The book ___ by millions of people.",
    options: [
      { id: "A", text: "read", isCorrect: false },
      { id: "B", text: "reads", isCorrect: false },
      { id: "C", text: "was read", isCorrect: true },
      { id: "D", text: "reading", isCorrect: false },
    ],
    correctAnswer: "C",
    points: 1,
  },

  // ADVANCED QUESTIONS (10)
  {
    questionId: 21,
    category: "grammar",
    difficulty: "advanced",
    questionText: "Choose the correct sentence:",
    options: [
      { id: "A", text: "When I arrived, they already left", isCorrect: false },
      { id: "B", text: "When I arrived, they have already left", isCorrect: false },
      { id: "C", text: "When I arrived, they had already left", isCorrect: true },
      { id: "D", text: "When I arrived, they already leave", isCorrect: false },
    ],
    correctAnswer: "C",
    points: 1,
  },
  {
    questionId: 22,
    category: "grammar",
    difficulty: "advanced",
    questionText: "Which conditional sentence is correct?",
    options: [
      { id: "A", text: "If I will see him, I will tell him", isCorrect: false },
      { id: "B", text: "If I see him, I will tell him", isCorrect: true },
      { id: "C", text: "If I saw him, I will tell him", isCorrect: false },
      { id: "D", text: "If I seen him, I will tell him", isCorrect: false },
    ],
    correctAnswer: "B",
    points: 1,
  },
  {
    questionId: 23,
    category: "idioms",
    difficulty: "advanced",
    questionText: "'It's raining cats and dogs.' What does this mean?",
    options: [
      { id: "A", text: "Animals are falling", isCorrect: false },
      { id: "B", text: "It's raining very heavily", isCorrect: true },
      { id: "C", text: "The weather is nice", isCorrect: false },
      { id: "D", text: "There are animals outside", isCorrect: false },
    ],
    correctAnswer: "B",
    points: 1,
  },
  {
    questionId: 24,
    category: "grammar",
    difficulty: "advanced",
    questionText: "By next year, she ___ her degree.",
    options: [
      { id: "A", text: "completes", isCorrect: false },
      { id: "B", text: "will complete", isCorrect: false },
      { id: "C", text: "will have completed", isCorrect: true },
      { id: "D", text: "completed", isCorrect: false },
    ],
    correctAnswer: "C",
    points: 1,
  },
  {
    questionId: 25,
    category: "vocabulary",
    difficulty: "advanced",
    questionText: "What does 'meticulous' mean?",
    options: [
      { id: "A", text: "Careless", isCorrect: false },
      { id: "B", text: "Very careful and precise", isCorrect: true },
      { id: "C", text: "Fast", isCorrect: false },
      { id: "D", text: "Lazy", isCorrect: false },
    ],
    correctAnswer: "B",
    points: 1,
  },
  {
    questionId: 26,
    category: "grammar",
    difficulty: "advanced",
    questionText: "The report ___ before the meeting starts.",
    options: [
      { id: "A", text: "must finish", isCorrect: false },
      { id: "B", text: "must be finished", isCorrect: true },
      { id: "C", text: "must finishing", isCorrect: false },
      { id: "D", text: "must to finish", isCorrect: false },
    ],
    correctAnswer: "B",
    points: 1,
  },
  {
    questionId: 27,
    category: "idioms",
    difficulty: "advanced",
    questionText: "'Break the ice' means:",
    options: [
      { id: "A", text: "To make people feel more relaxed", isCorrect: true },
      { id: "B", text: "To break something frozen", isCorrect: false },
      { id: "C", text: "To start a fight", isCorrect: false },
      { id: "D", text: "To leave early", isCorrect: false },
    ],
    correctAnswer: "A",
    points: 1,
  },
  {
    questionId: 28,
    category: "grammar",
    difficulty: "advanced",
    questionText: "I wish I ___ more time yesterday.",
    options: [
      { id: "A", text: "have", isCorrect: false },
      { id: "B", text: "had", isCorrect: false },
      { id: "C", text: "had had", isCorrect: true },
      { id: "D", text: "have had", isCorrect: false },
    ],
    correctAnswer: "C",
    points: 1,
  },
  {
    questionId: 29,
    category: "vocabulary",
    difficulty: "advanced",
    questionText: "What does 'eloquent' mean?",
    options: [
      { id: "A", text: "Unable to speak", isCorrect: false },
      { id: "B", text: "Speaking fluently and persuasively", isCorrect: true },
      { id: "C", text: "Very quiet", isCorrect: false },
      { id: "D", text: "Confusing", isCorrect: false },
    ],
    correctAnswer: "B",
    points: 1,
  },
  {
    questionId: 30,
    category: "grammar",
    difficulty: "advanced",
    questionText: "Hardly ___ the door when the phone rang.",
    options: [
      { id: "A", text: "I opened", isCorrect: false },
      { id: "B", text: "had I opened", isCorrect: true },
      { id: "C", text: "I had opened", isCorrect: false },
      { id: "D", text: "did I open", isCorrect: false },
    ],
    correctAnswer: "B",
    points: 1,
  },
];

const seedQuestions = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected\n");

    console.log("🗑️  Clearing existing questions...");
    await Question.deleteMany({});
    console.log("✅ Cleared\n");

    console.log("📝 Inserting 30 questions...");
    await Question.insertMany(questions);
    console.log("✅ Inserted\n");

    const beginnerCount = questions.filter(q => q.difficulty === 'beginner').length;
    const intermediateCount = questions.filter(q => q.difficulty === 'intermediate').length;
    const advancedCount = questions.filter(q => q.difficulty === 'advanced').length;

    console.log("📊 Summary:");
    console.log(`   🟢 Beginner: ${beginnerCount}`);
    console.log(`   🟡 Intermediate: ${intermediateCount}`);
    console.log(`   🔴 Advanced: ${advancedCount}`);
    console.log(`   📚 Total: ${questions.length}\n`);

    console.log("✅ Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

seedQuestions();