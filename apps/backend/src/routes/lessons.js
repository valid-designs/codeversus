const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/lessonController");
const auth = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const { lessonCreateSchema, lessonUpdateSchema } = require("../validation/schemas");

router.post("/", auth, validate(lessonCreateSchema), ctrl.createLesson);
router.put("/:lessonId", auth, validate(lessonUpdateSchema), ctrl.updateLesson);
router.delete("/:lessonId", auth, ctrl.deleteLesson);
router.get("/:lessonId", ctrl.getLesson);

module.exports = router;
