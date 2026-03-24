const mongoose = require('mongoose');
require('dotenv').config();
const Song = require('./models/song');
const User = require('./models/user');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedSongs = [
  {
    title: 'Twinkle Twinkle Little Star',
    artist: 'Traditional',
    difficulty: 'easy',
    notes: [
      { note: 'C' },
      { note: 'C' },
      { note: 'G' },
      { note: 'G' },
      { note: 'A' },
      { note: 'A' },
      { note: 'G' }
    ]
  },
  {
    title: 'Mary Had a Little Lamb',
    artist: 'Traditional',
    difficulty: 'easy',
    notes: [
      { note: 'E' },
      { note: 'D' },
      { note: 'C' },
      { note: 'D' },
      { note: 'E' },
      { note: 'E' },
      { note: 'E' }
    ]
  },
  {
    title: 'Hot Cross Buns',
    artist: 'Traditional',
    difficulty: 'easy',
    notes: [
      { note: 'E' },
      { note: 'D' },
      { note: 'C' },
      { note: 'E' },
      { note: 'D' },
      { note: 'C' }
    ]
  }
];

const seedUsers = [
  {
    username: 'TapToPlayTeam',
    password: 'TapToPlay' // in production, hash passwords
  }
];

async function seedDatabase() {
  try {
    await Song.deleteMany({});
    await User.deleteMany({});

    const insertedSongs = await Song.insertMany(seedSongs);
    console.log(`Seeded ${insertedSongs.length} songs`);

    const insertedUsers = await User.insertMany(seedUsers);
    console.log(`Seeded ${insertedUsers.length} users`);

    mongoose.disconnect();
    console.log('Database seeding complete!');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

seedDatabase();