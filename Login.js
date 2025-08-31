import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ username: "", password: "" });

  useEffect(() => {
    if (user) {
      // Redirect by role
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "teacher") navigate("/teacher");
      else if (user.role === "student") navigate("/student");
    }
  }, [user, navigate]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "65vh" }}>
        <div className="card p-4" style={{ width: 380 }}>
          <h4 className="mb-3">Login</h4>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input value={form.username} onChange={e => setForm({...form, username: e.target.value})} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="form-control" />
            </div>
            <button className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <small className="text-muted mt-2 d-block">Use seeded accounts from backend to test.</small>
        </div>
      </div>
    </>
  );
}