import express from 'express.js';
const router = express.Router();
import ctrl from '../controllers/searchController.js';

router.get("/", ctrl.searchLessons);

export default router;
