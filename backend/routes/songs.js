const express = require("express");
const router = express.Router();
const Song = require("../models/song");


// GET all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: "Invalid ID format or server error" });
  }
});

// POST new song
router.post("/", async (req, res) => {
  try {
    const newSong = new Song(req.body);
    const savedSong = await newSong.save();
    res.json(savedSong);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;