import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from 'path';

// Routes
import songRoutes from "./routes/songs.js";
import userRoutes from "./routes/users.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, './.env') });

const app = express();
app.use(cors());
app.use(express.json());


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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is live on the network!`);
  console.log(`Local access: http://localhost:${PORT}`);
});