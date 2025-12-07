import express from 'express.js';
const router = express.Router();
import auth from '../controllers/authController.js';
import validate from '../middlewares/validate.js';
const { registerSchema, loginSchema } = require("../validation/schemas");

router.post("/register", validate(registerSchema), auth.register);
router.post("/login", validate(loginSchema), auth.login);

export default router;