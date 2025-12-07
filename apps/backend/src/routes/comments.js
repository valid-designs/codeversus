import express from 'express.js';
const router = express.Router({ mergeParams: true });
import ctrl from '../controllers/commentController.js';
import auth from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validate.js';
const { commentSchema } = require("../validation/schemas");

router.post("/", auth, validate(commentSchema), ctrl.addComment);
router.get("/", ctrl.getComments);

export default router;
