import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Index from "./pages/index";
import LessonsList from "./pages/LessonsList";
import LessonView from "./pages/LessonView";
import LessonCreate from "./pages/LessonCreate";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
