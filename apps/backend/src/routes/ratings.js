import express from 'express.js';
const router = express.Router({ mergeParams: true });
import ctrl from '../controllers/ratingController.js';
import auth from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validate.js';
const { ratingSchema } = require("../validation/schemas");

router.post("/", auth, validate(ratingSchema), ctrl.rateLesson);
router.get("/", ctrl.getRatings);

export default router;
