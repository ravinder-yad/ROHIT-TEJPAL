import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { FiCheckCircle, FiMapPin, FiCreditCard, FiShoppingBag, FiPlus, FiLock } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    }
    if (cartItems.length === 0) {
      navigate('/cart');
    }
    
    // Set default address if available
    if (user?.addresses?.length > 0) {
      const defaultAddr = user.addresses.find(a => a.isDefault) || user.addresses[0];
      setSelectedAddress(defaultAddr);
    }
  }, [user, navigate, cartItems.length]);

  const subtotal = cartTotal;
  const shipping = subtotal > 0 ? 0 : 0; // FREE Delivery as requested
  const total = subtotal + shipping;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    setLoading(true);
    try {
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      // 1. Create order in our database
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.quantity,
          image: item.image,
          price: item.price,
          size: item.size,
          product: item.id
        })),
        shippingAddress: selectedAddress,
        paymentMethod: 'Razorpay',
        itemsPrice: subtotal,
        shippingPrice: shipping,
        totalPrice: total,
      };

      const orderResponse = await axios.post(`${apiUrl}/api/orders`, orderData, { withCredentials: true });
      const createdOrder = orderResponse.data;

      // 2. Create Razorpay order
      const rpResponse = await axios.post(`${apiUrl}/api/payment/create-order`, { orderId: createdOrder._id }, { withCredentials: true });
      const { id, amount, currency, key } = rpResponse.data;

      // Handle mock mode
      if (key === 'rzp_test_mockkey') {
        toast.success("Mock Mode: Simulating successful payment without Razorpay popup.");
        try {
          const verifyRes = await axios.post(`${apiUrl}/api/payment/verify`, {
            razorpay_order_id: id,
            razorpay_payment_id: 'mock_payment_' + Date.now(),
            razorpay_signature: 'mock_signature',
            orderId: createdOrder._id
          }, { withCredentials: true });

          if (verifyRes.data.message === 'Payment verified successfully') {
            clearCart();
            navigate(`/checkout/success/${createdOrder._id}`);
          }
        } catch (err) {
          navigate(`/checkout/fail/${createdOrder._id}`);
        }
        setLoading(false);
        return;
      }

      // 3. Open Razorpay Checkout
      const options = {
        key: key,
        amount: amount,
        currency: currency,
        name: 'Rohit Tejpal',
        description: 'Order Payment',
        order_id: id,
        handler: async function (response) {
          try {
            // 4. Verify Payment on Backend
            const verifyRes = await axios.post(`${apiUrl}/api/payment/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: createdOrder._id
            }, { withCredentials: true });

            if (verifyRes.data.message === 'Payment verified successfully') {
              clearCart();
              navigate(`/checkout/success/${createdOrder._id}`);
            }
          } catch (err) {
            console.error("Payment Verification Failed", err);
            navigate(`/checkout/fail/${createdOrder._id}`);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: selectedAddress.phone || user.phone || ''
        },
        theme: {
          color: '#1a1a1a' // primary-dark color
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        console.error("Payment Failed", response.error);
        navigate(`/checkout/fail/${createdOrder._id}`);
      });
      paymentObject.open();

    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Something went wrong during checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user || cartItems.length === 0) return null;

  return (
    <div className="pt-24 pb-16 bg-[var(--color-main-bg)] min-h-screen text-[var(--color-text-main)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-bold text-[var(--color-gold)] mb-8 text-center uppercase tracking-widest">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Checkout Area */}
          <div className="flex-1 space-y-6">
            
            {/* Step 1: Address */}
            <div className={`bg-[var(--color-alt-bg)] rounded-lg border ${step === 1 ? 'border-[var(--color-gold)] shadow-sm' : 'border-[var(--color-border)]/50'} p-6 transition-all`}>
              <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setStep(1)}>
                <h2 className={`text-lg font-bold flex items-center gap-3 ${step === 1 ? 'text-[var(--color-gold)]' : 'text-[var(--color-text-secondary)]'}`}>
                  <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm ${step === 1 ? 'bg-[var(--color-gold)]/10 border-[var(--color-gold)] text-[var(--color-gold)]' : 'bg-transparent border-[var(--color-border)]/50'}`}>1</span>
                  Delivery Address
                </h2>
                {step > 1 && selectedAddress && <FiCheckCircle className="text-[var(--color-gold)] w-5 h-5" />}
              </div>
              
              {step === 1 && (
                <div className="mt-4 space-y-4 animate-fadeIn">
                  {user?.addresses?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.addresses.map((addr, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => setSelectedAddress(addr)}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedAddress?._id === addr._id ? 'border-[var(--color-gold)] bg-[var(--color-alt-bg)]' : 'border-[var(--color-border)]/50 hover:border-[var(--color-border)]/50'}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-main-bg)] bg-[var(--color-gold)] px-2 py-0.5 rounded shadow-sm border border-transparent">{addr.type}</span>
                            {selectedAddress?._id === addr._id && <FiCheckCircle className="text-[var(--color-gold)] w-5 h-5" />}
                          </div>
                          <p className="font-bold text-[var(--color-text-main)] text-sm">{addr.fullName || user.name}</p>
                          <p className="text-sm text-[var(--color-text-secondary)] mt-1 line-clamp-2">
                            {addr.houseFlat}, {addr.streetArea}, {addr.city}, {addr.state} - {addr.pincode}
                          </p>
                          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Phone: {addr.phone}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[var(--color-text-secondary)] text-sm mb-4">No saved addresses found.</p>
                  )}
                  
                  <button onClick={() => navigate('/dashboard/settings')} className="text-sm font-bold text-[var(--color-gold)] flex items-center gap-1 hover:underline">
                    <FiPlus /> Add New Address
                  </button>

                  <div className="mt-6 pt-4 border-t border-[var(--color-border)]/50 flex justify-end">
                    <button 
                      onClick={() => setStep(2)} 
                      disabled={!selectedAddress}
                      className="px-6 py-2.5 bg-[var(--color-gold)] text-[var(--color-main-bg)] hover:bg-white transition-colors text-sm font-bold uppercase tracking-widest rounded-lg disabled:opacity-50 disabled:hover:bg-[var(--color-gold)] shadow-lg"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Order Summary */}
            <div className={`bg-[var(--color-alt-bg)] rounded-lg border ${step === 2 ? 'border-[var(--color-gold)] shadow-sm' : 'border-[var(--color-border)]/50'} p-6 transition-all`}>
              <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => { if(selectedAddress) setStep(2) }}>
                <h2 className={`text-lg font-bold flex items-center gap-3 ${step >= 2 ? 'text-[var(--color-gold)]' : 'text-[var(--color-text-secondary)]'}`}>
                  <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm ${step >= 2 ? 'bg-[var(--color-gold)]/10 border-[var(--color-gold)] text-[var(--color-gold)]' : 'bg-transparent border-[var(--color-border)]/50 text-[var(--color-text-secondary)]'}`}>2</span>
                  Order Summary
                </h2>
                {step > 2 && <FiCheckCircle className="text-[var(--color-gold)] w-5 h-5" />}
              </div>
              
              {step === 2 && (
                <div className="mt-4 space-y-4 animate-fadeIn">
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-3 bg-[var(--color-alt-bg)] rounded-lg border border-[var(--color-border)]/50">
                        <img src={item.image || '/placeholder.jpg'} alt={item.name} className="w-16 h-20 object-cover rounded-md" />
                        <div className="flex-1 flex flex-col justify-center">
                          <h4 className="text-sm font-bold text-[var(--color-text-main)]">{item.name}</h4>
                          <p className="text-xs text-[var(--color-text-secondary)] mt-1">Size: {item.size} | Qty: {item.quantity}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm font-bold text-[var(--color-gold)]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--color-border)]/50 flex justify-end">
                    <button 
                      onClick={() => setStep(3)} 
                      className="px-6 py-2.5 bg-[var(--color-gold)] text-[var(--color-main-bg)] hover:bg-white transition-colors text-sm font-bold uppercase tracking-widest rounded-lg shadow-lg"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Payment */}
            <div className={`bg-[var(--color-alt-bg)] rounded-lg border ${step === 3 ? 'border-[var(--color-gold)] shadow-sm' : 'border-[var(--color-border)]/50'} p-6 transition-all`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-bold flex items-center gap-3 ${step === 3 ? 'text-[var(--color-gold)]' : 'text-[var(--color-text-secondary)]'}`}>
                  <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm ${step === 3 ? 'bg-[var(--color-gold)]/10 border-[var(--color-gold)] text-[var(--color-gold)]' : 'bg-transparent border-[var(--color-border)]/50'}`}>3</span>
                  Payment Method
                </h2>
              </div>
              
              {step === 3 && (
                <div className="mt-4 animate-fadeIn">
                  <div className="p-4 border-2 border-[var(--color-gold)] bg-[var(--color-main-bg)] rounded-lg flex items-center gap-4 cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    <div className="w-5 h-5 rounded-full border-[5px] border-[var(--color-gold)] bg-white"></div>
                    <div>
                      <h4 className="font-bold text-[var(--color-text-main)] text-sm">Online Payment</h4>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-1">UPI, Cards, Net Banking, Wallets</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Sidebar - Price Details */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-[var(--color-alt-bg)] rounded-lg border border-[var(--color-border)]/50 p-6 sticky top-24 shadow-xl">
              <h3 className="text-base font-bold text-[var(--color-text-main)] mb-4 pb-4 border-b border-[var(--color-border)]/50 uppercase tracking-wider">Price Details</h3>
              
              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between text-[var(--color-text-secondary)]">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium text-[var(--color-text-main)]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[var(--color-text-secondary)]">
                  <span>Delivery</span>
                  <span className="font-bold text-[var(--color-gold)] uppercase text-xs tracking-wider self-center">Free</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-4 border-y border-[var(--color-border)]/50 mb-6">
                <span className="font-bold text-[var(--color-text-main)]">Total Payable</span>
                <span className="text-2xl font-bold text-[var(--color-gold)]">₹{total.toLocaleString('en-IN')}</span>
              </div>
              
              {step === 3 ? (
                <button 
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full py-4 bg-[var(--color-gold)] text-[var(--color-main-bg)] font-bold uppercase tracking-[0.2em] text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:-translate-y-0 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>Pay ₹{total.toLocaleString('en-IN')}</>
                  )}
                </button>
              ) : (
                <button 
                  disabled
                  className="w-full py-4 bg-[var(--color-alt-bg)] text-[var(--color-text-secondary)] border border-[var(--color-border)]/50 font-bold uppercase tracking-widest text-xs rounded-lg cursor-not-allowed"
                >
                  Complete Previous Steps
                </button>
              )}
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[var(--color-text-secondary)]">
                <FiLock className="w-3 h-3" /> Secure 256-bit encrypted payment
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Checkout;
