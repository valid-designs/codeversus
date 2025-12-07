import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav style={{ padding: "1em", borderBottom: "1px solid #ddd" }}>
      <Link to="/" style={{ marginRight: "1em" }}>
        Home
      </Link>
      <Link to="/lessons" style={{ marginRight: "1em" }}>
        Lessons
      </Link>
      <Link to="/create" style={{ marginRight: "1em" }}>
        Create Lesson
      </Link>

      {token ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: "1em" }}>
            Login
          </Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
