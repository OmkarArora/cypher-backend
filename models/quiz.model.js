const mongoose = require("mongoose");
require("mongoose-type-url");

const QuizSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Quiz name is required",
  },
  image: mongoose.SchemaTypes.Url,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

const Quiz = mongoose.model("Quiz", QuizSchema);
module.exports = { Quiz };
