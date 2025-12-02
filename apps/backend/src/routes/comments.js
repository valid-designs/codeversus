const express = require("express");
const router = express.Router({ mergeParams: true });
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

// Protected: add comment
router.post("/", authMiddleware, commentController.addComment);

// Public: get comments for lesson
router.get("/", commentController.getComments);

module.exports = router;
