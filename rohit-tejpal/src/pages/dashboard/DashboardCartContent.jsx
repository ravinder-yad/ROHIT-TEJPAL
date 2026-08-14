import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const DashboardCartContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  const subtotal = cartTotal;
  const shipping = subtotal > 0 ? 0 : 0; // FREE Delivery
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/checkout');
  };

  return (
    <div className="mx-auto space-y-8 pb-12" style={{ maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-primary-dark)', margin: '0 0 8px 0' }}>My Bag</h2>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>Review your items and proceed to checkout.</p>
      </div>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items List */}
          <div className="flex-1 space-y-6">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-2 border-b border-gray-200 text-[11px] uppercase tracking-wider font-bold text-gray-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-6 border-b border-gray-100 relative group">
                
                {/* Product Details */}
                <div className="col-span-1 md:col-span-6 flex gap-4">
                  <div className="w-20 md:w-24 aspect-[3/4] bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-200 rounded-md">
                    <Link to={`/products/${item.category?.toLowerCase().replace(/ /g, '-') || 'collection'}/${item.id}`}>
                      <img 
                        src={item.image || '/images/products/product_1.jpg'} 
                        alt={item.name} 
                        className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[var(--color-gold)] text-[10px] uppercase tracking-[0.2em] font-bold mb-1">
                      {item.category}
                    </span>
                    <Link to={`/products/${item.category?.toLowerCase().replace(/ /g, '-') || 'collection'}/${item.id}`}>
                      <h3 className="text-base font-bold text-[var(--color-primary-dark)] hover:text-[var(--color-gold)] transition-colors mb-1 leading-tight">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-gray-500 text-xs mb-3 font-medium">Size: <span className="text-gray-900">{item.size}</span></p>
                    
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-gray-400 text-xs uppercase tracking-widest flex items-center gap-1.5 hover:text-red-500 transition-colors w-fit font-bold"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>

                {/* Price (Desktop) */}
                <div className="hidden md:block col-span-2 text-center text-gray-700 font-medium text-sm">
                  ₹{item.price.toLocaleString('en-IN')}
                </div>

                {/* Quantity */}
                <div className="col-span-2 flex md:justify-center items-center mt-4 md:mt-0">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-[var(--color-primary-dark)] transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-[var(--color-primary-dark)]">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-[var(--color-primary-dark)] transition-colors"
                    >
                      <FiPlus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Total & Mobile Price */}
                <div className="col-span-2 flex justify-between items-center md:block md:text-right text-[var(--color-primary-dark)] font-bold mt-2 md:mt-0">
                  <span className="md:hidden text-gray-500 text-sm font-normal">Total:</span>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
                
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24 shadow-sm">
              <h3 className="text-lg font-bold text-[var(--color-primary-dark)] mb-6 uppercase tracking-wide">Order Summary</h3>
              
              <div className="space-y-4 text-sm mb-6 pb-6 border-b border-gray-100 font-medium">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-gray-900">₹{shipping.toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-8">
                <span className="text-base font-bold text-gray-900 uppercase tracking-wide">Total</span>
                <span className="text-2xl font-bold text-[var(--color-primary-dark)]">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full py-3.5 bg-[var(--color-gold)] text-white text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-md hover:bg-[#c2962a] transition-all transform hover:-translate-y-0.5 shadow-md"
              >
                Checkout <FiArrowRight />
              </button>
              
              <p className="text-[11px] text-gray-400 text-center mt-4 uppercase tracking-wider font-medium">
                Secure online payment processing
              </p>
            </div>
          </div>
          
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <FiShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-3">Your bag is empty</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any items to your bag yet. Discover our latest collections.</p>
          
          <Link to="/products" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-primary-dark)] text-white text-xs font-bold uppercase tracking-widest rounded-md hover:bg-[var(--color-gold)] transition-colors">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardCartContent;
