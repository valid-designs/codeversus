const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/auth", require("./src/routes/auth"));
app.use("/lessons", require("./src/routes/lessons"));
app.use("/lessons/:lessonId/comments", require("./src/routes/comments"));
app.use("/lessons/:lessonId/ratings", require("./src/routes/ratings"));
app.use("/search", require("./src/routes/search"));

app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running" });
});

// Global error handler
const errorHandler = require("./src/middlewares/errorHandler");
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
