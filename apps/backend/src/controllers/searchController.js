import searchService from '../services/searchService.js';

exports.searchLessons = async (req, res, next) => {
  try {
    const lessons = await searchService.searchLessons(req.query);
    res.json({ success: true, data: lessons });
  } catch (err) {
    next(err);
  }
};
