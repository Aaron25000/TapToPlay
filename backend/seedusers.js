// seedUsers.js
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user'); // adjust path if needed

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

async function seedUser() {
  try {
    // Create TapToPlayTeam user
    const user = new User({
      username: 'TapToPlayTeam',
      password: 'TapToPlay'
    });

    await user.save();
    console.log('User TapToPlayTeam added successfully!');
  } catch (err) {
    console.error('Error adding user:', err);
  } finally {
    mongoose.disconnect();
  }
}

seedUser();