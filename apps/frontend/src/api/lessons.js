import axios from "./axiosInstance";

export const getLessons = () => axios.get("/lessons");
export const getLesson = (id) => axios.get(`/lessons/${id}`);
export const createLesson = (data) => axios.post("/lessons", data);
export const updateLesson = (id, data) => axios.put(`/lessons/${id}`, data);
export const deleteLesson = (id) => axios.delete(`/lessons/${id}`);
export const searchLessons = (q, tag) =>
  axios.get(`/search?q=${q}${tag ? `&tag=${tag}` : ""}`);
