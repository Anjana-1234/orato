import express from "express";
import { getRandomQuestions, submitAssessment } from "../controllers/assessment-controller.js";

const router = express.Router();

// GET random questions for assessment
router.get("/questions", getRandomQuestions);

// POST submit assessment answers
router.post("/submit", submitAssessment);

export default router;