const mongoose = require("mongoose");
require("mongoose-type-url");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: "Question is required",
  },
  points: {
    type: Number,
    required: "Points required for scoring.",
  },
  image: mongoose.SchemaTypes.Url,
  options: [
    {
      text: { type: String, required: "Option text is required" },
      isCorrect: {
        type: Boolean,
        required: "Option correct status is required",
      },
    },
  ],
});

const Question = mongoose.model("Question", QuestionSchema);
module.exports = { Question };
