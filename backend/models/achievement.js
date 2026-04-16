const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String
    }
});


module.exports = mongoose.model("Achievement", AchievementSchema);