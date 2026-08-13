import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCheckCircle, FiClock, FiTruck, FiPackage, FiSearch } from 'react-icons/fi';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // In a real app we'd fetch all orders (needs a new API endpoint)
  // For now we will mock or just fetch all if the API exists.
  // We need to create an API endpoint: GET /api/orders/all for admin.
  // Assuming we will create it:
  
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${apiUrl}/api/orders`, { withCredentials: true });
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching admin orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.put(`${apiUrl}/api/orders/${orderId}/status`, { status: newStatus }, { withCredentials: true });
      
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.length > 0 ? orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-bold text-[var(--color-primary-dark)]">#{order._id.substring(order._id.length - 6).toUpperCase()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-800">{order.shippingAddress?.fullName || 'N/A'}</div>
                    <div className="text-xs text-gray-500">{order.shippingAddress?.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-[var(--color-gold)]">
                    ₹{order.totalPrice.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                      order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {order.isPaid ? '✓ PAID' : '✗ UNPAID'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className={`text-xs font-bold uppercase tracking-wider rounded-md border-gray-200 shadow-sm focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)] py-1.5 pl-3 pr-8 ${
                        order.status === 'Pending' ? 'text-orange-600 bg-orange-50' : 
                        order.status === 'Processing' ? 'text-blue-600 bg-blue-50' :
                        order.status === 'Shipped' ? 'text-purple-600 bg-purple-50' :
                        'text-green-600 bg-green-50'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-bold text-[var(--color-primary-dark)] hover:text-[var(--color-gold)] underline">
                      View Details
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
