import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import AnimatedButton from '../ui/AnimatedButton';

const ProductCard = ({ product }) => {
  const { id, _id, name, category, price, images, image, isNew, sizes } = product;
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isWishlisted = isInWishlist(_id || id);
  const [selectedSize, setSelectedSize] = useState('');
  
  // Format category string for display (e.g., 'tunic-set' -> 'Tunic Set')
  const displayCategory = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (sizes && sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart({ ...product, selectedSize });
  };

  return (
    <div className="group flex flex-col relative">
      
      {/* Image Container */}
      <div 
        className="relative block aspect-[3/4] overflow-hidden rounded-sm bg-white/5 mb-4 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-500"
      >
        <Link to={`/products/${category}/${_id || id}`} className="absolute inset-0 z-10"></Link>
        
        <img 
          src={images?.front || image} 
          alt={name}
          className="w-full h-full object-cover object-top transition-transform duration-[1000ms] ease-out group-hover:scale-110"
          loading="lazy"
        />
        
        {/* NEW Badge */}
        {isNew && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 text-[8px] font-bold tracking-widest text-[var(--color-primary-dark)] uppercase shadow-sm z-10">
            NEW
          </div>
        )}
        
        {/* Wishlist Icon */}
        <button 
          className={`absolute top-4 right-4 p-2 transition-colors z-20 ${isWishlisted ? 'text-[var(--color-gold)]' : 'text-white/50 hover:text-[var(--color-gold)]'}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label="Add to wishlist"
        >
          <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-[var(--color-gold)]' : ''}`} strokeWidth={2} />
        </button>

        {/* Hover Action - Desktop Only */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none hidden lg:block rounded-sm"></div>
        
        <div className="absolute bottom-0 left-0 right-0 translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 hidden lg:flex z-20 gap-[1px]">
          <AnimatedButton 
            onClick={handleAddToCart}
            theme="gold"
            fullWidth={true}
            icon={false}
            className="flex-1 bg-black/50 backdrop-blur-md !border-none"
          >
            <FiShoppingBag className="w-4 h-4" />
            ADD TO BAG
          </AnimatedButton>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 text-left relative z-10 px-1">
        <Link to={`/products/${category}/${_id || id}`} className="block group/title">
          <h3 className="text-white text-[15px] md:text-[16px] font-serif font-light tracking-wide mb-1 leading-snug group-hover/title:text-[var(--color-gold)] transition-colors line-clamp-1">
            {name}
          </h3>
          <span className="block text-gray-400 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium mb-3">
            {displayCategory}
          </span>
        </Link>
        
        {sizes && sizes.length > 0 && (
          <div className="flex items-center gap-2 mb-4 mt-1">
            {sizes.map(size => (
              <button
                key={size}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedSize(size === selectedSize ? '' : size);
                }}
                className={`w-8 h-8 flex items-center justify-center text-[10px] font-medium transition-all duration-300 ${
                  selectedSize === size 
                    ? 'border border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-primary-dark)] shadow-[0_0_10px_rgba(201,168,117,0.3)]' 
                    : 'border border-white/20 text-gray-300 hover:border-white/60 hover:text-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
        
        <Link to={`/products/${category}/${_id || id}`} className="block mt-auto">
          <p className="text-[var(--color-gold)] text-sm tracking-widest font-medium">
            ₹{price}
          </p>
        </Link>
      </div>
      
    </div>
  );
};

export default ProductCard;
