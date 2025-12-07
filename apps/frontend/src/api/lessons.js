import axiosInstance from "./axiosInstance";

export const getLessons = () => axiosInstance.get("/lessons");
export const getLesson = (id) => axiosInstance.get(`/lessons/${id}`);
export const createLesson = (data) => axiosInstance.post("/lessons", data);
export const updateLesson = (id, data) => axiosInstance.put(`/lessons/${id}`, data);
export const deleteLesson = (id) => axiosInstance.delete(`/lessons/${id}`);
export const searchLessons = (q, tag) =>
  axiosInstance.get(`/search?q=${q}${tag ? `&tag=${tag}` : ""}`);