import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import AnimatedButton from '../components/ui/AnimatedButton';

const Collections = () => {
  const collections = [
    {
      _id: '1',
      name: 'EMERALD ELEGANCE',
      slug: 'emerald-elegance',
      image: '/images/curated/curated-1.jpg',
      description: 'Festive Collection'
    },
    {
      _id: '2',
      name: 'AZURE GRACE',
      slug: 'azure-grace',
      image: '/images/curated/curated-2.jpg',
      description: 'Summer Edit'
    }
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Collections', path: null }
  ];

  return (
    <div className="bg-[var(--color-main-bg)] min-h-screen pb-16">
      {/* Hero Header */}
      <section className="border-b border-[var(--color-border)]/50 flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 min-h-[250px]">
        <h1 className="text-[var(--color-text-main)] text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-wide mb-4 uppercase">
          <span className="italic text-[var(--color-gold)]">OUR</span> COLLECTIONS
        </h1>
        <p className="text-[var(--color-text-secondary)] text-sm md:text-base font-light tracking-widest uppercase mb-2">
          Curated styles for every occasion
        </p>
        <div className="flex items-center gap-4 mt-6">
          <span className="w-12 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
          <p className="text-[var(--color-gold)] text-[10px] md:text-xs font-semibold tracking-widest uppercase text-center">
            Explore our exclusive edits
          </p>
          <span className="w-12 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
        </div>
      </section>

      <div className="container-max px-4 md:px-8 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto mt-12">
          {collections.map(collection => (
            <Link 
              key={collection._id} 
              to={`/products`}
              className="group relative block overflow-hidden rounded-sm border-[3px] border-[var(--color-border)]/50 hover:border-[var(--color-gold)]/50 transition-colors duration-500 h-[500px] md:h-[600px]"
            >
              <div className="absolute inset-0 bg-[var(--color-alt-bg)]">
                <img 
                  src={collection.image} 
                  alt={collection.name} 
                  className="w-full h-full object-cover object-top transition-transform duration-[10000ms] ease-out group-hover:scale-110"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-main-bg)]/90 via-[var(--color-main-bg)]/40 to-transparent group-hover:from-[var(--color-main-bg)]/95 transition-colors duration-500"></div>
              </div>
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end text-center p-8 pb-10">
                <h2 className="text-[var(--color-gold)] text-[10px] font-semibold tracking-[0.3em] uppercase mb-3 transform group-hover:-translate-y-2 transition-transform duration-500">
                  {collection.description}
                </h2>
                <h3 className="text-[var(--color-text-main)] text-2xl md:text-3xl font-serif font-light tracking-widest mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">
                  {collection.name}
                </h3>
                <AnimatedButton as="span" theme="gold">
                  Shop Now
                </AnimatedButton>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
