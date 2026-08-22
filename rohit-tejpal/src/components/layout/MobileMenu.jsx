import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiChevronRight, FiChevronDown, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import BrandLogoImage from '../ui/BrandLogoImage';

const MobileMenu = ({ isOpen, onClose, navigationData }) => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (menu) => {
    setOpenAccordion(openAccordion === menu ? null : menu);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/35 z-[100] transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-[85vw] max-w-[400px] bg-[var(--color-main-bg)] z-[110] shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]/50">
          <Link to="/" onClick={onClose} className="text-[var(--color-text-main)]">
            <BrandLogoImage className="h-14 sm:h-16 w-auto" />
          </Link>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)] transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto py-2">
          <nav className="flex flex-col">
            <Link to="/" className="px-6 py-4 text-[17px] text-[var(--color-text-main)] border-b border-[var(--color-border)]/30" onClick={onClose}>
              Home
            </Link>

            {/* Collections Accordion */}
            <div className="border-b border-[var(--color-border)]/30">
              <button 
                className="w-full flex items-center justify-between px-6 py-4 text-[17px] text-[var(--color-text-main)]"
                onClick={() => toggleAccordion('collections')}
              >
                Collections
                {openAccordion === 'collections' ? (
                  <FiChevronDown className="w-5 h-5 text-[var(--color-text-secondary)]" />
                ) : (
                  <FiChevronRight className="w-5 h-5 text-[var(--color-text-secondary)]" />
                )}
              </button>
              <div 
                className={`overflow-hidden transition-all duration-250 ease-in-out bg-[var(--color-alt-bg)] ${
                  openAccordion === 'collections' ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {navigationData.collectionsDropdown.map((item, idx) => (
                  <Link 
                    key={idx} 
                    to={item.href} 
                    className="block px-8 py-3 text-[15px] text-[var(--color-text-secondary)] hover:text-[var(--color-gold)]"
                    onClick={onClose}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Shop Accordion */}
            <div className="border-b border-[var(--color-border)]/30">
              <button 
                className="w-full flex items-center justify-between px-6 py-4 text-[17px] text-[var(--color-text-main)]"
                onClick={() => toggleAccordion('shop')}
              >
                Shop
                {openAccordion === 'shop' ? (
                  <FiChevronDown className="w-5 h-5 text-[var(--color-text-secondary)]" />
                ) : (
                  <FiChevronRight className="w-5 h-5 text-[var(--color-text-secondary)]" />
                )}
              </button>
              <div 
                className={`overflow-hidden transition-all duration-250 ease-in-out bg-[var(--color-alt-bg)] ${
                  openAccordion === 'shop' ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {navigationData.shopDropdown.map((item, idx) => (
                  <Link 
                    key={idx} 
                    to={item.href} 
                    className="block px-8 py-3 text-[15px] text-[var(--color-text-secondary)] hover:text-[var(--color-gold)]"
                    onClick={onClose}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/about" className="px-6 py-4 text-[17px] text-[var(--color-text-main)] border-b border-[var(--color-border)]/30" onClick={onClose}>
              About
            </Link>


            <Link to="/contact" className="px-6 py-4 text-[17px] text-[var(--color-text-main)] border-b border-[var(--color-border)]/30" onClick={onClose}>
              Contact
            </Link>

            <div className="my-2 border-t border-[var(--color-border)]/50"></div>

            <Link to="/wishlist" className="flex items-center gap-3 px-6 py-3 text-[16px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)]" onClick={onClose}>
              <FiHeart className="w-5 h-5" /> Wishlist
            </Link>
            
            <Link to="/cart" className="flex items-center gap-3 px-6 py-3 text-[16px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)]" onClick={onClose}>
              <FiShoppingBag className="w-5 h-5" /> My Bag
            </Link>

            <div className="my-2 border-t border-[var(--color-border)]/50"></div>
            
            {navigationData.user ? (
              <>
                <Link to="/dashboard" className="px-6 py-3 text-[16px] text-[var(--color-text-main)] font-medium" onClick={onClose}>
                  My Dashboard
                </Link>
                <button 
                  onClick={() => { navigationData.logout(); onClose(); }} 
                  className="px-6 py-3 text-[16px] text-red-500 text-left font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-6 py-3 text-[16px] text-[var(--color-text-main)] font-medium" onClick={onClose}>
                  Login
                </Link>
                <Link to="/register" className="px-6 py-3 text-[16px] text-[var(--color-gold)] font-medium" onClick={onClose}>
                  Create Account
                </Link>
              </>
            )}

          </nav>
        </div>

        {/* Footer (WhatsApp CTA) */}
        <div className="p-6 border-t border-[var(--color-border)]/50 bg-[var(--color-alt-bg)]">
          <a 
            href="https://wa.me/919873737512" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-[var(--color-whatsapp)] text-[var(--color-text-main)] rounded-sm font-medium hover:bg-opacity-90 transition-colors shadow-sm"
          >
            <FaWhatsapp className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
