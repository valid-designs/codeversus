import searchService from "../services/searchService.js";

export const searchLessons = async (req, res, next) => {
  try {
    const lessons = await searchService.searchLessons(req.query);
    res.json({ success: true, data: lessons });
  } catch (err) {
    next(err);
  }
};
