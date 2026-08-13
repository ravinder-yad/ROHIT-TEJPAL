import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import BrandLogoImage from '../ui/BrandLogoImage';

const Footer = () => {
  const location = useLocation();
  const hiddenRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
  
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="bg-[var(--color-primary-dark)] text-white font-sans border-t border-white/10 mt-auto w-full">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-20">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col items-start border-b border-white/10 pb-12 md:pb-0 md:border-b-0 pr-4">
            <Link to="/" className="inline-block mb-6 md:mb-10 ml-0 md:ml-4">
              <BrandLogoImage className="h-[60px] md:h-[95px] w-auto object-contain brightness-0 invert transform md:scale-[1.3] origin-left" />
            </Link>
            <p className="text-[var(--color-gold)] text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold mb-4 mt-2">
              Contemporary Indian Fashion
            </p>
            <p className="text-gray-300 font-light text-xs md:text-sm leading-relaxed max-w-sm italic">
              Crafted with intention,<br />
              designed for modern expression.
            </p>
            
            {/* WhatsApp CTA */}
            <div className="mt-10">
              <p className="text-gray-400 text-xs mb-3 italic">Need help?</p>
              <a 
                href="https://wa.me/919873737512" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--color-gold)] hover:text-white transition-colors group text-sm border-b border-[var(--color-gold)]/30 hover:border-white pb-1"
              >
                Chat with us on WhatsApp <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Links - Shop */}
          <div className="border-b border-white/10 pb-8 md:pb-0 md:border-b-0">
            <h3 className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.12em] mb-6 text-[var(--color-gold)]">Shop</h3>
            <ul className="space-y-4 text-[13px] md:text-sm text-gray-300 font-light">
              <li><Link to="/products" className="hover:text-[var(--color-gold)] transition-colors block">All Products</Link></li>
              <li><Link to="/products?category=tunic-set" className="hover:text-[var(--color-gold)] transition-colors block">Tunic Set</Link></li>
              <li><Link to="/products?category=kurta-set" className="hover:text-[var(--color-gold)] transition-colors block">Kurta Set</Link></li>
              <li><Link to="/products?category=kaftans" className="hover:text-[var(--color-gold)] transition-colors block">Kaftans</Link></li>
              <li><Link to="/products?category=top-skirt" className="hover:text-[var(--color-gold)] transition-colors block">Top & Skirt</Link></li>
            </ul>
          </div>

          {/* Links - Collections */}
          <div className="border-b border-white/10 pb-8 md:pb-0 md:border-b-0">
            <h3 className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.12em] mb-6 text-[var(--color-gold)]">Collections</h3>
            <ul className="space-y-4 text-[13px] md:text-sm text-gray-300 font-light">
              <li><Link to="/collections" className="hover:text-[var(--color-gold)] transition-colors block">All Collection</Link></li>
              <li><Link to="/collections/new-arrivals" className="hover:text-[var(--color-gold)] transition-colors block">New Collection</Link></li>
              <li><Link to="/collections/festive-edit" className="hover:text-[var(--color-gold)] transition-colors block">Festive Edit</Link></li>
            </ul>
          </div>

          {/* Links - Information */}
          <div className="border-b border-white/10 pb-8 md:pb-0 md:border-b-0">
            <h3 className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.12em] mb-6 text-[var(--color-gold)]">Information</h3>
            <ul className="space-y-4 text-[13px] md:text-sm text-gray-300 font-light">
              <li><Link to="/about" className="hover:text-[var(--color-gold)] transition-colors block">About</Link></li>
              <li><Link to="/factory" className="hover:text-[var(--color-gold)] transition-colors block">Factory</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--color-gold)] transition-colors block">Contact</Link></li>
            </ul>
          </div>

        </div>

        {/* Social Icons (Mobile Top, Desktop Right aligned) */}
        <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-white/10 gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
            <h3 className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--color-gold)]">Follow Us</h3>
            <div className="flex items-center gap-8 md:gap-6 mt-2 md:mt-0">
              <a href="https://www.instagram.com/rohit.tejpal_official?igsh=Y2p0YW9nY3lrNWR6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-[var(--color-gold)] transition-colors text-xs md:text-sm">
                <FaInstagram className="w-5 h-5 md:w-6 md:h-6" /> <span className="md:hidden lg:inline">Instagram</span>
              </a>
              <a href="https://wa.me/919873737512" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-[var(--color-gold)] transition-colors text-xs md:text-sm">
                <FaWhatsapp className="w-5 h-5 md:w-6 md:h-6" /> <span className="md:hidden lg:inline">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6 md:gap-4 text-[11px] md:text-xs text-gray-400 font-light text-center md:text-left">
          <p className="order-2 md:order-1 tracking-wider uppercase">© 2026 Rohit Tejpal. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 order-1 md:order-2 uppercase tracking-wider">
            <Link to="/privacy" className="hover:text-[var(--color-gold)] transition-colors">Privacy Policy</Link>
            <span className="text-gray-600 hidden md:inline">|</span>
            <Link to="/terms" className="hover:text-[var(--color-gold)] transition-colors">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
