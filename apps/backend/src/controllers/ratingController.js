import ratingService from '../services/ratingService.js';

exports.rateLesson = async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    const saved = await ratingService.rateLesson(lessonId, userId, rating);
    res.json({ success: true, data: saved });
  } catch (err) {
    next(err);
  }
};

exports.getRatings = async (req, res, next) => {
  try {
    const { ratings, average } = await ratingService.getRatings(req.params.lessonId);
    res.json({ success: true, data: { ratings, average } });
  } catch (err) {
    next(err);
  }
};
