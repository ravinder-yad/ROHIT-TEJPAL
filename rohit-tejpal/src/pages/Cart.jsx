import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import AnimatedButton from '../components/ui/AnimatedButton';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  const subtotal = cartTotal;
  const shipping = subtotal > 0 ? 0 : 0; // FREE Delivery
  const total = subtotal + shipping;

  const handleCheckout = () => {
    const phoneNumber = "919873737512"; // The number used elsewhere in the site
    
    let message = "Hello Rohit Tejpal, I would like to place an order:\n\n";
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Size: ${item.size}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: ₹${item.price.toLocaleString('en-IN')}\n\n`;
    });
    
    message += `Subtotal: ₹${subtotal.toLocaleString('en-IN')}\n`;
    message += `Shipping: ₹${shipping.toLocaleString('en-IN')}\n`;
    message += `*Total: ₹${total.toLocaleString('en-IN')}*\n`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-[var(--color-main-bg)] min-h-screen text-[var(--color-text-main)] font-sans pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[var(--color-gold)] text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">
            Your Selection
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 tracking-wide">
            Shopping <span className="italic text-[var(--color-gold)]">Bag</span>
          </h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-8">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[var(--color-border)]/50 text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--color-text-secondary)]">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center py-6 border-b border-[var(--color-border)]/30 relative group">
                  
                  {/* Product Details */}
                  <div className="col-span-1 md:col-span-6 flex gap-6">
                    <div className="w-24 md:w-32 aspect-[3/4] bg-[var(--color-alt-bg)] overflow-hidden flex-shrink-0 border border-[var(--color-border)]/50">
                      <Link to={`/products/${item.category.toLowerCase().replace(/ /g, '-')}/${item.id}`}>
                        <img 
                          src={item.image || '/images/products/product_1.jpg'} 
                          alt={item.name} 
                          className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[var(--color-gold)] text-[10px] uppercase tracking-[0.2em] font-bold mb-2">
                        {item.category}
                      </span>
                      <Link to={`/products/${item.category.toLowerCase().replace(/ /g, '-')}/${item.id}`}>
                        <h3 className="text-base md:text-lg font-serif font-light text-[var(--color-text-main)] hover:text-[var(--color-gold)] transition-colors mb-2">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-[var(--color-text-secondary)] text-xs mb-4">Size: <span className="text-[var(--color-text-main)]">{item.size}</span></p>
                      
                      <button 
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-[var(--color-text-secondary)] text-xs uppercase tracking-widest flex items-center gap-2 hover:text-red-400 transition-colors w-fit"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price (Desktop) */}
                  <div className="hidden md:block col-span-2 text-center text-[var(--color-text-secondary)] font-light text-sm">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>

                  {/* Quantity */}
                  <div className="col-span-1 md:col-span-2 flex items-center md:justify-center">
                    <div className="flex items-center border border-[var(--color-border)]/50 bg-[var(--color-alt-bg)]">
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="p-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)] transition-colors"
                      >
                        <FiMinus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="p-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)] transition-colors"
                      >
                        <FiPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Price (Mobile) & Total (Desktop) */}
                  <div className="col-span-1 md:col-span-2 flex justify-between md:block md:text-right text-[var(--color-text-main)] font-medium">
                    <span className="md:hidden text-[var(--color-text-secondary)] text-sm">Total:</span>
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white/[0.02] border border-[var(--color-border)]/50 p-8 md:p-10 sticky top-32">
                <h3 className="text-xl font-serif font-light border-b border-[var(--color-border)]/50 pb-6 mb-6">Order Summary</h3>
                
                <div className="space-y-4 text-sm font-light mb-6 border-b border-[var(--color-border)]/50 pb-6">
                  <div className="flex justify-between text-[var(--color-text-secondary)]">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[var(--color-text-secondary)]">
                    <span>Shipping</span>
                    <span>₹{shipping.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-widest mt-2">* Taxes calculated at checkout</p>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="text-base uppercase tracking-widest font-medium">Total</span>
                  <span className="text-2xl font-serif text-[var(--color-gold)]">₹{total.toLocaleString('en-IN')}</span>
                </div>

                <AnimatedButton 
                  onClick={handleCheckout}
                  theme="gold"
                  fullWidth={true}
                >
                  Proceed To WhatsApp
                </AnimatedButton>
                
                <div className="mt-6 flex flex-col gap-4 text-center">
                  <Link to="/collections" className="text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)] transition-colors underline underline-offset-4">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-[var(--color-border)]/50 bg-white/[0.02] max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-[var(--color-alt-bg)] border border-[var(--color-border)]/50 flex items-center justify-center mb-8">
              <FiShoppingBag className="w-8 h-8 text-[var(--color-text-secondary)]" />
            </div>
            <h2 className="text-2xl font-serif font-light mb-4">Your bag is empty</h2>
            <p className="text-[var(--color-text-secondary)] text-sm mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your bag yet. Let's change that.
            </p>
            <AnimatedButton to="/collections" theme="gold">
              Start Shopping
            </AnimatedButton>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
