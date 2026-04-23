import mongoose from "mongoose";

const AchievementSchema = new mongoose.Schema({
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


const Achievement = mongoose.model("Achievement", AchievementSchema);

export default Achievement;