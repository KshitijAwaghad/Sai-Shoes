import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const ITEMS_PER_PAGE = 8;

function Shop({ products }) {
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get("category") || "";

  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [...new Set(products.map((p) => p.category))];
  const brands = [...new Set(products.map((p) => p.brand))];
  const colors = [...new Set(products.flatMap((p) => p.colors))];
  const sizes = [...new Set(products.flatMap((p) => p.sizes))].sort((a, b) => a - b);

  const filteredProducts = useMemo(() => {
    let list = products.filter((product) => {
      const categoryMatch = selectedCategory ? product.category === selectedCategory : true;
      const sizeMatch = selectedSize ? product.sizes.includes(Number(selectedSize)) : true;
      const brandMatch = selectedBrand ? product.brand === selectedBrand : true;
      const colorMatch = selectedColor ? product.colors.includes(selectedColor) : true;
      const priceMatch = product.price <= maxPrice;
      return categoryMatch && sizeMatch && brandMatch && colorMatch && priceMatch;
    });

    if (sortBy === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [products, selectedCategory, selectedSize, selectedBrand, selectedColor, maxPrice, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedSize("");
    setSelectedBrand("");
    setSelectedColor("");
    setMaxPrice(10000);
    setSortBy("featured");
    setCurrentPage(1);
  };

  return (
    <section className="section">
      <div className="container shop-layout">
        <aside className="filters">
          <div className="filter-head">
            <h3>Filters</h3>
            <button className="text-btn" onClick={resetFilters}>
              Reset
            </button>
          </div>

          <label>Category</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label>Price up to ₹{maxPrice}</label>
          <input type="range" min="1000" max="10000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />

          <label>Size</label>
          <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            <option value="">Any</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <label>Brand</label>
          <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
            <option value="">All</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          <label>Color</label>
          <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
            <option value="">All</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </aside>

        <div>
          <div className="shop-toolbar">
            <h2>Shop Collection</h2>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
          </div>

          <div className="product-grid">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {paginatedProducts.length === 0 && <p className="empty-text">No products match these filters.</p>}

          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
              <button key={page} className={page === currentPage ? "active" : ""} onClick={() => setCurrentPage(page)}>
                {page}
              </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Shop;
