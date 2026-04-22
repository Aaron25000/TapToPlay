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


// SEARCH with optional difficulty filter
router.get("/search", async (req, res) => {
  try {
    const { q, difficulty } = req.query;

    const filter = {};

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { artist: { $regex: q, $options: "i" } }
      ];
    }

    if (difficulty) {
      filter.difficulty = difficulty.toLowerCase();
    }

    const songs = await Song.find(filter);

    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});


// GET song by id
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


module.exports = router;