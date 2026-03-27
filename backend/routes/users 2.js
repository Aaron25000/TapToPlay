const express = require("express");
const router = express.Router();
const User = require("../models/user");

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("completedSongs");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new user
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH update user progress (add completed song)
router.patch("/:id/completed", async (req, res) => {
  try {
    const { songId } = req.body;
    const user = await User.findById(req.params.id);
    if (!user.completedSongs.includes(songId)) {
      user.completedSongs.push(songId);
      await user.save();
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;