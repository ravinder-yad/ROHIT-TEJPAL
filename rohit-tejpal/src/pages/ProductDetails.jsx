import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Loader from '../components/ui/Loader';
import { FaWhatsapp } from 'react-icons/fa';
import { FiShoppingBag, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import AnimatedButton from '../components/ui/AnimatedButton';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = () => {
    if (product?.sizes?.length > 0 && !selectedSize) {
      toast.error('Please select a size first.');
      return;
    }
    addToCart(product, selectedSize, 1);
    toast.success('Added to bag!');
    navigate('/cart');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Product Not Found');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <Loader fullScreen={true} />;
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-serif text-[var(--color-main-bg)] mb-4">Product Not Found</h1>
        <Link to="/products" className="px-8 py-3 bg-[var(--color-main-bg)] text-[var(--color-text-main)] text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[var(--color-gold)] transition-colors">
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  // Format category string for display (e.g., 'tunic-set' -> 'Tunic Set')
  const displayCategory = (product.category || category).split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/products' },
    { label: displayCategory, path: `/products?category=${product.category}` },
    { label: product.name, path: null }
  ];

  const whatsappMessage = `Hi Rohit Tejpal Team, I want to order: ${product.name} (${product.price}). Please help me with the next steps.`;
  const whatsappUrl = `https://wa.me/919873737512?text=${encodeURIComponent(whatsappMessage)}`;

  // Determine available images
  const availableImages = [];
  if (product.images) {
    if (product.images.front) availableImages.push({ src: product.images.front, label: 'Front' });
    if (product.images.back) availableImages.push({ src: product.images.back, label: 'Back' });
    if (product.images.side) availableImages.push({ src: product.images.side, label: 'Side' });
    if (product.images.wide) availableImages.push({ src: product.images.wide, label: 'Wide' });
  }
  
  if (availableImages.length === 0 && product.image) {
    availableImages.push({ src: product.image, label: 'View' });
  }

  return (
    <div className="bg-[var(--color-main-bg)] min-h-screen py-12">
      <div className="container-max px-4 md:px-8">
        
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 mt-8">
          
          {/* Left: Image Gallery */}
          <div className={`w-full lg:w-3/5 grid ${availableImages.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-4 md:gap-6`}>
            {availableImages.map((imgObj, idx) => (
              <div key={idx} className="relative block overflow-hidden rounded-sm bg-[var(--color-alt-bg)] group">
                <img 
                  src={imgObj.src} 
                  alt={`${product.name} ${imgObj.label}`}
                  className="w-full h-auto object-cover object-top transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                />
                {availableImages.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-[var(--color-main-bg)]/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold tracking-widest text-[var(--color-text-main)] shadow-sm uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {imgObj.label}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-2/5 flex flex-col">
            <div className="sticky top-32">
              <span className="text-[var(--color-text-secondary)] text-[11px] uppercase tracking-[0.2em] font-bold mb-4 block">
                {displayCategory}
              </span>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[var(--color-text-main)] mb-6 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-start justify-between gap-4">
                <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] font-medium">
                  {product.price}
                </p>
                <button 
                  onClick={() => toggleWishlist(product)}
                  className="w-12 h-12 rounded-full border border-[var(--color-border)]/50 flex items-center justify-center text-[var(--color-text-main)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
                >
                  <FiHeart className={`w-5 h-5 ${isInWishlist(product._id || product.id) ? 'fill-[var(--color-gold)] text-[var(--color-gold)]' : ''}`} />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-10 pt-6">
                <button 
                  onClick={handleAddToCart}
                  disabled={product.inStock === false}
                  className="flex-1 bg-[var(--color-gold)] text-[var(--color-main-bg)] text-xs font-bold uppercase tracking-widest py-4 px-8 rounded-sm hover:bg-[var(--color-text-main)] transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <FiShoppingBag className="w-4 h-4" />
                  {product.inStock !== false ? 'Add to Bag' : 'Out of Stock'}
                </button>
                <button 
                  onClick={() => {
                    handleAddToCart();
                    navigate('/dashboard/cart');
                  }}
                  disabled={product.inStock === false}
                  className="flex-1 bg-[var(--color-text-main)] border border-[var(--color-text-main)] text-[var(--color-main-bg)] text-xs font-bold uppercase tracking-widest py-4 px-8 rounded-sm hover:bg-transparent hover:text-[var(--color-text-main)] hover:border-[var(--color-text-main)] transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>

              {/* Sizes */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold tracking-widest text-[var(--color-text-main)] uppercase">Select Size</span>
                  <button className="text-xs text-[var(--color-text-secondary)] underline hover:text-[var(--color-gold)] transition-colors">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {(product.sizes || ['S', 'M', 'L']).map((size, index) => (
                    <button 
                      key={index} 
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] px-4 py-3 border text-sm font-medium transition-colors rounded-sm ${
                        selectedSize === size 
                          ? 'border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-main-bg)]' 
                          : 'border-[var(--color-border)]/50 text-[var(--color-text-main)] hover:border-[var(--color-gold)]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                <AnimatedButton 
                  onClick={() => {
                    if (product?.sizes?.length > 0 && !selectedSize) {
                      toast.error('Please select a size first.');
                      return;
                    }
                    handleAddToCart();
                  }}
                  theme="gold"
                  fullWidth={true}
                  icon={false}
                >
                  <FiShoppingBag className="w-5 h-5" />
                  ADD TO BAG
                </AnimatedButton>
                <AnimatedButton 
                  href={whatsappUrl}
                  theme="dark"
                  fullWidth={true}
                  icon={false}
                >
                  <FaWhatsapp className="w-5 h-5 text-[var(--color-whatsapp)]" />
                  ORDER ON WHATSAPP
                </AnimatedButton>
              </div>

              {/* Product Description */}
              <div className="border-t border-[var(--color-border)]/50 pt-8 mt-8">
                <h3 className="text-xs font-bold tracking-widest text-[var(--color-text-main)] uppercase mb-4">Description</h3>
                <p className="text-sm text-[var(--color-text-secondary)] font-light leading-relaxed mb-6">
                  {product.description || "Discover refined Indian ethnic wear crafted with distinctive prints and thoughtful details. This beautiful piece features signature Rohit Tejpal craftsmanship, designed for both comfort and timeless elegance."}
                </p>
                <ul className="text-sm text-[var(--color-text-secondary)] font-light space-y-2">
                  <li>• Premium Fabric Quality</li>
                  <li>• Signature Prints</li>
                  <li>• Handcrafted Details</li>
                  <li>• Dry Clean Only</li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
