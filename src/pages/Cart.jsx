import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { withFallback } from "../utils/imageFallback";

function Cart() {
  const { cartItems, subtotal, updateQuantity, removeFromCart } = useCart();
  const shipping = subtotal > 4000 ? 0 : 199;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <section className="section container">
        <h2>Your cart is empty.</h2>
        <Link to="/shop" className="btn btn-dark">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container cart-layout">
        <div>
          <h2>Shopping Cart</h2>
          <div className="cart-list">
            {cartItems.map((item) => {
              const discounted = Math.round(item.price - (item.price * item.discount) / 100);
              return (
                <article key={`${item.id}-${item.size}-${item.color}`} className="cart-item">
                  <img src={item.image} alt={item.name} onError={withFallback} />
                  <div>
                    <p className="cart-name">{item.name}</p>
                    <p className="muted tiny">
                      {item.brand} {item.size ? `| Size ${item.size}` : ""} {item.color ? `| ${item.color}` : ""}
                    </p>
                    <p className="price">₹{discounted.toLocaleString("en-IN")}</p>
                    <div className="qty-row">
                      <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}>+</button>
                    </div>
                    <button className="text-btn" onClick={() => removeFromCart(item.id, item.size, item.color)}>
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="summary-card">
          <h3>Price Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{Math.round(subtotal).toLocaleString("en-IN")}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{Math.round(total).toLocaleString("en-IN")}</span>
          </div>
          <button className="btn btn-dark full">Proceed to Checkout</button>
        </aside>
      </div>
    </section>
  );
}

export default Cart;
