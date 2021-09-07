const express = require("express");
const router = express.Router();
const { extend } = require("lodash");
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
      res.status(500).json({
        success: false,
        message: "Unable to create question",
        errorMessage: error.message,
      });
    }
  });

router.param("questionId", async (req, res, next, questionId) => {
  try {
    const question = await Question.findById(questionId).select({ __v: 0 });
    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Error while retreiving the question",
        errorMessage: "Error while retreiving the question",
      });
    }
    req.question = question;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while retreiving the question",
      errorMessage: error.message,
    });
  }
});

router
  .route("/:questionId")
  .get((req, res) => {
    res.json({ success: true, question: req.question });
  })
  .post(async (req, res) => {
    try {
      const { questionUpdates } = req.body;
      let { question } = req;
      question = extend(question, questionUpdates);
      question = await question.save();
      return res.json({ success: true, question });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error while retreiving the question",
        errorMessage: error.message,
      });
    }
  });

module.exports = router;
