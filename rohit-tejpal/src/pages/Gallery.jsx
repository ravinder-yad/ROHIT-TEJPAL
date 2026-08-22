import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/ui/Loader';
import AnimatedButton from '../components/ui/AnimatedButton';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // Assume you have axios installed, or use fetch
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gallery`);
        if (!response.ok) throw new Error('Failed to fetch gallery');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="bg-[var(--color-main-bg)] min-h-screen text-[var(--color-text-main)] font-sans selection:bg-[var(--color-gold)] selection:text-[var(--color-main-bg)]">
      
      {/* Header */}
      <section className="h-[300px] flex flex-col items-center justify-center px-4 text-center border-b border-[var(--color-border)]/50 pt-16">
        <div className="w-full px-2 lg:px-12 2xl:px-24 mx-auto">
          <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
            VISUAL DIARY
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-light text-[var(--color-text-main)] mb-4 tracking-tight">
            The Gallery
          </h1>
          <p className="text-[var(--color-text-secondary)] font-light text-sm md:text-base max-w-2xl mx-auto italic">
            A curated visual journey through our collections and craftsmanship.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 px-2 sm:px-4 md:px-8 w-full">
          <div className="w-full mx-auto">
          
          {loading ? (
            <Loader />
          ) : images.length === 0 ? (
            <div className="text-center py-20 text-[var(--color-text-secondary)] font-light">
              No gallery images found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
              {images.map((img, index) => {
                // Create a dynamic, varied "bento box" pattern
                const mod = index % 8;
                let spanClass = "col-span-1 row-span-1";
                
                if (mod === 0) spanClass = "md:col-span-2 md:row-span-2"; // Large feature
                else if (mod === 3) spanClass = "md:col-span-2 md:row-span-1"; // Wide
                else if (mod === 4) spanClass = "md:col-span-1 md:row-span-2"; // Tall
                else if (mod === 7) spanClass = "md:col-span-2 md:row-span-1"; // Wide

                return (
                  <div 
                    key={img._id}
                    className={`${spanClass} relative group cursor-pointer overflow-hidden rounded-sm bg-[var(--color-alt-bg)] border border-[var(--color-border)]/30 shadow-md transition-all duration-500 hover:shadow-xl`}
                    onClick={() => setSelectedImage(img.imageUrl)}
                  >
                    <img 
                      src={img.imageUrl} 
                      alt="Gallery" 
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                      loading="lazy"
                    />
                    
                    {/* Subtle hover overlay matching the dark theme */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-end justify-center pb-4">
                      <span className="text-[var(--color-gold)] text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        View Image
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
            className="max-w-full max-h-[90vh] object-contain cursor-default border border-[var(--color-border)]/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
          <button 
            className="absolute top-6 right-6 text-[var(--color-text-main)]/70 hover:text-[var(--color-text-main)] transition-colors p-2"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Footer / CTA Section */}
      <section className="py-24 px-4 bg-[var(--color-main-bg)] text-center border-t border-[var(--color-border)]/50">
        <div className="max-w-4xl mx-auto">
          <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.4em] font-bold mb-6 block">
            Experience the Craft
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-[var(--color-text-main)] mb-6">
            Curated Elegance
          </h2>
          <p className="text-[var(--color-text-secondary)] font-light text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Every piece tells a story of meticulous craftsmanship and timeless design. Discover the full extent of our artistry by exploring our exclusive collections or booking a personalized styling consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <AnimatedButton 
              to="/collections" 
              theme="gold"
              className="min-w-[200px]"
            >
              Discover Collections
            </AnimatedButton>
            <AnimatedButton 
              to="/contact" 
              theme="dark"
              className="min-w-[200px]"
            >
              Get in Touch
            </AnimatedButton>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Gallery;
