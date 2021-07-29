require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initDBConnection } = require("./db.connect");

const app = express();
app.use(bodyParser.json());
app.use(cors());

initDBConnection();

const questionsRouter = require("./routers/questions.router");
app.use("/questions", questionsRouter);

const quizRouter = require("./routers/quiz.router");
app.use("/quiz", quizRouter);

app.get("/", (req, res) => {
  res.send("Connected to Cypher Quiz server");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log("SERVER STARTED on port: ", PORT);
});
