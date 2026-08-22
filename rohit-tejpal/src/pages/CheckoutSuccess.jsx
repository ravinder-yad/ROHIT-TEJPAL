import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCheckCircle, FiChevronRight, FiDownload } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { downloadOrderReceipt } from '../utils/pdfGenerator';

const CheckoutSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const { user } = useAuth();

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

  return (
    <div className="pt-32 pb-24 bg-[#f8f9fa] min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiCheckCircle className="w-10 h-10 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-[var(--color-main-bg)] mb-2 uppercase tracking-wide">Payment Successful</h1>
        <p className="text-[var(--color-text-secondary)] mb-8">Thank you for your order! We'll start processing it right away.</p>
        
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mb-8 text-left">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Order ID</span>
            <span className="text-sm font-bold text-[var(--color-main-bg)]">#{orderId.substring(orderId.length - 8).toUpperCase()}</span>
          </div>
          {order && (
            <>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Amount Paid</span>
                <span className="text-sm font-bold text-[var(--color-gold)]">₹{order.totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Payment ID</span>
                <span className="text-sm font-bold text-gray-800">{order.paymentResult?.id || 'N/A'}</span>
              </div>
            </>
          )}
        </div>
        
        <div className="flex flex-col gap-3">
          {order && (
            <button 
              onClick={() => downloadOrderReceipt(order, user)}
              className="w-full py-3.5 bg-green-600 text-[var(--color-text-main)] text-sm font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
            >
              <FiDownload /> Download Receipt (PDF)
            </button>
          )}
          <Link to="/dashboard/orders" className="w-full py-3.5 bg-[var(--color-main-bg)] text-[var(--color-text-main)] text-sm font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 hover:bg-[var(--color-gold)] transition-colors mt-2">
            View Order <FiChevronRight />
          </Link>
          <Link to="/products" className="w-full py-3.5 bg-white text-[var(--color-main-bg)] border border-gray-200 text-sm font-bold uppercase tracking-widest rounded hover:bg-gray-50 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
