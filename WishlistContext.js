import React, { createContext, useState } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (item) => {
    const exists = wishlist.find((i) => i.id === item.id);
    if (exists) {
      setWishlist(wishlist.filter((i) => i.id !== item.id));
    } else {
      setWishlist([...wishlist, item]);
    }
  };

  const isWishlisted = (id) => !!wishlist.find((i) => i.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}
