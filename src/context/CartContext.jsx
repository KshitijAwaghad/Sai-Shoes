import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext(null);
const CART_KEY = "saishoes_cart";
const WISHLIST_KEY = "saishoes_wishlist";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem(WISHLIST_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, options = {}) => {
    const { size = null, color = null } = options;
    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id && item.size === size && item.color === color);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          discount: product.discount,
          image: product.image,
          size,
          color,
          quantity: 1,
        },
      ];
    });
    toast.success("Added to cart");
  };

  const removeFromCart = (id, size, color) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.size === size && item.color === color)));
    toast.info("Removed from cart");
  };

  const updateQuantity = (id, size, color, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id && item.size === size && item.color === color ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((itemId) => itemId !== id) : [...prev, id];
      toast[exists ? "info" : "success"](exists ? "Removed from wishlist" : "Added to wishlist");
      return next;
    });
  };

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const discounted = item.price - (item.price * item.discount) / 100;
        return sum + discounted * item.quantity;
      }, 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      wishlist,
      cartCount,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isWishlisted: (id) => wishlist.includes(id),
    }),
    [cartItems, wishlist, cartCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
