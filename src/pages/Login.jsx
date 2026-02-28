import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const { user, loginUser, registerUser } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/"} replace />;

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    let res;
    if (mode === "register") {
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      res = registerUser(form.name.trim(), form.email.trim(), form.password);
    } else {
      res = loginUser(form.email.trim(), form.password);
    }

    if (!res.ok) return setError(res.message);
    navigate("/");
  };

  return (
    <section className="section">
      <div className="container auth-wrap">
        <form className="auth-card" onSubmit={onSubmit}>
          <div className="auth-switch">
            <button type="button" className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>
              Login
            </button>
            <button type="button" className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>
              Create Account
            </button>
          </div>
          <h2>{mode === "login" ? "User Login" : "Create Account"}</h2>
          <p className="muted">
            {mode === "login"
              ? "Sign in to manage your cart and wishlist."
              : "Create your account to save cart and wishlist instantly."}
          </p>
          {error && <p className="auth-error">{error}</p>}
          {mode === "register" && (
            <>
              <label>Full Name</label>
              <input type="text" required value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} />
            </>
          )}
          <label>Email</label>
          <input type="email" required value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} />
          <label>Password</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          />
          {mode === "register" && (
            <>
              <label>Confirm Password</label>
              <input
                type="password"
                required
                value={form.confirmPassword}
                onChange={(e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
              />
            </>
          )}
          <button className="btn btn-dark full">{mode === "login" ? "Login" : "Create Account"}</button>
          <p className="tiny muted">
            Admin? <Link to="/admin/login">Go to Admin Login</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
