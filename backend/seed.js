const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// 1. HEARTBEAT - If you don't see this, Node isn't reading the file
console.log('>>> [SYSTEM] Script initiated...');

// 2. IMPORT MODELS
const User = require('./models/user.js');
const Song = require('./models/song.js');
const Achievement = require('./models/achievement.js');

const MONGO_URI = process.env.MONGO_URI;

async function seedDatabase() {
    console.log('--- 🚀 Starting Seed Process ---');

    try {
        if (!MONGO_URI) {
            throw new Error('MONGO_URI is missing from .env file');
        }

        // --- STEP 1: Connect ---
        console.log('--- ⏳ Connecting to MongoDB ---');
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('✅ Connected successfully!');

        // --- STEP 2: Load and Parse Data ---
        const usersPath = path.join(__dirname, 'data', 'users.json');
        const songsPath = path.join(__dirname, 'data', 'songs.json');

        console.log('--- ⏳ Reading Data Files ---');
        const userData = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
        const songData = JSON.parse(fs.readFileSync(songsPath, 'utf8'));

        const usersToSeed = userData.users || userData;
        const songsToSeed = songData.songs || songData;

        // --- STEP 3: Clear and Seed ---
        console.log('--- ⏳ Wiping Collections ---');
        await Promise.all([
            User.deleteMany({}),
            Song.deleteMany({}),
            Achievement.deleteMany({})
        ]);

        console.log('--- ⏳ Inserting Records ---');
        await User.insertMany(usersToSeed);
        console.log(`✅ Seeded ${usersToSeed.length} users`);

        await Song.insertMany(songsToSeed);
        console.log(`✅ Seeded ${songsToSeed.length} songs`);

    } catch (err) {
        console.error('\n❌ FATAL ERROR:');
        console.error(err.message);
        console.error(err.stack);
    } finally {
        await mongoose.disconnect();
        console.log('--- 🏁 Finished ---');
        process.exit(0);
    }
}

seedDatabase();