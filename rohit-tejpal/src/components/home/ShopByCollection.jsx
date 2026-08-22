import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const ShopByCollection = () => {
  const curatedSelections = [
    {
      _id: '1',
      name: 'EMERALD ELEGANCE',
      slug: 'emerald-elegance',
      image: '/images/curated/curated-1.jpg',
      subtitle: 'Festive Collection'
    },
    {
      _id: '2',
      name: 'AZURE GRACE',
      slug: 'azure-grace',
      image: '/images/curated/curated-2.jpg',
      subtitle: 'Summer Edit'
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[var(--color-main-bg)]">
      <div className="container-max px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
            <span className="text-[var(--color-gold)] text-[10px] font-semibold tracking-[0.3em] uppercase">
              CURATED SELECTIONS
            </span>
            <span className="w-12 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
          </div>
          
          <h2 className="text-[var(--color-text-main)] text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-wide">
            EXPLORE OUR <span className="italic text-[var(--color-gold)] font-medium">COLLECTIONS</span>
          </h2>
        </div>

        {/* Card Grid with Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {curatedSelections.map((collection) => (
            <div key={collection._id} className="group relative overflow-hidden border-[3px] border-[var(--color-border)]/50 hover:border-[var(--color-gold)]/50 transition-colors duration-500 h-[500px] md:h-[600px]">
              
              {/* Image Container */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-full object-cover object-top transition-transform duration-[10000ms] ease-out group-hover:scale-110"
                />
              </div>
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/90 via-[var(--color-primary-dark)]/30 to-transparent transition-opacity duration-700"></div>
              
              {/* Card Content over Image */}
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col items-center text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[var(--color-gold)] text-[10px] font-semibold tracking-[0.3em] uppercase mb-3">
                  {collection.subtitle}
                </span>
                
                <h3 className="text-[var(--color-text-main)] text-2xl md:text-3xl font-serif font-light tracking-widest mb-6">
                  {collection.name}
                </h3>
                
                <Link 
                  to="/products"
                  className="inline-flex items-center gap-3 px-8 py-3 border border-[var(--color-border)]/30 text-[var(--color-text-main)] text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-white hover:text-[var(--color-main-bg)] transition-colors duration-300"
                >
                  <span>SHOP NOW</span>
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ShopByCollection;
