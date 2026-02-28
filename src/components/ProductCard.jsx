import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { withFallback } from "../utils/imageFallback";

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const discountedPrice = Math.round(product.price - (product.price * product.discount) / 100);
  const liked = isWishlisted(product.id);

  return (
    <article className="product-card">
      <button className={`wish-btn ${liked ? "active" : ""}`} onClick={() => toggleWishlist(product.id)}>
        {liked ? "♥" : "♡"}
      </button>
      <Link to={`/product/${product.id}`} className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" onError={withFallback} />
      </Link>
      <div className="product-info">
        <p className="tiny muted">{product.brand}</p>
        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <div className="product-price-row">
          <span className="price">₹{discountedPrice.toLocaleString("en-IN")}</span>
          <span className="old-price">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="discount">-{product.discount}%</span>
        </div>
        <button className="btn btn-dark" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
