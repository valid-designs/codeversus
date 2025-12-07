const { z } = require("zod");

exports.registerSchema = z.object({
  body: z.object({
    username: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

exports.loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

exports.lessonCreateSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    description: z.string().min(2),
    content: z.string().min(1),
    status: z.enum(["draft", "published"]),
    tags: z.array(z.string()).optional(),
  }),
});

exports.lessonUpdateSchema = exports.lessonCreateSchema;

exports.commentSchema = z.object({
  body: z.object({
    comment: z.string().min(1),
  }),
});

exports.ratingSchema = z.object({
  body: z.object({
    rating: z.number().min(1).max(5),
  }),
});
