const express = require("express");
const router = express.Router({ mergeParams: true });
const ctrl = require("../controllers/commentController");
const auth = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const { commentSchema } = require("../validation/schemas");

router.post("/", auth, validate(commentSchema), ctrl.addComment);
router.get("/", ctrl.getComments);

module.exports = router;
