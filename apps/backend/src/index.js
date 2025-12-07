// src/index.js
import express from 'express.js';
import cors from 'cors.js';
import dotenv from 'dotenv.js';
import authRoutes from './routes/auth.js';
import lessonsRoutes from './routes/lessons.js';
import errorHandler from './middlewares/errorHandler.js'; // adjust path if needed

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL // <-- Set this in Render environment variables
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/lessons", lessonsRoutes);

// Test route
app.get("/", (req, res) => res.send("Backend is live"));

// Global error handler
app.use(errorHandler);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));