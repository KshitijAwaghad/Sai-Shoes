import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar({ isDarkMode, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <header className="navbar-wrap">
      <div className="container navbar">
        <Link to="/" className="logo" aria-label="Sai Shoes Home">
          Sai Shoes
        </Link>

        <button className="menu-btn" onClick={() => setIsOpen((prev) => !prev)} aria-label="Toggle menu">
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/shop" onClick={() => setIsOpen(false)}>
            Shop
          </NavLink>
          <NavLink to="/cart" onClick={() => setIsOpen(false)}>
            Cart ({cartCount})
          </NavLink>
          {user?.role === "admin" && (
            <NavLink to="/admin/dashboard" onClick={() => setIsOpen(false)}>
              Dashboard
            </NavLink>
          )}
          {!user && (
            <>
              <NavLink to="/login" onClick={() => setIsOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/admin/login" onClick={() => setIsOpen(false)}>
                Admin
              </NavLink>
            </>
          )}
          {user && (
            <button className="text-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
          <button className="theme-btn" onClick={onToggleTheme}>
            {isDarkMode ? "Light" : "Dark"}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
