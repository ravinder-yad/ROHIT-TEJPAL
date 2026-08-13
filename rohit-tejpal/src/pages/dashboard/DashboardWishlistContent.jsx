import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const DashboardWishlistContent = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart(item, 'Free Size', 1);
    removeFromWishlist(item.id);
  };

  return (
    <div className="mx-auto space-y-8 pb-12" style={{ maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-primary-dark)', margin: '0 0 8px 0' }}>Wishlist</h2>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>Save your favorite items and move them to your bag later.</p>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative flex flex-col">
              
              {/* Product Image */}
              <div className="aspect-[3/4] bg-gray-50 overflow-hidden relative">
                <Link to={`/products/${item.category?.toLowerCase().replace(/ /g, '-') || 'collection'}/${item.id}`}>
                  <img 
                    src={item.image || '/images/products/product_1.jpg'} 
                    alt={item.name} 
                    className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </Link>
                
                {/* Remove button (top right overlay) */}
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-white shadow-sm transition-all z-10"
                  aria-label="Remove from wishlist"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
              
              {/* Product Info */}
              <div className="p-4 flex flex-col flex-grow">
                <span className="text-[var(--color-gold)] text-[10px] uppercase tracking-[0.2em] font-bold mb-1 block">
                  {item.category}
                </span>
                
                <Link to={`/products/${item.category?.toLowerCase().replace(/ /g, '-') || 'collection'}/${item.id}`}>
                  <h3 className="text-sm font-bold text-[var(--color-primary-dark)] hover:text-[var(--color-gold)] transition-colors mb-2 line-clamp-1">
                    {item.name}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-between mt-auto pt-4">
                  <span className="font-bold text-[var(--color-primary-dark)]">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                  
                  <button 
                    onClick={() => handleMoveToCart(item)}
                    disabled={item.inStock === false}
                    className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary-dark)] hover:text-[var(--color-gold)] flex items-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiShoppingCart className="w-4 h-4" />
                    Move to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-300">
            <FiHeart className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-3">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">Found something you like? Tap the heart icon to save it for later.</p>
          
          <Link to="/products" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-primary-dark)] text-white text-xs font-bold uppercase tracking-widest rounded-md hover:bg-[var(--color-gold)] transition-colors">
            Start Exploring
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardWishlistContent;
