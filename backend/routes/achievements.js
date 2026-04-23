import express from "express";
import Achievement from "../models/achievement";

const router = express.Router();
// GET all achievements
router.get("/", async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new achievements
router.post("/", async (req, res) => {
  try {
    const newAchievement = new Achievement(req.body);
    const savedAchievement = await newAchievement.save();
    res.json(savedAchievement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;