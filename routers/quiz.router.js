const express = require("express");
const router = express.Router();

const { Quiz } = require("../models/quiz.model");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const quizes = await Quiz.find({});
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
      const NewQuiz = new Question(quiz);
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
