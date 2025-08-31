import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchFilter from "../components/SearchFilter";
import api from "../api";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOverview = async () => {
    setLoading(true);
    try {
      // Assuming backend GET /admin/overview returns { users, assignments }
      const res = await api.get("/admin/overview", { params: { search } });
      // If backend sends { users, assignments } use res.data.users
      // In our earlier backend spec it returns { users, assignments }. Normalize:
      const data = res.data.users || res.data;
      setUsers(data);
    } catch (err) {
      console.error(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
    // eslint-disable-next-line
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <h2>Admin Dashboard</h2>
        <p>Logged in as: <strong>{user?.username}</strong></p>

        <SearchFilter value={search} onChange={setSearch} placeholder="Search users by username or batch" />

        {loading ? <p>Loading...</p> : (
          <table className="table table-bordered">
            <thead>
              <tr><th>Username</th><th>Role</th><th>Batch</th><th>Extra</th></tr>
            </thead>
            <tbody>
              {users.length ? users.map(u => (
                <tr key={u.id || u.username}>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>{u.batch || "-"}</td>
                  <td>{u.email || "-"}</td>
                </tr>
              )) : (
                <tr><td colSpan="4">No users found</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}