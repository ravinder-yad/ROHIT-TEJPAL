import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import AnimatedButton from '../ui/AnimatedButton';

const slides = [
  {
    id: 1,
    image: '/images/hero/hero_slide_1.png',
    subtitle: 'NEW COLLECTION',
    title: 'TIMELESS\nELEGANCE',
    description: 'Discover refined Indian ethnic wear crafted with distinctive prints and thoughtful details.',
    buttonText: 'EXPLORE COLLECTION',
    link: '/collections',
    bgColor: 'bg-[var(--color-primary-dark)]'
  },
  {
    id: 2,
    image: '/images/hero/hero_slide_2.png',
    subtitle: 'SIGNATURE PRINTS',
    title: 'CRAFTED TO MAKE\nAN IMPRESSION',
    description: 'Elevate your wardrobe with our meticulously designed floral and geometric prints.',
    buttonText: 'VIEW COLLECTION',
    link: '/products',
    bgColor: 'bg-[var(--color-primary-dark)]'
  },
  {
    id: 3,
    image: '/images/hero/hero_slide_3.png',
    subtitle: 'ROHIT TEJPAL',
    title: 'TRADITION,\nREIMAGINED',
    description: 'Experience the perfect blend of modern silhouettes and traditional Indian craftsmanship.',
    buttonText: 'DISCOVER MORE',
    link: '/about',
    bgColor: 'bg-[var(--color-primary-dark)]'
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className={`relative w-full h-[600px] overflow-hidden transition-colors duration-1000 ${slides[currentSlide].bgColor}`}>
      
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full flex flex-col md:flex-row transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Left Content Area */}
            <div className="w-full md:w-5/12 lg:w-[45%] h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-12 md:pt-0 relative z-20">
              
              <div className="max-w-[500px]">
                <p className={`text-[var(--color-gold)] text-xs md:text-sm font-semibold tracking-[0.15em] mb-4 transform transition-all duration-[1200ms] delay-300 ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  {slide.subtitle}
                </p>
                
                <h1 className={`text-white text-4xl md:text-5xl lg:text-[4.5rem] leading-[1.1] font-serif font-medium mb-6 transform transition-all duration-[1200ms] delay-500 ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  {slide.title.split('\n').map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </h1>

                {slide.description && (
                  <p className={`text-gray-300 text-sm md:text-base leading-relaxed mb-10 max-w-[400px] transform transition-all duration-[1200ms] delay-700 ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                    {slide.description}
                  </p>
                )}

                <div className={`transform transition-all duration-[1200ms] delay-1000 ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  <AnimatedButton to={slide.link} theme="dark">
                    {slide.buttonText}
                  </AnimatedButton>
                </div>
              </div>
            </div>

            {/* Right Image Area */}
            <div className="w-full md:w-7/12 lg:w-[55%] h-full relative overflow-hidden mt-8 md:mt-0 flex items-center justify-center">
              <img 
                src={slide.image} 
                alt={slide.title.replace('\n', ' ')} 
                className={`w-[90%] h-[95%] object-contain object-bottom transition-transform duration-[10000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-6 md:right-12 z-30 flex items-center gap-4">
        <button 
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors shadow-sm"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors shadow-sm"
          aria-label="Next slide"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Pagination - Bottom Left */}
      <div className="absolute bottom-8 left-6 md:left-12 lg:left-24 z-30 flex items-center gap-4">
        <div className="flex gap-2 items-center text-xs font-medium tracking-[0.1em] text-white">
          <span>{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="w-6 h-[1px] bg-white/50"></span>
          <span className="opacity-50">{String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>
      
    </div>
  );
};

export default HeroSlider;
