import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiHeart, FiShoppingBag, FiMenu, FiX, FiChevronDown, FiMessageCircle, FiUser } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { navigationData } from '../../data/navigation';
import MobileMenu from './MobileMenu';
import BrandLogoImage from '../ui/BrandLogoImage';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dbCollections, setDbCollections] = useState([]);
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/collections`);
        setDbCollections(data.filter(c => c.isActive));
      } catch (error) {
        console.error('Error fetching collections for navbar:', error);
      }
    };
    fetchCollections();
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const NavLink = ({ to, children, dropdown }) => {
    const isButton = !to || to === '#';
    
    const InnerContent = (
      <>
        {children}
        {dropdown && <FiChevronDown className="w-3.5 h-3.5 opacity-70 transition-transform duration-300 group-hover:rotate-180" />}
        
        {/* Animated Underline */}
        <span className={`absolute bottom-[22px] left-2 h-[1px] bg-[var(--color-gold)] transition-all duration-300 ease-out ${
          !isButton && isActive(to) ? 'w-[calc(100%-16px)]' : 'w-0 group-hover:w-[calc(100%-16px)]'
        }`}></span>
      </>
    );

    const className = `flex items-center gap-1.5 text-[13px] uppercase font-semibold tracking-[0.12em] transition-colors duration-300 h-full px-2 ${
      !isButton && isActive(to) ? 'text-[var(--color-gold)]' : 'text-white hover:text-[var(--color-gold)]'
    } cursor-pointer`;

    return (
      <div className="relative group flex items-center h-full">
        {isButton ? (
          <div className={className}>
            {InnerContent}
          </div>
        ) : (
          <Link to={to} className={className}>
            {InnerContent}
          </Link>
        )}

      {/* Dropdown Menu */}
      {dropdown && (
        <div className="absolute top-full left-0 pt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
          <div className="bg-[var(--color-primary-dark)] border-t border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.3)] py-4 min-w-[220px]">
            {dropdown.map((item, idx) => (
              <Link
                key={idx}
                to={item.href}
                className="block px-6 py-2.5 text-[13px] uppercase tracking-[0.08em] text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

  const dynamicCollectionsDropdown = [
    ...dbCollections.map(c => ({
      name: c.name,
      href: `/collections/${c.slug}`
    }))
  ];

  return (
    <>
      {/* Placeholder to prevent layout shift since nav is now fixed */}
      <div className="h-[90px] md:h-[120px] w-full shrink-0"></div>
      
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out bg-[var(--color-primary-dark)] ${
          isScrolled ? 'h-[75px] md:h-[85px] border-b border-[var(--color-primary-dark)] shadow-md' : 'h-[90px] md:h-[120px] border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 h-full flex items-center justify-between">
          
          {/* Mobile Left Section (Menu + Logo) */}
          <div className="flex-1 flex items-center lg:hidden">
            <button 
              className="p-2 -ml-2 mr-2 text-white hover:text-[var(--color-gold)] transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <FiMenu className="w-7 h-7" strokeWidth={1.5} />
            </button>
            <Link to="/" className="flex-shrink-0 flex items-center text-white hover:text-[var(--color-gold)] transition-colors duration-300 z-50 h-full">
              <BrandLogoImage 
                className={`transition-all duration-300 object-contain transform origin-left ${
                  isScrolled 
                    ? 'h-[45px] scale-110' 
                    : 'h-[55px] scale-125'
                }`} 
              />
            </Link>
          </div>

          {/* Desktop Logo */}
          <div className="hidden lg:flex items-center h-full">
            <Link to="/" className="flex-shrink-0 flex items-center justify-center text-white hover:text-[var(--color-gold)] transition-colors duration-300 z-50 h-full">
              <BrandLogoImage 
                className={`transition-all duration-300 object-contain px-3 transform scale-[1.3] origin-center ${
                  isScrolled 
                    ? 'h-[60px] md:h-[70px] w-auto' 
                    : 'h-[70px] md:h-[95px] w-auto'
                }`} 
              />
            </Link>
          </div>

          {/* Desktop Navigation (Left-aligned next to logo) */}
          <div className="hidden lg:flex items-center justify-start gap-8 xl:gap-12 h-full flex-1 ml-8 xl:ml-12">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/collections" dropdown={dynamicCollectionsDropdown}>Collections</NavLink>
            <NavLink to="/products" dropdown={navigationData.shopDropdown}>Shop</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          {/* Icons & CTA (Right) */}
          <div className="flex items-center justify-end gap-3 md:gap-6 ml-auto">
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-1.5 text-white hover:text-[var(--color-gold)] transition-colors"
            >
              <FiSearch className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {/* User Dropdown / Auth Buttons */}
            {user ? (
              <div className="hidden md:flex items-center gap-6 border-l border-white/20 pl-6 ml-2">
                <Link 
                  to="/dashboard" 
                  className="text-[13px] uppercase tracking-wider font-bold text-white hover:text-[var(--color-gold)] transition-colors flex items-center gap-2"
                >
                  <FiUser className="w-4 h-4" />
                  Dashboard
                </Link>
                <button 
                  onClick={logout}
                  className="text-[12px] uppercase tracking-wider font-semibold text-gray-400 hover:text-red-400 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="relative group hidden md:block">
                <Link 
                  to="/login" 
                  className="p-1.5 text-white hover:text-[var(--color-gold)] transition-colors flex items-center"
                >
                  <FiUser className="w-5 h-5" strokeWidth={1.5} />
                </Link>
                
                {/* Dropdown Content */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#2a3245] shadow-2xl rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right border border-[#4a5568]">
                  <div className="py-2 flex flex-col">
                    <Link to="/login" className="px-4 py-2.5 text-sm text-[#aeb5c7] hover:bg-[#353f56] hover:text-[var(--color-gold)] transition-colors font-medium">Login</Link>
                    <Link to="/register" className="px-4 py-2.5 text-sm text-[#aeb5c7] hover:bg-[#353f56] hover:text-[var(--color-gold)] transition-colors">Create Account</Link>
                  </div>
                </div>
              </div>
            )}
            
            <Link to="/wishlist" className="hidden md:block relative p-1.5 text-white hover:text-[var(--color-gold)] transition-colors">
              <FiHeart className="w-5 h-5" strokeWidth={1.5} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-[var(--color-gold)] text-white text-[9px] font-bold w-[15px] h-[15px] rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-1.5 text-white hover:text-[var(--color-gold)] transition-colors">
              <FiShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-white text-[var(--color-primary-dark)] text-[9px] font-bold w-[15px] h-[15px] rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Component */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navigationData={{ ...navigationData, collectionsDropdown: dynamicCollectionsDropdown, user, logout }}
      />

      {/* Full Screen Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] bg-[var(--color-primary-dark)] flex flex-col text-white">
          <div className="p-4 md:p-8 flex items-center justify-between border-b border-white/10">
            <h2 className="text-xl font-medium tracking-wider uppercase text-[var(--color-gold)]">Search</h2>
            <button onClick={() => setSearchOpen(false)} className="p-2 text-gray-400 hover:text-[var(--color-gold)] transition-colors">
              <FiX className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 p-4 md:p-8 max-w-3xl w-full mx-auto">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search for sherwanis, kurta sets, suits..." 
                className="w-full text-xl md:text-3xl py-4 pl-14 pr-4 border-b border-white/20 bg-transparent outline-none focus:border-[var(--color-gold)] transition-colors placeholder:text-gray-500 font-light text-white"
                autoFocus
              />
            </div>
            <div className="mt-12">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Popular Searches</h3>
              <div className="flex flex-wrap gap-3">
                {['Sherwani', 'Kurta Sets', 'Tuxedos', 'Indo Western', 'Jacket'].map(term => (
                  <button key={term} className="px-6 py-3 bg-white/5 border border-white/10 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] rounded-sm text-sm font-medium transition-all duration-300">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
