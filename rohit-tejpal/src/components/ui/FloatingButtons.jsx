import { useState, useEffect } from 'react';
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa';

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show "Scroll to Top" button when user scrolls down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      
      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className={`w-12 h-12 rounded-full flex items-center justify-center bg-[var(--color-primary-dark)] text-[var(--color-gold)] border border-[var(--color-gold)] shadow-xl hover:bg-[var(--color-gold)] hover:text-[var(--color-primary-dark)] transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <FaArrowUp className="w-5 h-5" />
      </button>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/919873737512" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full flex items-center justify-center bg-[#25D366] text-white shadow-xl hover:bg-[#128C7E] hover:scale-110 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7" />
      </a>
      
    </div>
  );
};

export default FloatingButtons;
