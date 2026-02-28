import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { initialProducts } from "./data/products";

const PRODUCTS_STORAGE_KEY = "saishoes_products";
const THEME_STORAGE_KEY = "saishoes_theme";
const OLD_TERRA_IMAGE = "https://images.unsplash.com/photo-1520219306100-ec5b8c8f934d?auto=format&fit=crop&w=900&q=80";
const NEW_TERRA_IMAGE = "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80";

const normalizeProducts = (items) =>
  items.map((product) => {
    if (product.id !== 7) return product;
    return {
      ...product,
      image: product.image === OLD_TERRA_IMAGE ? NEW_TERRA_IMAGE : product.image,
      gallery: (product.gallery || []).map((img) => (img === OLD_TERRA_IMAGE ? NEW_TERRA_IMAGE : img)),
    };
  });

function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    return saved ? normalizeProducts(JSON.parse(saved)) : initialProducts;
  });
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem(THEME_STORAGE_KEY) === "dark");

  useEffect(() => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    const mode = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, [isDarkMode]);

  const featuredProducts = useMemo(() => products.slice(0, 8), [products]);

  return (
    <div className="app-shell">
      <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode((prev) => !prev)} />
      <main className="page-main">
        <Routes>
          <Route path="/" element={<Home products={featuredProducts} allProducts={products} />} />
          <Route path="/shop" element={<Shop products={products} />} />
          <Route path="/product/:id" element={<ProductDetails products={products} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard products={products} setProducts={setProducts} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
