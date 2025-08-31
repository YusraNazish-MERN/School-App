import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if your backend runs elsewhere
  headers: { "Content-Type": "application/json" },
});

// Optionally attach token if you later implement JWT:
// api.interceptors.request.use(cfg => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (user?.token) cfg.headers.Authorization = `Bearer ${user.token}`;
//   return cfg;
// });

export default api;