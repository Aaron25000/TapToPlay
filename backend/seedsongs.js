const mongoose = require("mongoose");
require("dotenv").config();
const Song = require("./models/song"); 

const MONGO_URI = process.env.MONGO_URI;

const songs = [
  {
    title: "C Major Scale",
    notes: ["C", "D", "E", "F", "G", "A", "B", "C2", "D2", "E2"]
  },
  {
    title: "Twinkle Twinkle Little Star",
    notes: ["C", "C", "G", "G", "A", "A", "G", "F", "F", "E", "E", "D", "D", "C"]
  },
  {
    title: "Mary Had a Little Lamb",
    notes: ["E", "D", "C", "D", "E", "E", "E", "D", "D", "D", "E", "G", "G"]
  },
  {
    title: "Simple Arpeggio",
    notes: ["C", "E", "G", "C2", "G", "E", "C"]
  },
  {
    title: "Happy Birthday",
    notes: ["C", "C", "D", "C", "F", "E", "C", "C", "D", "C", "G", "F"]
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected. Seeding songs...");

    await Song.deleteMany({});
    
    await Song.insertMany(songs);

    console.log("Songs seeded successfully!");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });