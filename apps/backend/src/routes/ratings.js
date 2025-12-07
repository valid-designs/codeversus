const express = require("express");
const router = express.Router({ mergeParams: true });
const ctrl = require("../controllers/ratingController");
const auth = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const { ratingSchema } = require("../validation/schemas");

router.post("/", auth, validate(ratingSchema), ctrl.rateLesson);
router.get("/", ctrl.getRatings);

module.exports = router;
