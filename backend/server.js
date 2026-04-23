const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// 1. Import Routes
const achievementRoutes = require('./routes/achievements.js');
const songRoutes = require('./routes/songs.js'); // Uncomment when ready
const userRoutes = require('./routes/users.js'); // Uncomment when ready

const app = express();
const PORT = process.env.PORT || 5001;

// 2. Middleware
app.use(cors());
app.use(express.json()); // Essential for parsing JSON bodies in POST requests

// 3. Routes Middleware
app.use('/achievements', achievementRoutes);
app.use('/songs', songRoutes);
app.use('/users', userRoutes);

// 4. Base Route for Testing
app.get('/', (req, res) => {
    res.send('TapToPlay API is running...');
});

// 5. Database Connection & Server Start
const startServer = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        if (!MONGO_URI) {
            throw new Error('MONGO_URI is missing from .env');
        }

        console.log('⏳ Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB Connected');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Failed to start server:', err.message);
        process.exit(1);
    }
};

startServer();