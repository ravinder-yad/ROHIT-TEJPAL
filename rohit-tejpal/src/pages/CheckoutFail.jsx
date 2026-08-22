import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiXCircle, FiRefreshCw, FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CheckoutFail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${apiUrl}/api/orders/myorders`, { withCredentials: true });
        const currentOrder = res.data.find(o => o._id === orderId);
        if (currentOrder) {
          setOrder(currentOrder);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, [orderId]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRetryPayment = async () => {
    if (!order) return;
    setLoading(true);
    try {
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const rpResponse = await axios.post(`${apiUrl}/api/payment/create-order`, { orderId: order._id }, { withCredentials: true });
      const { id, amount, currency, key } = rpResponse.data;

      const options = {
        key: key,
        amount: amount,
        currency: currency,
        name: 'Rohit Tejpal',
        description: 'Order Payment',
        order_id: id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(`${apiUrl}/api/payment/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order._id
            }, { withCredentials: true });

            if (verifyRes.data.message === 'Payment verified successfully') {
              navigate(`/checkout/success/${order._id}`);
            }
          } catch (err) {
            console.error("Payment Verification Failed", err);
            // Stay on fail page
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: order.shippingAddress?.phone || user.phone || ''
        },
        theme: {
          color: '#1a1a1a'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        console.error("Payment Failed Again", response.error);
      });
      paymentObject.open();
    } catch (error) {
      console.error("Error during payment retry:", error);
      toast.error("Error initiating payment retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#f8f9fa] min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiXCircle className="w-10 h-10 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-[var(--color-main-bg)] mb-2 uppercase tracking-wide">Payment Failed</h1>
        <p className="text-[var(--color-text-secondary)] mb-8">Your payment could not be completed. Don't worry, your order is saved.</p>
        
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mb-8 text-left">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Order ID</span>
            <span className="text-sm font-bold text-[var(--color-main-bg)]">#{orderId.substring(orderId.length - 8).toUpperCase()}</span>
          </div>
          {order && (
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Amount</span>
              <span className="text-sm font-bold text-[var(--color-gold)]">₹{order.totalPrice.toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={handleRetryPayment}
            disabled={loading || !order}
            className="w-full py-3.5 bg-[var(--color-main-bg)] text-[var(--color-text-main)] text-sm font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 hover:bg-[var(--color-gold)] transition-colors disabled:opacity-70"
          >
            {loading ? 'Loading...' : <><FiRefreshCw /> Retry Payment</>}
          </button>
          <Link to="/dashboard/cart" className="w-full py-3.5 bg-white text-[var(--color-main-bg)] border border-gray-200 text-sm font-bold uppercase tracking-widest rounded hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <FiArrowLeft /> Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFail;
