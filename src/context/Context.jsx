import React, { createContext, useContext, useState } from "react";

// Create Context
const StoreContext = createContext();

// Custom Hook (easy access)
export const useStore = () => useContext(StoreContext);

// Provider Component
export const StoreProvider = ({ children }) => {

  // Global States
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // 🛒 Add / Remove Cart
  const toggleCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // ❤️ Add / Remove Wishlist
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        toggleCart,
        toggleWishlist,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};