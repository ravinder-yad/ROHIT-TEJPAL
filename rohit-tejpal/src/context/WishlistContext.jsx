import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('rohit_tejpal_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Fetch wishlist on mount/login if user exists
  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const res = await axios.get(`${apiUrl}/api/users/wishlist`, { withCredentials: true });
          if (res.data && res.data.length > 0) {
            setWishlistItems(res.data);
          } else {
             if (wishlistItems.length > 0) {
                 await axios.put(`${apiUrl}/api/users/wishlist`, { wishlistItems }, { withCredentials: true });
             }
          }
        } catch (error) {
          console.error("Error fetching wishlist from API", error);
        }
      }
    };
    fetchWishlist();
  }, [user]);

  // Sync to backend and local storage whenever wishlistItems change
  useEffect(() => {
    localStorage.setItem('rohit_tejpal_wishlist', JSON.stringify(wishlistItems));
    
    const syncWishlist = async () => {
      if (user) {
        try {
          await axios.put(`${apiUrl}/api/users/wishlist`, { wishlistItems }, { withCredentials: true });
        } catch (error) {
          console.error("Error syncing wishlist to API", error);
        }
      }
    };
    
    const timeoutId = setTimeout(syncWishlist, 300);
    return () => clearTimeout(timeoutId);
  }, [wishlistItems, user]);

  const toggleWishlist = (product) => {
    setWishlistItems(prevItems => {
      const exists = prevItems.find(item => item.id === product._id);
      
      if (exists) {
        return prevItems.filter(item => item.id !== product._id);
      } else {
        return [...prevItems, {
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.front || product.image || '/placeholder.jpg',
          category: product.category || 'Collection',
          inStock: product.inStock !== false
        }];
      }
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const isInWishlist = (id) => {
    return wishlistItems.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      toggleWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
