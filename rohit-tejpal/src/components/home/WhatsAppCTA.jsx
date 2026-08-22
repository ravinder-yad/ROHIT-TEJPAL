import { FaWhatsapp } from 'react-icons/fa';
import AnimatedButton from '../ui/AnimatedButton';

const WhatsAppCTA = () => {
  return (
    <section className="bg-[var(--color-main-bg)] text-[var(--color-text-main)] min-h-[300px] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="container-max flex flex-col items-center text-center relative z-10 py-10">
        
        {/* Decorative Header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="w-10 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
          <span className="text-[var(--color-gold)] text-[9px] font-semibold tracking-[0.3em] uppercase">
            CONCIERGE SERVICE
          </span>
          <span className="w-10 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light tracking-wide mb-4">
          NEED HELP WITH AN <span className="italic text-[var(--color-gold)] font-medium">ORDER?</span>
        </h2>
        
        <p className="text-[var(--color-text-secondary)] text-xs md:text-sm font-light mb-8 max-w-[450px] tracking-wide leading-relaxed">
          Our style advisors are here to help. Contact us on WhatsApp for personal assistance, sizing advice, or custom inquiries.
        </p>

        <AnimatedButton href="https://wa.me/919873737512" theme="dark" icon={false}>
          <FaWhatsapp className="w-4 h-4 text-[var(--color-whatsapp)]" />
          CHAT ON WHATSAPP
        </AnimatedButton>
        
      </div>
    </section>
  );
};

export default WhatsAppCTA;
