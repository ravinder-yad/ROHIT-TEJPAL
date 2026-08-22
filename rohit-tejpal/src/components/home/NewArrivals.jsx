import { Link } from 'react-router-dom';
import { FiShoppingBag, FiArrowRight, FiHeart } from 'react-icons/fi';

import { useWishlist } from '../../context/WishlistContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        // Sort by newest and grab first 4 active products
        const activeProducts = data.filter(p => p.status === 'active');
        activeProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProducts(activeProducts.slice(0, 4));
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <section className="py-24 md:py-32 bg-[var(--color-main-bg)]">
      <div className="container-max px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[var(--color-border)]/30 pb-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
              <span className="text-[var(--color-gold)] text-[10px] font-semibold tracking-[0.3em] uppercase">
                FRESH STYLES
              </span>
            </div>
            <h2 className="text-[var(--color-text-main)] text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-wide">
              NEW <span className="italic text-[var(--color-gold)] font-medium">ARRIVALS</span>
            </h2>
          </div>
          
          <Link 
            to="/collections/new-arrivals"
            className="hidden md:inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.2em] uppercase text-[var(--color-text-main)] hover:text-[var(--color-gold)] transition-colors group mb-2"
          >
            DISCOVER ALL
            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        {/* Editorial Split Layout */}
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12">
          
          {/* Left: Campaign Banner */}
          <div className="w-full xl:w-5/12 relative aspect-[3/4] xl:aspect-auto xl:h-auto overflow-hidden group">
            <img 
              src="/images/hero/hero_slide_1.png" 
              alt="New Collection Campaign"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[15000ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-8 left-8 right-8 z-10">
              <h3 className="text-[var(--color-text-main)] text-3xl md:text-4xl font-serif font-light tracking-wide mb-4">
                The Festive <br/><span className="italic text-[var(--color-gold)]">Edit</span>
              </h3>
              <p className="text-gray-200 text-sm font-light mb-6 max-w-xs leading-relaxed">
                Step into the season with our latest collection featuring vibrant hues and modern silhouettes.
              </p>
              <Link 
                to="/collections/new-arrivals"
                className="inline-block text-[var(--color-text-main)] text-[11px] font-semibold tracking-[0.2em] uppercase border-b border-[var(--color-border)]/300 pb-1 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors"
              >
                SHOP THE EDIT
              </Link>
            </div>
          </div>

          {/* Right: Product Grid */}
          <div className="w-full xl:w-7/12 grid grid-cols-2 gap-4 md:gap-8">
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
                  <div className="absolute top-3 left-3 bg-[var(--color-main-bg)] border border-[var(--color-border)]/50 px-3 py-1 text-[8px] font-bold tracking-[0.2em] text-[var(--color-text-main)] uppercase shadow-md">
                    NEW
                  </div>
                  
                  {/* Hover Like (Heart) Button */}
                  <button className={`absolute top-3 right-3 bg-[var(--color-main-bg)]/90 border border-[var(--color-border)]/50 backdrop-blur-sm p-2.5 rounded-full hover:bg-[var(--color-gold)] hover:text-[var(--color-main-bg)] hover:border-[var(--color-gold)] transition-all duration-300 shadow-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 z-10 ${isInWishlist(product._id) ? 'text-[var(--color-gold)]' : 'text-[var(--color-text-main)]'}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}>
                    <FiHeart className={`w-4 h-4 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
                  </button>
                  
                  {/* Hover Action Overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  {/* Desktop Action Buttons */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 hidden lg:flex">
                    <button className="w-full flex items-center justify-center gap-2 bg-[var(--color-main-bg)]/95 border-t border-[var(--color-border)]/50 backdrop-blur-md text-[var(--color-text-main)] py-3 text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-[var(--color-gold)] hover:text-[var(--color-main-bg)] hover:border-[var(--color-gold)] transition-colors shadow-lg">
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
          
        </div>

        {/* Mobile View All Button */}
        <div className="flex md:hidden mt-12 justify-center">
          <Link 
            to="/collections/new-arrivals"
            className="inline-flex items-center px-10 py-3 border border-[var(--color-gold)] text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-main-bg)] hover:border-[var(--color-gold)] transition-all"
          >
            DISCOVER ALL
          </Link>
        </div>

      </div>
    </section>
  );
};

export default NewArrivals;
