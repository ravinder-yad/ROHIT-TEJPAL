import { Link } from 'react-router-dom';
import AnimatedButton from '../ui/AnimatedButton';

const Craftsmanship = () => {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-main-bg)] overflow-hidden">
      <div className="container-max px-4 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Image with Editorial Frame */}
          <div className="w-full lg:w-1/2 relative">
            {/* Decorative background block */}
            <div className="absolute top-8 md:top-12 -left-4 md:-left-8 w-full h-full bg-[var(--color-alt-bg)] -z-10"></div>
            
            <div className="relative aspect-[3/4] max-w-[500px] mx-auto overflow-hidden shadow-2xl bg-[var(--color-alt-bg)]">
              <img 
                src="/images/collections/ethnic.jpg" 
                alt="Intricate fabric details and craftsmanship"
                className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-[3000ms] ease-out hover:scale-105 p-2"
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -right-2 md:right-12 bg-[var(--color-main-bg)]/90 backdrop-blur-md p-6 shadow-2xl max-w-[200px] hidden md:block z-20 border border-[var(--color-border)]/50">
              <p className="text-[var(--color-text-main)] text-[10px] font-bold tracking-[0.25em] leading-relaxed uppercase">
                Premium Quality <br/>
                <span className="text-[var(--color-gold)]">Since 2024</span>
              </p>
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0">
            
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
              <span className="text-[var(--color-gold)] text-[10px] font-semibold tracking-[0.3em] uppercase">
                OUR PHILOSOPHY
              </span>
              <span className="w-12 h-[1px] bg-[var(--color-gold)] opacity-40 lg:hidden"></span>
            </div>
            
            <h2 className="text-[var(--color-text-main)] text-4xl md:text-5xl lg:text-[4rem] leading-tight font-serif font-light mb-10 tracking-wide">
              CRAFTED WITH <br className="hidden md:block"/>
              <span className="italic text-[var(--color-gold)] font-medium">PURPOSE</span>
            </h2>
            
            <p className="text-[var(--color-text-secondary)] text-sm md:text-base lg:text-lg leading-[2] font-light mb-12 max-w-[500px]">
              From carefully selected fabrics to intricate finishing, every detail matters. We believe that true elegance lies in the mastery of traditional techniques blended with modern sensibilities. 
              <br/><br/>
              Our artisans pour their heritage into every stitch, ensuring that each garment is not just worn, but experienced.
            </p>

            <AnimatedButton to="/about" theme="gold">
              DISCOVER OUR CRAFT
            </AnimatedButton>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;
