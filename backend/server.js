const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"]
}));
app.use(express.json());

// Routes
const songRoutes = require("./routes/songs");
const userRoutes = require("./routes/users");

app.use("/songs", songRoutes);
app.use("/users", userRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// MongoDB connection safety check
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is live on the network!`);
  console.log(`Local access: http://localhost:${PORT}`);
});