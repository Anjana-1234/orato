import Question from "../models/Question.js";

/**
 * GET RANDOM QUESTIONS
 * Returns 10 random questions: 3 beginner, 4 intermediate, 3 advanced
 */
export const getRandomQuestions = async (req, res) => {
  try {
    console.log("📚 Fetching random questions...");

    // Get all active questions by difficulty
    const beginnerQuestions = await Question.find({
      difficulty: 'beginner',
      isActive: true,
    }).select('-correctAnswer -__v');

    const intermediateQuestions = await Question.find({
      difficulty: 'intermediate',
      isActive: true,
    }).select('-correctAnswer -__v');

    const advancedQuestions = await Question.find({
      difficulty: 'advanced',
      isActive: true,
    }).select('-correctAnswer -__v');

    console.log(`Found: ${beginnerQuestions.length} beginner, ${intermediateQuestions.length} intermediate, ${advancedQuestions.length} advanced`);

    // Shuffle array function
    const shuffleArray = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };

    // Select random questions
    const selectedBeginner = shuffleArray([...beginnerQuestions]).slice(0, 3);
    const selectedIntermediate = shuffleArray([...intermediateQuestions]).slice(0, 4);
    const selectedAdvanced = shuffleArray([...advancedQuestions]).slice(0, 3);

    // Combine and shuffle final set
    const finalQuestions = shuffleArray([
      ...selectedBeginner,
      ...selectedIntermediate,
      ...selectedAdvanced,
    ]);

    console.log(`✅ Returning ${finalQuestions.length} questions`);

    res.status(200).json({
      success: true,
      questions: finalQuestions,
      total: finalQuestions.length,
    });

  } catch (error) {
    console.error("❌ Error fetching questions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
    });
  }
};

/**
 * SUBMIT ASSESSMENT
 * Calculate score and skill level
 */
export const submitAssessment = async (req, res) => {
  try {
    const { answers } = req.body;

    console.log("📝 Submitting assessment with", answers.length, "answers");

    // Validate input
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Invalid answers format",
      });
    }

    // Get question IDs
    const questionIds = answers.map(a => a.questionId);

    // Fetch correct answers from database
    const questions = await Question.find({
      questionId: { $in: questionIds },
    });

    // Calculate score
    let correctCount = 0;
    const results = answers.map(answer => {
      const question = questions.find(q => q.questionId === answer.questionId);
      if (!question) return null;

      const isCorrect = question.correctAnswer === answer.selectedAnswer;
      if (isCorrect) correctCount++;

      return {
        questionId: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        difficulty: question.difficulty,
      };
    }).filter(Boolean);

    // Calculate skill level
    const totalQuestions = results.length;
    const score = correctCount;
    const percentage = (score / totalQuestions) * 100;

    let skillLevel;
    if (percentage < 40) {
      skillLevel = 'beginner';
    } else if (percentage < 70) {
      skillLevel = 'intermediate';
    } else {
      skillLevel = 'advanced';
    }

    console.log(`✅ Assessment complete: ${score}/${totalQuestions} (${percentage.toFixed(1)}%) - Level: ${skillLevel}`);

    res.status(200).json({
      success: true,
      score,
      totalQuestions,
      percentage: percentage.toFixed(1),
      skillLevel,
      results,
    });

  } catch (error) {
    console.error("❌ Error submitting assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit assessment",
    });
  }
};