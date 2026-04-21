import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  image: {
    type: String
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

const Song = mongoose.model("Song", SongSchema);

export default Song;