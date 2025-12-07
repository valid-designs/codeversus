import express from 'express.js';
const router = express.Router();
import ctrl from '../controllers/lessonController.js';
import auth from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validate.js';
const { lessonCreateSchema, lessonUpdateSchema } = require("../validation/schemas");

router.post("/", auth, validate(lessonCreateSchema), ctrl.createLesson);
router.put("/:lessonId", auth, validate(lessonUpdateSchema), ctrl.updateLesson);
router.delete("/:lessonId", auth, ctrl.deleteLesson);
router.get("/:lessonId", ctrl.getLesson);

export default router;
