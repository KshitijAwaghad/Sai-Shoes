import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { user, loginAdmin } = useAuth();
  const navigate = useNavigate();

  if (user?.role === "admin") return <Navigate to="/admin/dashboard" replace />;

  const onSubmit = (e) => {
    e.preventDefault();
    const res = loginAdmin(form.email, form.password);
    if (!res.ok) return setError(res.message);
    navigate("/admin/dashboard");
  };

  return (
    <section className="section">
      <div className="container auth-wrap">
        <form className="auth-card" onSubmit={onSubmit}>
          <h2>Admin Login</h2>
          {error && <p className="auth-error">{error}</p>}
          <label>Email</label>
          <input type="email" required value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} />
          <label>Password</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          />
          <button className="btn btn-dark full">Login as Admin</button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;
