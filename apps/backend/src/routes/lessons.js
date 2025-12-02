const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");
const authMiddleware = require("../middlewares/authMiddleware");

// Protected routes (only logged-in users can create/update/delete)
router.post("/", authMiddleware, lessonController.createLesson);
router.put("/:id", authMiddleware, lessonController.updateLesson);
router.delete("/:id", authMiddleware, lessonController.deleteLesson);

// Public routes
router.get("/:id", lessonController.getLesson);

module.exports = router;
