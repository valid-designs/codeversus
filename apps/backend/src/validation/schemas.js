import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

export const lessonCreateSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    description: z.string().min(2),
    content: z.string().min(1),
    status: z.enum(["draft", "published"]),
    tags: z.array(z.string()).optional(),
  }),
});

export const lessonUpdateSchema = lessonCreateSchema;

export const commentSchema = z.object({
  body: z.object({
    comment: z.string().min(1),
  }),
});

export const ratingSchema = z.object({
  body: z.object({
    rating: z.number().min(1).max(5),
  }),
});
