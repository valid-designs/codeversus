import express from "express";
import { addComment, getComments } from "../controllers/commentController.js";
import auth from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { commentSchema } from "../validation/schemas.js";

const router = express.Router({ mergeParams: true });

router.post("/", auth, validate(commentSchema), addComment);
router.get("/", getComments);

export default router;
