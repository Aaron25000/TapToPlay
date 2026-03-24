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
    title: 'Dancing Queen',
    artist: 'Abba',
    image: '/assets/image/Abba.webp',
    difficulty: 'easy',
    notes: [{ note: 'A' }, { note: 'B' }, { note: 'C' }]
  },
  {
    title: 'Treat You Better',
    artist: 'Shawn Mendes',
    image: '/assets/image/Shawn-Mendes.jpg',
    difficulty: 'medium',
    notes: [{ note: 'G' }, { note: 'A' }, { note: 'B' }]
  },
  {
    title: 'Hey Jude',
    artist: 'The Beatles',
    image: '/assets/image/beatles.jpg',
    difficulty: 'hard',
    notes: [{ note: 'F' }, { note: 'G' }, { note: 'A' }]
  },
  {
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    image: '/assets/image/Queen.jpg',
    difficulty: 'medium',
    notes: [{ note: 'Bb' }, { note: 'Ab' }, { note: 'G' }]
  },
  {
    title: 'Perfect',
    artist: 'Ed Sheeran',
    image: '/assets/image/Ed_Sheeran.webp',
    difficulty: 'easy',
    notes: [{ note: 'G' }, { note: 'D' }, { note: 'E' }]
  },
  {
    title: 'Closer',
    artist: 'The Chainsmokers',
    image: '/assets/image/The-Chainsmokers.webp',
    difficulty: 'medium',
    notes: [{ note: 'E' }, { note: 'F' }, { note: 'G' }]
  },
  {
    title: 'Bad Day',
    artist: 'Daniel Powter',
    image: '/assets/image/david-powter-bad-day.webp',
    difficulty: 'easy',
    notes: [{ note: 'Eb' }, { note: 'F' }, { note: 'G' }]
  },
  {
    title: 'Cold',
    artist: 'Coldplay',
    image: '/assets/image/coldplay-band-facts.jpg',
    difficulty: 'medium',
    notes: [{ note: 'C' }, { note: 'D' }, { note: 'E' }]
  },
  {
    title: 'Levels',
    artist: 'Avicii',
    image: '/assets/image/Avicii.webp',
    difficulty: 'hard',
    notes: [{ note: 'C#' }, { note: 'B' }, { note: 'A' }]
  },
  {
    title: 'Theme from Jurassic Park',
    artist: 'John Williams',
    image: '/assets/image/john-williams.jpeg',
    difficulty: 'easy',
    notes: [{ note: 'Bb' }, { note: 'A' }, { note: 'Bb' }]
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