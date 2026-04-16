const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
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