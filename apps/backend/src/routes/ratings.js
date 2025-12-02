const express = require("express");
const router = express.Router({ mergeParams: true });
const ratingController = require("../controllers/ratingController");
const authMiddleware = require("../middlewares/authMiddleware");

// Protected: add or update rating
router.post("/", authMiddleware, ratingController.rateLesson);

// Public: get all ratings and average
router.get("/", ratingController.getRatings);

module.exports = router;
