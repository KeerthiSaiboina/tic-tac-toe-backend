const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ScoreSchema = new mongoose.Schema({
  winner: String,
  timestamp: { type: Date, default: Date.now },
});

const Score = mongoose.model("Score", ScoreSchema);

app.get("/api/scores", async (req, res) => {
  const scores = await Score.find().sort({ timestamp: -1 }).limit(5);
  res.json(scores);
});

app.post("/api/scores", async (req, res) => {
  const { winner } = req.body;
  const newScore = new Score({ winner });
  await newScore.save();
  res.json({ message: "Score saved!" });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
