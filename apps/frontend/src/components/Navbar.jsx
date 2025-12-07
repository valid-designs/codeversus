import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1em 2em", background: "#333", color: "#fff" }}>
      <div>
        <Link to="/" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}>CodeVersus</Link>
      </div>
      <div style={{ display: "flex", gap: "1em" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
        <Link to="/lessons" style={{ color: "#fff", textDecoration: "none" }}>Lessons</Link>
        {token ? (
          <>
            <Link to="/create" style={{ color: "#fff", textDecoration: "none" }}>Create</Link>
            <button onClick={handleLogout} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>Login</Link>
            <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
