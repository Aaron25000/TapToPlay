import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, './.env') });


import Song from './models/song.js';
import User from './models/user.js';


const userData = JSON.parse(fs.readFileSync(path.join(__dirname, './data/users.json'), 'utf8'));
const songData = JSON.parse(fs.readFileSync(path.join(__dirname, './data/songs.json'), 'utf8'));

const MONGO_URI = process.env.MONGO_URI;


async function seedDatabase() {
    try {
        console.log('--- STEP 1: Attempting Connection ---');
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB connected successfully!');

        console.log('--- STEP 2: Clearing Collections ---');
        await Promise.all([
            Song.deleteMany({}),
            User.deleteMany({})
        ]);
        console.log('✅ Collections cleared');

        console.log('--- STEP 3: Seeding ---');
        if (userData?.users) {
            await User.insertMany(userData.users);
            console.log(`✅ Seeded ${userData.users.length} users`);
        }

        if (songData?.songs) {
            await Song.insertMany(songData.songs);
            console.log(`✅ Seeded ${songData.songs.length} songs`);
        }

    } catch (err) {
        console.error('❌ FATAL ERROR:', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('--- Finished ---');
        process.exit(0);
    }
}

seedDatabase();