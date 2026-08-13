import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('rohit_tejpal_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Fetch cart on mount/login if user exists
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const res = await axios.get(`${apiUrl}/api/users/cart`, { withCredentials: true });
          if (res.data && res.data.length > 0) {
            setCartItems(res.data);
          } else {
             // Sync local cart to backend if local has items but backend is empty
             if (cartItems.length > 0) {
                 await axios.put(`${apiUrl}/api/users/cart`, { cartItems }, { withCredentials: true });
             }
          }
        } catch (error) {
          console.error("Error fetching cart from API", error);
        }
      }
    };
    fetchCart();
  }, [user]);

  // Sync to backend and local storage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('rohit_tejpal_cart', JSON.stringify(cartItems));
    
    // Skip sync if we just logged out (user is null)
    const syncCart = async () => {
      if (user) {
        try {
          await axios.put(`${apiUrl}/api/users/cart`, { cartItems }, { withCredentials: true });
        } catch (error) {
          console.error("Error syncing cart to API", error);
        }
      }
    };
    
    // Add a tiny delay so we don't spam the API on rapid clicks
    const timeoutId = setTimeout(syncCart, 300);
    return () => clearTimeout(timeoutId);
  }, [cartItems, user]);

  const addToCart = (product, size = 'Free Size', quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product._id && item.size === size
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        return [...prevItems, {
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.front || product.image || '/placeholder.jpg',
          category: product.category || 'Collection',
          size,
          quantity
        }];
      }
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems(prevItems => prevItems.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems => prevItems.map(item => 
      (item.id === id && item.size === size) ? { ...item, quantity: newQuantity } : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
