import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">SchoolApp</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {user && user.role === "admin" && (
              <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
            )}
            {user && user.role === "teacher" && (
              <li className="nav-item"><Link className="nav-link" to="/teacher">Teacher</Link></li>
            )}
            {user && user.role === "student" && (
              <li className="nav-item"><Link className="nav-link" to="/student">Student</Link></li>
            )}
            <li className="nav-item"><Link className="nav-link" to="/assignments">Assignments</Link></li>
          </ul>
          <div className="d-flex">
            {user ? (
              <>
                <span className="me-3 align-self-center">Hi, {user.username}</span>
                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link className="btn btn-primary" to="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}