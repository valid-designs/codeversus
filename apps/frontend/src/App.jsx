import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LessonView from "./pages/LessonView";
import LessonCreate from "./pages/LessonCreate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lessons/create" element={<LessonCreate />} />
        <Route path="/lessons/:id" element={<LessonView />} />
      </Routes>
    </Router>
  );
}

export default App;
