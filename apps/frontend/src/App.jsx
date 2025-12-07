import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Index from "./pages/index";
import LessonsList from "./pages/lessonList";
import LessonView from "./pages/lessonView";
import LessonCreate from "./pages/lessonCreate";
import Login from "./pages/login";
import Register from "./pages/register";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/lessons" element={<LessonsList />} />
        <Route path="/create" element={<LessonCreate />} />
        <Route path="/lessons/:id" element={<LessonView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
