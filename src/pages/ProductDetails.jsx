import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { withFallback } from "../utils/imageFallback";

function ProductDetails({ products }) {
  const { id } = useParams();
  const product = useMemo(() => products.find((item) => item.id === Number(id)), [products, id]);
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [selectedImage, setSelectedImage] = useState(product?.gallery?.[0] || product?.image || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);

  if (!product) {
    return (
      <section className="section container">
        <p className="empty-text">Product not found.</p>
        <Link to="/shop" className="btn btn-dark">
          Back to Shop
        </Link>
      </section>
    );
  }

  const discountedPrice = Math.round(product.price - (product.price * product.discount) / 100);
  const reviews = [
    { id: 1, name: "Aarav S.", rating: 5, text: "Fit and finish feel premium. Excellent comfort." },
    { id: 2, name: "Meera P.", rating: 4, text: "Clean look, very versatile with daily outfits." },
    { id: 3, name: "Rohan K.", rating: 5, text: "Great cushioning and quality stitching." },
  ];

  return (
    <section className="section">
      <div className="container details-layout">
        <div>
          <div className="details-main-image">
            <img src={selectedImage} alt={product.name} onError={withFallback} />
          </div>
          <div className="thumb-row">
            {(product.gallery || [product.image]).map((img) => (
              <button key={img} onClick={() => setSelectedImage(img)} className={selectedImage === img ? "active" : ""}>
                <img src={img} alt={`${product.name} view`} onError={withFallback} />
              </button>
            ))}
          </div>
        </div>

        <div className="details-content">
          <p className="tiny muted">{product.brand}</p>
          <h2>{product.name}</h2>
          <div className="product-price-row details-price">
            <span className="price">₹{discountedPrice.toLocaleString("en-IN")}</span>
            <span className="old-price">₹{product.price.toLocaleString("en-IN")}</span>
            <span className="discount">-{product.discount}%</span>
          </div>
          <p className="muted">Rating: {product.rating} / 5</p>

          <div className="selector-group">
            <p>Size</p>
            <div className="chip-row">
              {product.sizes.map((size) => (
                <button key={size} onClick={() => setSelectedSize(size)} className={selectedSize === size ? "active" : ""}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="selector-group">
            <p>Color</p>
            <div className="chip-row">
              {product.colors.map((color) => (
                <button key={color} onClick={() => setSelectedColor(color)} className={selectedColor === color ? "active" : ""}>
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="details-actions">
            <button className="btn btn-dark" onClick={() => addToCart(product, { size: selectedSize, color: selectedColor })}>
              Add to Cart
            </button>
            <button className="btn btn-light" onClick={() => toggleWishlist(product.id)}>
              {isWishlisted(product.id) ? "Wishlisted" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      <div className="container reviews-box">
        <h3>Reviews</h3>
        <div className="review-list">
          {reviews.map((review) => (
            <article key={review.id} className="review-item">
              <p className="review-name">{review.name}</p>
              <p className="tiny muted">{review.rating} / 5</p>
              <p>{review.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
