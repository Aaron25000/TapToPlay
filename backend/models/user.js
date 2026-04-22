const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  pin: {
    type: String,
    required: true
  },
  joinDate: {
    type: String
  },
  totalSongsPlayed: {
    type: Number
  },
  currentStreak: {
    type: Number
  },
  longestStreak: {
    type: Number
  },
  favoriteGenra: {
    type: String
  },
  level: {
    type: Number
  },
  experience: {
    type: Number
  },
  nextLevelExp: {
    type: Number
  },
  completedSongs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song"
    }
  ],
  achievements: [
    {
      type: String,
      ref: "Achievement"
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);