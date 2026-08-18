import { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiChevronDown, FiFilter, FiX } from 'react-icons/fi';
import axios from 'axios';
import ProductCard from '../components/products/ProductCard';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Loader from '../components/ui/Loader';
import AnimatedButton from '../components/ui/AnimatedButton';

const CATEGORIES = [
  { id: 'all', label: 'All Products', path: '/products', heroTitle: 'THE SHOP', heroSubtitle: 'Discover the Rohit Tejpal Collection' },
  { id: 'tunic-set', label: 'Tunic Set', path: '/products?category=tunic-set', heroTitle: 'TUNIC SETS', heroSubtitle: 'Elegant and versatile tunic collections' },
  { id: 'kurta-set', label: 'Kurta Set', path: '/products?category=kurta-set', heroTitle: 'KURTA SETS', heroSubtitle: 'Comfortable & stylish ethnic sets' },
  { id: 'kaftans', label: 'Kaftans', path: '/products?category=kaftans', heroTitle: 'KAFTANS', heroSubtitle: 'Relaxed and beautiful silhouettes' }
];

const Products = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  
  // Find the active category object to display dynamic hero text
  const activeCategoryObj = CATEGORIES.find(c => c.id === currentCategory) || CATEGORIES[0];

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [displayCount, setDisplayCount] = useState(20);
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter States
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('Newest');

  const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const PRICE_RANGES = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-5000', label: 'Under ₹5000' },
    { id: '5000-10000', label: '₹5000 - ₹10000' },
    { id: 'over-10000', label: 'Over ₹10000' }
  ];

  // Fetch products from API whenever category changes
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const url = currentCategory === 'all' 
          ? `${import.meta.env.VITE_API_URL}/api/products`
          : `${import.meta.env.VITE_API_URL}/api/products?category=${currentCategory}`;
        const res = await axios.get(url);
        // Only show active products on the frontend
        setProducts(res.data.filter(p => p.status === 'active'));
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
    
    // Reset pagination
    setDisplayCount(20);
  }, [currentCategory]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        (p.name && p.name.toLowerCase().includes(q)) || 
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.collectionRef && typeof p.collectionRef === 'object' && p.collectionRef.name && p.collectionRef.name.toLowerCase().includes(q))
      );
    }

    // Filter by Size
    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes && p.sizes.some(s => selectedSizes.includes(s)));
    }

    // Filter by Price
    if (priceRange !== 'all') {
      result = result.filter(p => {
        if (priceRange === 'under-5000') return p.price < 5000;
        if (priceRange === '5000-10000') return p.price >= 5000 && p.price <= 10000;
        if (priceRange === 'over-10000') return p.price > 10000;
        return true;
      });
    }

    // Sort
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Name: A-Z') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    // Newest is default (presumed sorted by backend)

    return result;
  }, [products, searchQuery, selectedSizes, priceRange, sortBy]);

  const visibleProducts = filteredAndSortedProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredAndSortedProducts.length;

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 20);
  };

  // Generate breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: currentCategory === 'all' ? null : '/products' }
  ];
  if (currentCategory !== 'all') {
    breadcrumbItems.push({ label: activeCategoryObj.label, path: null });
  }

  return (
    <div className="bg-[var(--color-primary-dark)] min-h-screen">
      
      {/* Editorial Hero Header */}
      <section className="bg-[var(--color-primary-dark)] border-b border-white/10 flex flex-col items-center justify-center text-center px-4 py-12 md:py-16 min-h-[180px] md:min-h-[240px]">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-wide mb-4 uppercase">
          {searchQuery ? (
            <span className="text-[var(--color-gold)]">Search Results</span>
          ) : currentCategory === 'all' ? (
            <><span className="italic text-[var(--color-gold)]">THE</span> SHOP</>
          ) : (
            activeCategoryObj.heroTitle
          )}
        </h1>
        <p className="text-gray-300 text-sm md:text-base font-light tracking-widest uppercase mb-2">
          {searchQuery ? `Showing results for "${searchQuery}"` : activeCategoryObj.heroSubtitle}
        </p>
        <div className="flex items-center gap-4 mt-4">
          <span className="w-12 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
          <p className="text-[var(--color-gold)] text-[10px] md:text-xs font-semibold tracking-widest uppercase text-center">
            Refined silhouettes • Distinctive prints • Indian craftsmanship
          </p>
          <span className="w-12 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
        </div>
      </section>

      <div className="container-max px-4 md:px-8 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Category Navigation */}
        <div className="mb-12 border-b border-white/10">
          <div className="flex flex-col items-center text-center mb-8">
            <span className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
              BY CATEGORY
            </span>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {CATEGORIES.map(cat => {
                const isActive = currentCategory === cat.id;
                return (
                  <Link 
                    key={cat.id} 
                    to={cat.path}
                    className={`relative pb-3 text-xs md:text-sm uppercase tracking-widest font-semibold transition-colors ${
                      isActive ? 'text-[var(--color-gold)]' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-gold)]"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-white/10 gap-4">
          <span className="text-white text-xs font-bold tracking-widest uppercase">
            {filteredAndSortedProducts.length} PRODUCTS
          </span>
          
          <div className="flex items-center gap-6 self-end md:self-auto">
            {/* Filter Toggle */}
            <button 
              className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors ${isFilterOpen ? 'text-[var(--color-gold)]' : 'text-white hover:text-[var(--color-gold)]'}`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              FILTERS
              <FiFilter className="w-4 h-4" />
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center gap-2 text-white text-xs font-bold tracking-widest uppercase hover:text-[var(--color-gold)] transition-colors"
                onClick={() => setIsSortingOpen(!isSortingOpen)}
              >
                {sortBy === 'Newest' ? 'SORT BY' : sortBy}
                <FiChevronDown className={`w-4 h-4 transition-transform ${isSortingOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isSortingOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--color-primary-dark)] border border-white/10 shadow-xl z-30">
                  <ul className="py-2">
                    {['Newest', 'Price: Low to High', 'Price: High to Low', 'Name: A-Z'].map(sort => (
                      <li key={sort}>
                        <button 
                          onClick={() => { setSortBy(sort); setIsSortingOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-xs uppercase tracking-wider transition-colors ${sortBy === sort ? 'text-[var(--color-gold)] bg-white/5' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                        >
                          {sort}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filter Panel (Expandable) */}
        {isFilterOpen && (
          <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-sm animate-fade-in flex flex-col md:flex-row gap-8 md:gap-16">
            
            {/* Size Filter */}
            <div className="flex-1">
              <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-4">Size</h3>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSizes(prev => 
                      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
                    )}
                    className={`w-10 h-10 flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                      selectedSizes.includes(size) 
                        ? 'border border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-primary-dark)]' 
                        : 'border border-white/20 text-gray-300 hover:border-white/60 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="flex-1">
              <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-4">Price Range</h3>
              <div className="flex flex-col gap-3">
                {PRICE_RANGES.map(range => (
                  <label 
                    key={range.id} 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setPriceRange(range.id)}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${priceRange === range.id ? 'border-[var(--color-gold)]' : 'border-white/30 group-hover:border-[var(--color-gold)]'}`}>
                      {priceRange === range.id && <div className="w-2 h-2 rounded-full bg-[var(--color-gold)]"></div>}
                    </div>
                    <span className={`text-sm tracking-wide transition-colors ${priceRange === range.id ? 'text-white font-medium' : 'text-gray-400 group-hover:text-white'}`}>
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Clear Filters */}
            <div className="flex items-end md:justify-end md:ml-auto">
              {(selectedSizes.length > 0 || priceRange !== 'all' || sortBy !== 'Newest') && (
                <button 
                  onClick={() => { setSelectedSizes([]); setPriceRange('all'); setSortBy('Newest'); }}
                  className="text-[10px] text-gray-400 hover:text-[var(--color-gold)] uppercase tracking-[0.2em] font-bold underline transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>

          </div>
        )}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="text-center py-32 text-red-400">
            <p>{error}</p>
          </div>
        ) : filteredAndSortedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-16">
              {visibleProducts.map(product => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
            
            {/* Pagination / Load More */}
            {hasMore && (
              <div className="flex flex-col items-center justify-center mt-8 mb-16">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-6">
                  Showing {visibleProducts.length} of {filteredAndSortedProducts.length} products
                </p>
                <AnimatedButton onClick={handleLoadMore} theme="gold">
                  LOAD MORE
                </AnimatedButton>
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
              New styles for this category are coming soon.
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

export default Products;
