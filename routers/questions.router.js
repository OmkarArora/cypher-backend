const express = require("express");
const router = express.Router();

const { Question } = require("../models/question.model");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const questions = await Question.find({});
      res.json({ success: true, questions });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Unable to fetch questions",
        errorMessages: error.messages,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const question = req.body;
      const NewQuestion = new Question(question);
      const savedQuestion = await NewQuestion.save();
      savedQuestion.__v = undefined;
      res.json({ success: true, question: savedQuestion });
    } catch (error) {
      res.status(500).
        json({
          success: false,
          message: "Unable to create question",
          errorMessage: error.message,
        });
    }
  });

  module.exports = router;