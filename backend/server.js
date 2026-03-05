const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();

// Middleware
app.use(cors());
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

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});