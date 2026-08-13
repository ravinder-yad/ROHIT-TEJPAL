import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import AnimatedButton from '../components/ui/AnimatedButton';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    // Optional: removeFromWishlist(item.id) if we want it removed when added to cart
  };

  return (
    <div className="bg-[var(--color-primary-dark)] min-h-screen text-white font-sans pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[var(--color-gold)] text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">
            Your Selection
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 tracking-wide">
            My <span className="italic text-[var(--color-gold)]">Wishlist</span>
          </h1>
          <p className="text-gray-400 font-light text-sm md:text-base max-w-lg mx-auto leading-relaxed tracking-wider">
            Curated masterpieces you've saved for later.
          </p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group relative flex flex-col bg-white/[0.02] border border-white/10 hover:border-[var(--color-gold)]/50 transition-all duration-500 overflow-hidden">
                
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Link to={`/products/${item.category.toLowerCase().replace(/ /g, '-')}/${item.id}`}>
                    <img 
                      src={item.image || '/images/products/product_1.jpg'} 
                      alt={item.name} 
                      className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                  </Link>

                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-red-500 hover:text-white transition-all duration-300 z-10"
                    title="Remove from Wishlist"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>

                  {!item.inStock && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md text-white text-[9px] uppercase tracking-widest font-bold border border-white/10">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[var(--color-gold)] text-[10px] uppercase tracking-[0.2em] font-bold mb-2 block">
                    {item.category}
                  </span>
                  <Link to={`/products/${item.category.toLowerCase().replace(/ /g, '-')}/${item.id}`} className="block mb-2">
                    <h3 className="text-lg font-serif font-light text-white group-hover:text-[var(--color-gold)] transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-gray-400 text-sm mb-6 flex-1">
                    ₹{item.price.toLocaleString('en-IN')}
                  </p>

                  <AnimatedButton 
                    disabled={item.inStock === false}
                    onClick={() => handleAddToCart(item)}
                    theme="gold"
                    fullWidth={true}
                    icon={false}
                  >
                    <FiShoppingCart className="w-4 h-4" />
                    {item.inStock !== false ? 'Add To Cart' : 'Sold Out'}
                  </AnimatedButton>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-white/10 bg-white/[0.02]">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8">
              <FiHeart className="w-8 h-8 text-gray-500" />
            </div>
            <h2 className="text-2xl font-serif font-light mb-4">Your wishlist is empty</h2>
            <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
              You haven't saved any items yet. Explore our collections and find something you love.
            </p>
            <AnimatedButton to="/collections" theme="gold">
              Discover Collections
            </AnimatedButton>
          </div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;
