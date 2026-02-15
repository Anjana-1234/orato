import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionId: {
    type: Number,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['vocabulary', 'grammar', 'reading', 'idioms'],
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      id: String,
      text: String,
      isCorrect: Boolean,
    }
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 1,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Question", questionSchema);