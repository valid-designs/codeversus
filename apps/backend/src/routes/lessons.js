import express from "express";
import { createLesson, getLesson, updateLesson, deleteLesson } from "../controllers/lessonController.js";
import auth from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { lessonCreateSchema, lessonUpdateSchema } from "../validation/schemas.js";

const router = express.Router();

router.post("/", auth, validate(lessonCreateSchema), createLesson);
router.get("/:lessonId", getLesson);
router.put("/:lessonId", auth, validate(lessonUpdateSchema), updateLesson);
router.delete("/:lessonId", auth, deleteLesson);

export default router;
