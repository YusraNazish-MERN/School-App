import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import { useSelector } from "react-redux";

export default function StudentDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      // GET /students/:studentId/assignments
      const res = await api.get(`/students/${user.id}/assignments`);
      setAssignments(res.data || []);
    } catch (err) {
      console.error(err);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchAssignments();
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <h2>Student Dashboard</h2>
        <p>Welcome, <strong>{user?.username}</strong></p>

        {loading ? <p>Loading assignments...</p> : (
          <table className="table table-bordered">
            <thead><tr><th>Title</th><th>Status</th><th>Grade</th></tr></thead>
            <tbody>
              {assignments.length ? assignments.map((a) => (
                <tr key={a.id || a.title}>
                  <td>{a.title}</td>
                  <td>{a.status}</td>
                  <td>{a.grade || "Pending"}</td>
                </tr>
              )) : (
                <tr><td colSpan="3">No assignments found</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}