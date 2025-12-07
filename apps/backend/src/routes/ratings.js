import express from "express";
import { rateLesson, getRatings } from "../controllers/ratingController.js";
import auth from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { ratingSchema } from "../validation/schemas.js";

const router = express.Router({ mergeParams: true });

router.post("/", auth, validate(ratingSchema), rateLesson);
router.get("/", getRatings);

export default router;
