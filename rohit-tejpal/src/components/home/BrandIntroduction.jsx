import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import AnimatedButton from '../ui/AnimatedButton';

const BrandIntroduction = () => {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-primary-dark)] relative overflow-hidden">
      {/* Subtle background monogram/watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] text-[20vw] font-serif tracking-tighter pointer-events-none whitespace-nowrap text-white">
        R T
      </div>

      <div className="container-max flex flex-col items-center text-center relative z-10 px-6">
        
        {/* Decorative Element */}
        <div className="flex items-center gap-4 mb-8">
          <span className="w-12 md:w-20 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
          <span className="text-[var(--color-gold)] text-sm">✧</span>
          <span className="w-12 md:w-20 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
        </div>

        {/* Small subtle heading */}
        <span className="text-[var(--color-gold)] text-[11px] md:text-xs font-semibold tracking-[0.3em] uppercase mb-8 block">
          THE HOUSE OF ROHIT TEJPAL
        </span>

        {/* Main large heading */}
        <h2 className="text-white text-4xl md:text-5xl lg:text-[4rem] leading-tight font-serif font-light mb-10 tracking-wide max-w-[900px]">
          WHERE CRAFT MEETS <br className="hidden md:block" />
          <span className="italic text-[var(--color-gold)] font-medium">CHARACTER</span>
        </h2>

        {/* Description text */}
        <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-[2] font-light max-w-[650px] mb-14">
          Rooted in Indian aesthetics and inspired by contemporary fashion, Rohit Tejpal creates distinctive garments with meticulous attention to print, fabric, and finish.
        </p>

        {/* Premium Button */}
        <AnimatedButton to="/about" theme="dark">
          OUR STORY
        </AnimatedButton>
        
      </div>
    </section>
  );
};

export default BrandIntroduction;
