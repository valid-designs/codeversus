// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import lessonsRoutes from "./routes/lessons.js";
import commentsRoutes from "./routes/comments.js";
import ratingsRoutes from "./routes/ratings.js";
import searchRoutes from "./routes/search.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL, // Set this in your environment variables
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/lessons", lessonsRoutes);
app.use("/lessons/:lessonId/comments", commentsRoutes);
app.use("/lessons/:lessonId/ratings", ratingsRoutes);
app.use("/search", searchRoutes);

// Test route
app.get("/", (req, res) => res.send("Backend is live"));

// Global error handler
app.use(errorHandler);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
