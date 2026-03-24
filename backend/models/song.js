const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy"
  },
  notes: [
    {
      note: String,
      time: Number
    }
  ]
});

module.exports = mongoose.model("Song", SongSchema);