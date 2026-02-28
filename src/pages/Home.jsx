import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Home({ products, allProducts }) {
  const categories = [...new Set(allProducts.map((product) => product.category))].slice(0, 4);

  return (
    <div>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="hero-label">Premium Footwear House</p>
            <h1>Minimal design. Maximum presence.</h1>
            <p className="muted">
              Sai Shoes curates elevated silhouettes for modern India. Quiet details, precise fit, timeless finishes.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-dark">
                Shop Collection
              </Link>
              <Link to="/shop" className="btn btn-light">
                Explore New Arrivals
              </Link>
            </div>
          </div>
          <div className="hero-image-panel">
            <img
              src="https://images.unsplash.com/photo-1463100099107-aa0980c362e6?auto=format&fit=crop&w=1200&q=80"
              alt="Premium shoes"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Featured Picks</h2>
            <Link to="/shop" className="text-link">
              View All
            </Link>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Shop by Category</h2>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <Link key={category} to={`/shop?category=${category}`} className="category-card">
                <span>{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container sale-banner">
          <p>Flat 20% OFF on selected premium pairs.</p>
          <Link to="/shop" className="btn btn-dark">
            Shop Sale
          </Link>
        </div>
      </section>

      <section className="section newsletter-section">
        <div className="container newsletter">
          <div>
            <h2>Join Our Private List</h2>
            <p className="muted">Early access to capsule drops and exclusive member offers.</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" />
            <button className="btn btn-dark">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;
