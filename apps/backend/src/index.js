const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/auth", require("./routes/auth"));
app.use("/lessons", require("./routes/lessons"))
app.use("/lessons/:lessonId/comments", require("./routes/comments"));
app.use("/lessons/:lessonId/ratings", require("./routes/ratings"));
app.use("/search", require("./routes/search"));

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
