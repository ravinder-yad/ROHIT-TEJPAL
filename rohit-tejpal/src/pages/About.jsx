import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedButton from '../components/ui/AnimatedButton';

const About = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gallery`);
        if (!response.ok) throw new Error('Failed to fetch gallery');
        const data = await response.json();
        // Take only first 6 images for About page collage
        setGalleryImages(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="bg-[var(--color-primary-dark)] min-h-screen text-white font-sans selection:bg-[var(--color-gold)] selection:text-[var(--color-primary-dark)] relative">
      
      {/* 1. Hero Section */}
      <section className="relative h-[60vh] md:h-[75vh] w-full flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/about_hero.jpg" 
            alt="Craftsmanship" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 px-4 w-full flex flex-col items-center">
          <span className="text-[var(--color-gold)] text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-8 block">
            Our Story
          </span>
          <h1 className="text-white text-5xl md:text-7xl font-serif font-light mb-8 leading-tight">
            Crafted With Intention
          </h1>
          <p className="text-gray-200 text-sm md:text-lg font-light tracking-wide max-w-xl mx-auto leading-relaxed">
            Thoughtful silhouettes. Refined craftsmanship.
          </p>
          
          <div className="mt-20 text-white/50 animate-bounce flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[0.2em] mb-2">Explore</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* 2. Brand Introduction */}
      <section className="py-24 md:py-40 px-4 bg-[var(--color-primary-dark)]">
        <div className="w-full px-2 lg:px-12 2xl:px-24 mx-auto">
          <div className="flex flex-col md:flex-row gap-16 lg:gap-32 items-start">
            
            {/* Left */}
            <div className="w-full md:w-5/12 flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-[var(--color-gold)]"></div>
                <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em] font-bold">
                  Our Story
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-serif font-light text-white leading-[1.2] tracking-tight">
                A modern expression of Indian fashion.
              </h2>
            </div>

            {/* Right */}
            <div className="w-full md:w-7/12 flex flex-col justify-center pt-2 md:pt-14 relative">
              <div className="absolute left-[-2rem] md:left-[-4rem] top-0 bottom-0 w-[1px] bg-white/10 hidden md:block"></div>
              
              <p className="text-gray-300 text-lg md:text-2xl font-light leading-relaxed mb-10">
                Rohit Tejpal is rooted in a vision of creating refined contemporary fashion with an emphasis on craftsmanship, fabric and timeless design.
              </p>
              
              <div className="pl-6 border-l-2 border-[var(--color-gold)]">
                <p className="text-white text-base md:text-xl font-medium leading-relaxed italic">
                  "Carefully crafted pieces made with attention to every single detail."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Craftsmanship Section */}
      <section className="py-24 md:py-40 bg-[var(--color-primary-dark)] border-t border-white/10 relative overflow-hidden px-4">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[var(--color-gold)]/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="w-full px-2 lg:px-12 2xl:px-24 mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Content (Left) */}
            <div className="order-2 lg:order-1 lg:w-7/12">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em] font-bold">
                  Craftsmanship
                </span>
                <div className="w-12 h-[1px] bg-[var(--color-gold)]"></div>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-[64px] font-serif font-light text-white mb-8 leading-[1.1] tracking-tight">
                The Art of Craft.
              </h2>
              
              <p className="text-white font-medium text-xl md:text-2xl mb-6 leading-relaxed max-w-lg">
                Every piece begins with <span className="text-[var(--color-gold)] italic font-serif">attention to detail.</span>
              </p>
              
              <p className="text-gray-300 font-light text-lg leading-relaxed mb-16 max-w-xl">
                From selecting the finest fabrics to the final finishing, each garment goes through a considered process where traditional craftsmanship meets contemporary design language.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                <div className="border-t border-white/10 pt-6">
                  <span className="text-[var(--color-gold)] font-serif text-3xl block mb-4 italic">01</span>
                  <p className="text-xs uppercase tracking-[0.2em] font-bold text-white">Quality Fabrics</p>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <span className="text-[var(--color-gold)] font-serif text-3xl block mb-4 italic">02</span>
                  <p className="text-xs uppercase tracking-[0.2em] font-bold text-white">Thoughtful Design</p>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <span className="text-[var(--color-gold)] font-serif text-3xl block mb-4 italic">03</span>
                  <p className="text-xs uppercase tracking-[0.2em] font-bold text-white">Detailed Finishing</p>
                </div>
              </div>
            </div>

            {/* Image (Right - Smaller and Framed) */}
            <div className="order-1 lg:order-2 lg:w-5/12 flex justify-center lg:justify-end w-full">
              <div className="relative w-[75%] sm:w-[60%] lg:w-[85%] max-w-[400px]">
                {/* Elegant offset frame */}
                <div className="absolute -inset-4 md:-inset-6 border border-[var(--color-gold)]/30 translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6"></div>
                
                <div className="relative aspect-[3/4] overflow-hidden bg-white/5 shadow-2xl">
                  <img 
                    src="/about_craft.jpg" 
                    alt="The Art of Craft" 
                    className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700 hover:scale-105" 
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* 5. Our Philosophy */}
      <section className="py-32 md:py-48 px-4 bg-[var(--color-primary-dark)] text-center relative overflow-hidden border-t border-white/10">
        {/* Decorative Vertical Lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-[var(--color-gold)]/50 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-t from-[var(--color-gold)]/50 to-transparent"></div>
        
        <div className="w-full px-2 lg:px-12 2xl:px-24 mx-auto relative z-10">
          {/* Giant Quote Mark */}
          <div className="text-[var(--color-gold)] opacity-10 font-serif text-[180px] md:text-[240px] leading-none absolute -top-24 md:-top-32 left-1/2 -translate-x-1/2 select-none">
            &ldquo;
          </div>
          
          <h2 className="text-[var(--color-gold)] text-xs uppercase tracking-[0.4em] font-bold mb-12 relative z-10">
            OUR PHILOSOPHY
          </h2>
          
          <h3 className="text-4xl md:text-6xl lg:text-[72px] font-serif font-light text-white leading-[1.1] tracking-tight mb-12 relative z-10">
            <span className="block mb-3">Less noise.</span>
            <span className="block mb-3 text-[var(--color-gold)] italic">More intention.</span>
            <span className="block">Better design.</span>
          </h3>
          
          <p className="text-gray-300 text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto relative z-10 leading-relaxed">
            We believe fashion should feel considered, comfortable, and absolutely timeless.
          </p>
        </div>
      </section>

      {/* 6. Design Language (Editorial Image) */}
      <section className="py-24 md:py-40 px-4 bg-[var(--color-primary-dark)] border-t border-white/10 overflow-hidden">
        <div className="w-full px-2 lg:px-12 2xl:px-24 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-0">
            
            {/* Image (Editorial Left) */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:ml-0 w-[85%] sm:w-[70%] lg:w-[90%]">
                <img 
                  src="/about_editorial.jpg" 
                  alt="Editorial Fashion" 
                  className="w-full h-full object-cover z-10 relative grayscale-[20%] hover:grayscale-0 transition-all duration-700" 
                />
                {/* Decorative background block */}
                <div className="absolute top-8 -right-6 md:top-12 md:-right-12 w-full h-full bg-[var(--color-gold)]/5 border border-[var(--color-gold)]/20 z-0"></div>
                {/* Accent corner */}
                <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 w-24 h-24 border-l border-b border-[var(--color-gold)]/60 z-20"></div>
              </div>
            </div>

            {/* Content (Right, overlapping slightly on desktop) */}
            <div className="w-full lg:w-1/2 lg:-ml-12 z-20 relative">
              <div className="bg-[var(--color-primary-dark)]/95 backdrop-blur-md p-8 md:p-12 lg:p-16 shadow-2xl border border-white/5 relative">
                
                {/* Numbers accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-gold)]/5 flex items-center justify-center border-b border-l border-[var(--color-gold)]/10 text-white/20 font-serif text-4xl hidden sm:flex">
                  06
                </div>
                
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em] font-bold">
                    DESIGN LANGUAGE
                  </span>
                  <div className="w-12 h-[1px] bg-[var(--color-gold)]"></div>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-[56px] font-serif font-light text-white leading-[1.1] mb-8 tracking-tight">
                  Rooted in <span className="italic text-[var(--color-gold)]">tradition</span>,<br/>
                  designed for <span className="italic">today.</span>
                </h2>
                
                <p className="text-gray-300 text-lg font-light leading-relaxed mb-12">
                  Our collections are an ongoing exploration of modern elegance. We draw inspiration from classical Indian aesthetics, stripping away the excess to reveal the pure beauty of form, drape, and texture.
                </p>
                
                <AnimatedButton to="/collections" theme="gold">
                  Explore Collections
                </AnimatedButton>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 8. Our Values / Commitment */}
      <section className="py-24 md:py-32 px-4 bg-white/5 border-t border-white/10">
        <div className="w-full px-2 lg:px-12 2xl:px-24 mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-[var(--color-gold)] text-xs uppercase tracking-[0.4em] font-bold mb-6">
              OUR COMMITMENT
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-[56px] font-serif font-light text-white tracking-tight">
              Attention to every detail.
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Value 1 */}
            <div className="group bg-[var(--color-primary-dark)] p-10 lg:p-14 border border-white/10 hover:border-[var(--color-gold)]/50 transition-colors duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-gold)]/5 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
              <span className="text-[var(--color-gold)] font-serif text-3xl mb-8 block italic">01</span>
              <h4 className="text-sm uppercase tracking-[0.3em] font-bold text-white mb-6">QUALITY</h4>
              <div className="w-12 h-[1px] bg-white/20 mb-6 group-hover:bg-[var(--color-gold)] transition-colors duration-500"></div>
              <p className="text-gray-400 text-base lg:text-lg font-light leading-relaxed">
                Thoughtful materials and finishing.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="group bg-[var(--color-primary-dark)] p-10 lg:p-14 border border-white/10 hover:border-[var(--color-gold)]/50 transition-colors duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-gold)]/5 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
              <span className="text-[var(--color-gold)] font-serif text-3xl mb-8 block italic">02</span>
              <h4 className="text-sm uppercase tracking-[0.3em] font-bold text-white mb-6">DESIGN</h4>
              <div className="w-12 h-[1px] bg-white/20 mb-6 group-hover:bg-[var(--color-gold)] transition-colors duration-500"></div>
              <p className="text-gray-400 text-base lg:text-lg font-light leading-relaxed">
                Modern yet timeless silhouettes.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="group bg-[var(--color-primary-dark)] p-10 lg:p-14 border border-white/10 hover:border-[var(--color-gold)]/50 transition-colors duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-gold)]/5 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
              <span className="text-[var(--color-gold)] font-serif text-3xl mb-8 block italic">03</span>
              <h4 className="text-sm uppercase tracking-[0.3em] font-bold text-white mb-6">CONSISTENCY</h4>
              <div className="w-12 h-[1px] bg-white/20 mb-6 group-hover:bg-[var(--color-gold)] transition-colors duration-500"></div>
              <p className="text-gray-400 text-base lg:text-lg font-light leading-relaxed">
                A considered experience from creation to delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Brand Gallery */}
      <section className="py-24 md:py-32 px-4 bg-[var(--color-primary-dark)] border-t border-white/10">
        <div className="w-full px-2 lg:px-12 2xl:px-24 mx-auto">
          <div className="text-center mb-16">
            <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
              VISUAL DIARY
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white mb-4">
              The Collection
            </h2>
            <p className="text-gray-400 font-light text-sm tracking-widest uppercase">Click to expand</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="w-10 h-10 border-4 border-white/20 border-t-[var(--color-gold)] rounded-full animate-spin"></div>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-10 text-gray-500 font-light">
              Visual Diary is being curated.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
              {galleryImages.map((img) => (
                <div 
                  key={img._id}
                  className={`${img.span} rounded-sm overflow-hidden border border-white/5 relative group cursor-zoom-in bg-white/5`}
                  onClick={() => setSelectedImage(img.imageUrl)}
                >
                  <img 
                    src={img.imageUrl} 
                    alt="Brand Visual" 
                    className={`w-full h-full object-cover ${img.aspect || ''} transition-transform duration-700 group-hover:scale-105`} 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-md">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="relative h-[300px] w-full flex items-center justify-center bg-[var(--color-primary-dark)] overflow-hidden border-t border-white/10">
        {/* Subtle decorative background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-gold)]/5 to-transparent opacity-50"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)]/30 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 w-full">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-4 tracking-wide">
            DISCOVER THE COLLECTION
          </h2>
          <p className="text-gray-400 font-light text-base md:text-lg mb-10 italic">
            Explore pieces shaped by craftsmanship, fabric and contemporary design.
          </p>
          <AnimatedButton to="/products" theme="gold">
            SHOP COLLECTION
          </AnimatedButton>
        </div>
      </section>
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Expanded Gallery" 
            className="max-w-full max-h-[90vh] object-contain cursor-default border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

    </div>
  );
};

export default About;
