const express = require("express");
const router = express.Router();
const { extend } = require("lodash");

const { Quiz } = require("../models/quiz.model");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const quizes = await Quiz.find({})
        .populate({ path: "questions", select: { __v: 0 } })
        .select({ __v: 0 });
      res.json({ success: true, quizes });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Unable to fetch quizes",
        errorMessages: error.messages,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const quiz = req.body;
      const NewQuiz = new Quiz(quiz);
      const savedQuiz = await NewQuiz.save();
      savedQuiz.__v = undefined;
      res.json({ success: true, quiz: savedQuiz });
    } catch (error) {
      res.status(500),
        json({
          success: false,
          message: "Unable to create quiz",
          errorMessage: error.message,
        });
    }
  });

router.param("quizId", async (req, res, next, quizId) => {
  try {
    const quiz = await Quiz.findById(quizId).select({ __v: 0 });
    if (!quiz) {
      return res.status(400).json({
        success: false,
        message: "Error while retreiving the quiz",
        errorMessage: "Error while retreiving the quiz",
      });
    }
    req.quiz = quiz;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while retreiving the quiz",
      errorMessage: error.message,
    });
  }
});

router
  .route("/:quizId")
  .get((req, res) => {
    res.json({ success: true, quiz: req.quiz });
  })
  .post(async (req, res) => {
    try {
      const { quizUpdates } = req.body;
      let { quiz } = req;
      quiz = extend(quiz, quizUpdates);
      quiz = await quiz.save();
      const populatedQuiz = await Quiz.find({ id: quiz._id })
        .populate("questions")
        .select({ __v: 0 });
      return res.json({ success: true, quiz: populatedQuiz });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error while retreiving quiz",
        errorMessage: error.message,
      });
    }
  });

router.route("/:quizId/add-question").post(async (req, res) => {
  try {
    const { question } = req.body;
    let { quiz } = req;
    quiz.questions = [...quiz.questions, question];
    quiz = await quiz.save();
    const populatedQuiz = await Quiz.find({ id: quiz._id })
      .populate("questions")
      .select({ __v: 0 });
    console.log({ populatedQuiz });
    return res.json({ success: true, quiz: populatedQuiz });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while retreiving quiz",
      errorMessage: error.message,
    });
  }
});

module.exports = router;
