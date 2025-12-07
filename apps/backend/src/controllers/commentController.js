import commentService from "../services/commentService.js";

export const addComment = async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const { comment } = req.body;
    const userId = req.user.id;
    const saved = await commentService.addComment(lessonId, userId, comment);
    res.json({ success: true, data: saved });
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await commentService.getComments(req.params.lessonId);
    res.json({ success: true, data: comments });
  } catch (err) {
    next(err);
  }
};
