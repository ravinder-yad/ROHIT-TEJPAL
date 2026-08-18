import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import axios from 'axios';
import ProductCard from '../components/products/ProductCard';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Loader from '../components/ui/Loader';
import AnimatedButton from '../components/ui/AnimatedButton';

const CollectionDetails = () => {
  const { slug } = useParams();
  const [collection, setCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [isSortingOpen, setIsSortingOpen] = useState(false);

  useEffect(() => {
    const fetchCollectionData = async () => {
      setIsLoading(true);
      try {
        // Fetch Collection details
        const collRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/collections/${slug}`);
        setCollection(collRes.data);

        // Fetch Products in this collection
        const prodRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/products?collection=${slug}`);
        // Filter out drafts or inactive products if needed, but assuming API handles it or we do it here
        setProducts(prodRes.data.filter(p => p.status === 'active'));
        
        setError(null);
      } catch (err) {
        console.error('Error fetching collection data:', err);
        setError('Collection not found or failed to load');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollectionData();
  }, [slug]);

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' }); // Scroll back up to grid
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Collections', path: '/collections' },
    { label: collection ? collection.name : 'Loading...', path: null }
  ];

  if (isLoading) {
    return <Loader fullScreen={true} />;
  }

  if (error || !collection) {
    return (
      <div className="bg-[var(--color-primary-dark)] min-h-screen pt-32 pb-16 px-4 text-center">
        <h2 className="text-2xl font-serif text-white mb-4">COLLECTION NOT FOUND</h2>
        <p className="text-gray-400 mb-8 font-light">The collection you are looking for does not exist.</p>
        <AnimatedButton to="/collections" theme="gold">
          VIEW ALL COLLECTIONS
        </AnimatedButton>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-primary-dark)] min-h-screen">
      
      {/* Editorial Hero Header */}
      <section 
        className="relative border-b border-white/10 flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 min-h-[300px]"
      >
        {/* Background Image if available */}
        {collection.image && (
          <div className="absolute inset-0 z-0">
            <img src={collection.image} alt={collection.name} className="w-full h-full object-cover object-top opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)] to-transparent"></div>
          </div>
        )}
        
        <div className="relative z-10">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-wide mb-4 uppercase">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="text-gray-300 text-sm md:text-base font-light tracking-widest uppercase mb-2 max-w-2xl mx-auto">
              {collection.description}
            </p>
          )}
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="w-12 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
            <p className="text-[var(--color-gold)] text-[10px] md:text-xs font-semibold tracking-widest uppercase text-center">
              Curated Selection
            </p>
            <span className="w-12 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
          </div>
        </div>
      </section>

      <div className="container-max px-4 md:px-8 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Product Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 mt-8">
          <span className="text-white text-xs font-bold tracking-widest uppercase">
            {products.length} PRODUCTS
          </span>
          
          <div className="relative">
            <button 
              className="flex items-center gap-2 text-white text-xs font-bold tracking-widest uppercase hover:text-[var(--color-gold)] transition-colors"
              onClick={() => setIsSortingOpen(!isSortingOpen)}
            >
              SORT BY
              <FiChevronDown className={`w-4 h-4 transition-transform ${isSortingOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isSortingOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl border border-gray-100 z-30">
                <ul className="py-2">
                  {['Newest', 'Price: Low to High', 'Price: High to Low', 'Name: A-Z'].map(sort => (
                    <li key={sort}>
                      <button className="w-full text-left px-4 py-2 text-xs uppercase tracking-wider text-gray-600 hover:bg-[#F7F3EA] hover:text-[var(--color-gold)] transition-colors">
                        {sort}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-16">
              {visibleProducts.map(product => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
            
            {/* Pagination Numbers */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 mb-16">
                <button 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:text-white transition-colors"
                >
                  &larr;
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors ${
                        currentPage === pageNumber
                          ? 'bg-[var(--color-gold)] text-[var(--color-primary-dark)] border border-[var(--color-gold)]'
                          : 'border border-white/20 text-white hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:text-white transition-colors"
                >
                  &rarr;
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-32 text-center border border-white/5 bg-white/5 rounded-sm">
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
              NO PRODUCTS FOUND
            </h2>
            <p className="text-gray-400 mb-8 font-light">
              We are currently updating this collection. Check back soon.
            </p>
            <AnimatedButton to="/products" theme="gold">
              VIEW ALL PRODUCTS
            </AnimatedButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionDetails;
