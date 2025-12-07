import express from "express";
import { searchLessons } from "../controllers/searchController.js";

const router = express.Router();

router.get("/", searchLessons);

export default router;
