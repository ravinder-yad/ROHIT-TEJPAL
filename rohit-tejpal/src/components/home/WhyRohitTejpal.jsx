import { FiFeather, FiPenTool, FiMaximize, FiSettings } from 'react-icons/fi';

const features = [
  {
    title: 'QUALITY FABRICS',
    icon: <FiFeather className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-gold)] transition-transform duration-500 group-hover:scale-110" strokeWidth={1} />,
    description: 'We source the finest materials to ensure our garments look elegant and feel luxurious against the skin.'
  },
  {
    title: 'DISTINCTIVE DESIGNS',
    icon: <FiPenTool className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-gold)] transition-transform duration-500 group-hover:scale-110" strokeWidth={1} />,
    description: 'Unique prints and contemporary silhouettes that stand out in any setting, crafted for the modern individual.'
  },
  {
    title: 'ATTENTION TO DETAIL',
    icon: <FiMaximize className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-gold)] transition-transform duration-500 group-hover:scale-110" strokeWidth={1} />,
    description: 'Meticulous finishing, intricate hand-embroidery, and absolute perfection in every single stitch.'
  },
  {
    title: 'IN-HOUSE PRODUCTION',
    icon: <FiSettings className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-gold)] transition-transform duration-500 group-hover:scale-110" strokeWidth={1} />,
    description: 'Complete control over manufacturing ensures unmatched consistency, quality, and timely deliveries.'
  }
];

const WhyRohitTejpal = () => {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-primary-dark)] border-t border-white/5">
      <div className="container-max px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
            <span className="text-[var(--color-gold)] text-[10px] font-semibold tracking-[0.3em] uppercase">
              OUR PROMISE
            </span>
            <span className="w-12 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
          </div>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-wide">
            WHY <span className="italic text-[var(--color-gold)] font-medium">ROHIT TEJPAL</span>
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center group cursor-default">
              {/* Floating Icon Container */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 transform transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_15px_40px_rgba(182,154,97,0.15)] border border-white/10 backdrop-blur-sm">
                 {feature.icon}
              </div>
              
              {/* Text Content */}
              <h3 className="text-white text-[12px] md:text-[13px] font-bold tracking-[0.2em] uppercase mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-[13px] md:text-sm font-light leading-[1.8] max-w-[280px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyRohitTejpal;
