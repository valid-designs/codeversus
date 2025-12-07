// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LessonView from "./pages/lessonView";
import LessonCreate from "./pages/lessonCreate";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LessonCreate />} /> {/* or a home page */}
        <Route path="/lessons/:id" element={<LessonView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
