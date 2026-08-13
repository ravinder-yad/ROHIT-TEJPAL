import { FaInstagram } from 'react-icons/fa';

const InstagramFeed = () => {
  const images = [
    '/images/collections/ethnic.jpg',
    '/images/collections/dresses.jpg',
    '/images/hero/hero_slide_2.jpg',
    '/images/collections/community_last.jpg'
  ];

  const INSTAGRAM_URL = "https://www.instagram.com/rohit.tejpal_official?igsh=Y2p0YW9nY3lrNWR6";

  return (
    <section className="py-24 md:py-32 bg-[var(--color-primary-dark)] border-t border-white/5">
      <div className="container-max px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
            <span className="text-[var(--color-gold)] text-[10px] font-semibold tracking-[0.3em] uppercase">
              JOIN THE COMMUNITY
            </span>
            <span className="w-12 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
          </div>
          
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-wide mb-6">
            FOLLOW <span className="italic text-[var(--color-gold)] font-medium">ROHIT TEJPAL</span>
          </h2>
          <a 
            href={INSTAGRAM_URL}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[var(--color-gold)] transition-colors text-xs md:text-sm tracking-[0.2em] uppercase font-semibold"
          >
            @rohit.tejpal_official
          </a>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {images.map((img, index) => (
            <a 
              key={index}
              href={INSTAGRAM_URL}
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative aspect-square overflow-hidden group bg-white/5 block"
            >
              <img 
                src={img} 
                alt={`Instagram Feed ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[3000ms] ease-out group-hover:scale-110"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <FaInstagram className="w-8 h-8 text-white" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <a 
            href={INSTAGRAM_URL}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-12 py-4 border border-[var(--color-gold)] text-[12px] font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-primary-dark)] transition-all duration-300"
          >
            <FaInstagram className="w-4 h-4" />
            FOLLOW ON INSTAGRAM
          </a>
        </div>

      </div>
    </section>
  );
};

export default InstagramFeed;
