import { Link } from 'react-router-dom';
import { FiEye, FiShoppingBag, FiHeart } from 'react-icons/fi';
import AnimatedButton from '../ui/AnimatedButton';

import { useWishlist } from '../../context/WishlistContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        // Grab first 4 active products for featured section
        setProducts(data.filter(p => p.status === 'active').slice(0, 4));
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <section className="py-24 md:py-32 bg-[var(--color-main-bg)] border-t border-[var(--color-border)]/30">
      <div className="container-max px-4 md:px-8">
        
        {/* Elegant Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
            <span className="text-[var(--color-gold)] text-[10px] font-semibold tracking-[0.3em] uppercase">
              HANDCRAFTED LUXURY
            </span>
            <span className="w-12 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
          </div>
          
          <h2 className="text-[var(--color-text-main)] text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-wide mb-6">
            SIGNATURE <span className="italic text-[var(--color-gold)] font-medium">STYLES</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-sm md:text-base font-light max-w-[500px]">
            Discover the pieces that define the Rohit Tejpal aesthetic. Meticulously crafted for the modern wardrobe.
          </p>
        </div>

        {/* Premium Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
          {products.map((product) => (
            <Link to={`/products/${product.category}/${product._id}`} key={product._id || product.id} className="group cursor-pointer flex flex-col bg-transparent border border-[var(--color-border)]/50 hover:border-[var(--color-border)]/30 transition-colors duration-500 rounded-sm overflow-hidden p-2">
              
              {/* Image Container with Hover Actions */}
              <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-[var(--color-main-bg)]">
                <img 
                  src={product.images?.front || product.image} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[5000ms] ease-out group-hover:scale-110"
                />
                
                {/* Product Tags */}
                <div className="absolute top-3 left-3 bg-white px-3 py-1 text-[8px] font-bold tracking-[0.2em] text-[var(--color-main-bg)] uppercase shadow-md">
                  FEATURED
                </div>
                
                {/* Hover Like (Heart) Button */}
                <button className={`absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-[var(--color-gold)] hover:text-[var(--color-text-main)] transition-all duration-300 shadow-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 z-10 ${isInWishlist(product._id) ? 'text-[var(--color-gold)]' : 'text-[var(--color-main-bg)]'}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}>
                  <FiHeart className={`w-4 h-4 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
                </button>
                
                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {/* Desktop Action Buttons */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 hidden lg:flex">
                  <button className="w-full flex items-center justify-center gap-2 bg-white/95 backdrop-blur-md text-[var(--color-main-bg)] py-3 text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-[var(--color-gold)] hover:text-[var(--color-text-main)] transition-colors shadow-lg">
                    <FiShoppingBag className="w-3.5 h-3.5" />
                    <span>VIEW DETAILS</span>
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col items-center text-center px-2 pb-2">
                <h3 className="text-[var(--color-text-main)] text-[13px] md:text-[14px] font-serif tracking-wide mb-1.5 group-hover:text-[var(--color-gold)] transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-[12px] tracking-widest font-medium">
                  ₹ {product.price}
                </p>
              </div>
              
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <AnimatedButton to="/products" theme="gold">
            VIEW ALL PRODUCTS
          </AnimatedButton>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
