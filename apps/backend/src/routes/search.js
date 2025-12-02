const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");

// Public route
router.get("/", searchController.searchLessons);

module.exports = router;
