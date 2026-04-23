const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

/**
 * Robust Seeder Tool
 * Logs every phase to capture "silent" hangs
 */
class DatabaseSeeder {
    constructor() {
        this.uri = process.env.MONGO_URI;
        this.dataDir = path.join(__dirname, 'data');
        this.models = {
            User: require('./models/user'),
            Song: require('./models/song'),
            Achievement: require('./models/achievement')
        };
    }

    log(step, message) {
        console.log(`[${step.toUpperCase()}] ${message}`);
    }

    async init() {
        this.log('init', 'Starting Seeder Engine...');
        
        if (!this.uri) {
            console.error('❌ FATAL: MONGO_URI is missing from environment.');
            process.exit(1);
        }

        try {
            await this.connect();
            const data = await this.loadFiles();
            await this.clean();
            await this.seed(data);
            this.log('done', 'Seeding complete!');
        } catch (error) {
            console.error('\n💥 SEEDER CRASHED:');
            console.error(error);
        } finally {
            await mongoose.disconnect();
            this.log('exit', 'Database connection closed.');
            process.exit(0);
        }
    }

    async connect() {
        this.log('db', 'Connecting to MongoDB Atlas...');
        // Force a 5-second timeout to stop the "silent hang"
        await mongoose.connect(this.uri, {
            serverSelectionTimeoutMS: 5000,
        });
        this.log('db', 'Connected successfully.');
    }

    async loadFiles() {
        this.log('fs', 'Loading JSON data from /data...');
        const usersRaw = fs.readFileSync(path.join(this.dataDir, 'users.json'), 'utf-8');
        const songsRaw = fs.readFileSync(path.join(this.dataDir, 'songs.json'), 'utf-8');
        
        return {
            users: JSON.parse(usersRaw).users || JSON.parse(usersRaw),
            songs: JSON.parse(songsRaw).songs || JSON.parse(songsRaw)
        };
    }

    async clean() {
        this.log('clean', 'Wiping existing collections...');
        await Promise.all([
            this.models.User.deleteMany({}),
            this.models.Song.deleteMany({}),
            this.models.Achievement.deleteMany({})
        ]);
        this.log('clean', 'Clear complete.');
    }

    async seed(data) {
        this.log('seed', `Inserting ${data.users.length} users...`);
        await this.models.User.insertMany(data.users);

        this.log('seed', `Inserting ${data.songs.length} songs...`);
        await this.models.Song.insertMany(data.songs);
    }
}

// Start the engine
const seeder = new DatabaseSeeder();
seeder.init();