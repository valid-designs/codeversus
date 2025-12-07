import lessonService from "../services/lessonService.js";

export const createLesson = async (req, res, next) => {
  try {
    const lesson = await lessonService.createLesson(req.user.id, req.body);
    res.json({ success: true, data: lesson });
  } catch (err) {
    next(err);
  }
};

export const getLesson = async (req, res, next) => {
  try {
    const lesson = await lessonService.getLesson(req.params.lessonId);
    if (!lesson) return res.status(404).json({ success: false, error: "Lesson not found" });
    res.json({ success: true, data: lesson });
  } catch (err) {
    next(err);
  }
};

export const updateLesson = async (req, res, next) => {
  try {
    const lesson = await lessonService.updateLesson(req.user.id, req.params.lessonId, req.body);
    res.json({ success: true, data: lesson });
  } catch (err) {
    next(err);
  }
};

export const deleteLesson = async (req, res, next) => {
  try {
    await lessonService.deleteLesson(req.user.id, req.params.lessonId);
    res.json({ success: true, data: "Lesson deleted" });
  } catch (err) {
    next(err);
  }
};
