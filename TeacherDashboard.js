import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchFilter from "../components/SearchFilter";
import api from "../api";
import { useSelector } from "react-redux";

export default function TeacherDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [studentsWithAssignments, setStudentsWithAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Endpoint we expected earlier: GET /teachers/:teacherId/students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/teachers/${user.id}/students`, { params: { search } });
      // backend might return assignments joined with students; adapt as needed
      setStudentsWithAssignments(res.data || []);
    } catch (err) {
      console.error(err);
      setStudentsWithAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchStudents();
    // eslint-disable-next-line
  }, [user, search]);

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <h2>Teacher Dashboard</h2>
        <p>Batch (if any): <strong>{user?.batch || "-"}</strong></p>

        <SearchFilter value={search} onChange={setSearch} placeholder="Search students" />

        {loading ? <p>Loading...</p> : (
          <>
            {studentsWithAssignments.length === 0 ? (
              <p>No students / assignments found.</p>
            ) : studentsWithAssignments.map((entry, idx) => {
              // entry might be assignment object including student (depending on backend)
              const student = entry.student || { username: entry.username, id: entry.studentId || entry.id };
              const assignments = entry.assignments || (entry.title ? [entry] : []);
              return (
                <div key={student.id || student.username} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{student.username}</h5>
                    <table className="table table-sm mt-2">
                      <thead><tr><th>Title</th><th>Status</th><th>Grade</th></tr></thead>
                      <tbody>
                        {assignments.length ? assignments.map((a, i) => (
                          <tr key={i}>
                            <td>{a.title}</td>
                            <td>{a.status || a.status}</td>
                            <td>{a.grade || "-"}</td>
                          </tr>
                        )) : <tr><td colSpan="3">No assignments</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}