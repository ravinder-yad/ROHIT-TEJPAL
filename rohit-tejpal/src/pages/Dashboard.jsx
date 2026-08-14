import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiShoppingBag, FiLogOut, FiMenu, FiX, FiGlobe, FiMapPin, FiLock, FiBell, FiChevronDown, FiHeart, FiSettings } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import axios from 'axios';
import BrandLogoImage from '../components/ui/BrandLogoImage';
import SettingsContent from './dashboard/SettingsContent';
import DashboardCartContent from './dashboard/DashboardCartContent';
import DashboardWishlistContent from './dashboard/DashboardWishlistContent';
import { downloadOrderReceipt } from '../utils/pdfGenerator';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // If not logged in, redirect to login
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
    { name: 'My Orders', path: '/dashboard/orders', icon: <FiShoppingBag /> },
    { name: 'Wishlist', path: '/dashboard/wishlist', icon: <FiHeart /> },
    { name: 'My Bag', path: '/dashboard/cart', icon: <FiShoppingBag /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <FiSettings /> },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  const getPageTitle = () => {
    const activeItem = navItems.find(item => item.path !== '/dashboard' && location.pathname.startsWith(item.path));
    return activeItem ? activeItem.name : 'Dashboard';
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      {/* ---------------- MOBILE SIDEBAR (Drawer) ---------------- */}
      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Mobile Drawer */}
      <aside 
        style={{ width: '280px' }}
        className={`fixed top-0 left-0 h-screen bg-[var(--color-primary-dark)] text-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col shadow-2xl ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4 border-b border-white/10 flex items-center justify-between h-[64px] shrink-0">
          <Link to="/" className="block" style={{ width: '128px' }}>
             <BrandLogoImage className="w-full h-auto" />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white p-2 -mr-2">
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-4 custom-scrollbar">
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-[13px] uppercase tracking-wider font-semibold transition-colors ${
                  isActive(item.path) 
                    ? 'bg-[var(--color-gold)] text-white shadow-sm' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-[16px]">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="shrink-0 p-4 border-t border-white/10 flex flex-col gap-2 bg-black/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-md text-[13px] uppercase tracking-wider font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
            <span className="text-[16px]"><FiGlobe /></span>
            Go to Website
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-md text-[13px] uppercase tracking-wider font-semibold text-red-400 hover:bg-white/5 transition-colors"
          >
            <span className="text-[16px]"><FiLogOut /></span>
            Logout
          </button>
        </div>
      </aside>

      {/* ---------------- DESKTOP SIDEBAR ---------------- */}
      <aside 
        style={{ width: '260px' }}
        className="hidden lg:flex bg-[var(--color-primary-dark)] text-white flex-col flex-shrink-0 shadow-xl z-10 sticky top-0 h-screen"
      >
        <div className="border-b border-white/10 flex items-center justify-center h-[72px] shrink-0">
          <Link to="/" className="block" style={{ width: '160px' }}>
             <BrandLogoImage className="w-full h-auto" />
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-[12px] uppercase tracking-wider font-semibold transition-colors ${
                  isActive(item.path) 
                    ? 'bg-[var(--color-gold)] text-white shadow-sm' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-[var(--color-gold)]'
                }`}
              >
                <span className="text-[16px]">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="shrink-0 p-4 border-t border-white/10 flex flex-col gap-2 bg-black/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-md text-[12px] uppercase tracking-wider font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
            <span className="text-[16px]"><FiGlobe /></span>
            Go to Website
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-md text-[12px] uppercase tracking-wider font-semibold text-red-400 hover:bg-white/5 transition-colors"
          >
            <span className="text-[16px]"><FiLogOut /></span>
            Logout
          </button>
        </div>
      </aside>

      {/* ---------------- MAIN CONTENT AREA ---------------- */}
      <div 
        className="flex-1 flex flex-col min-w-0 bg-[#f8f9fa]"
      >
        {/* Topbar */}
        <header 
          style={{ height: '76px', padding: '0 32px' }}
          className="bg-white/90 backdrop-blur-md shadow-sm flex items-center justify-between shrink-0 relative z-20 border-b border-gray-200 sticky top-0"
        >
          <div className="flex items-center" style={{ gap: '16px' }}>
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-[var(--color-gold)] transition-colors p-2 rounded-md hover:bg-gray-50">
              <FiMenu style={{ width: '24px', height: '24px' }} />
            </button>
            <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-primary-dark)', letterSpacing: '-0.01em', margin: 0 }}>
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center" style={{ gap: '20px' }}>
            {/* Notification Bell */}
            <button 
              className="text-gray-500 hover:text-[var(--color-gold)] hover:bg-gray-50 transition-all relative rounded-full"
              style={{ padding: '10px' }}
            >
              <FiBell style={{ width: '20px', height: '20px' }} />
              <span style={{ position: 'absolute', top: '8px', right: '10px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid white' }}></span>
            </button>

            <div style={{ width: '1px', height: '32px', backgroundColor: '#e5e7eb' }} className="hidden sm:block"></div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                className="flex items-center focus:outline-none group hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200"
                style={{ padding: '6px 12px 6px 16px', borderRadius: '50px', gap: '12px', cursor: 'pointer' }}
              >
                <div className="hidden sm:block text-right">
                  <p style={{ fontSize: '11px', color: '#6b7280', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px', lineHeight: 1 }}>Welcome back,</p>
                  <p style={{ fontSize: '15px', color: 'var(--color-primary-dark)', fontWeight: '800', lineHeight: 1 }} className="group-hover:text-[var(--color-gold)] transition-colors">
                    {user.name.split(' ')[0]}
                  </p>
                </div>
                <div 
                  style={{ width: '42px', height: '42px', minWidth: '42px', flexShrink: 0, borderRadius: '50%', backgroundColor: 'var(--color-primary-dark)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold' }}
                  className="shadow-md uppercase group-hover:bg-[var(--color-gold)] transition-colors overflow-hidden"
                >
                  {user?.profileImage ? (
                    <img src={user.profileImage.startsWith('http') ? user.profileImage : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${user.profileImage}`} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    user?.name?.charAt(0) || 'U'
                  )}
                </div>
                <FiChevronDown 
                  style={{ width: '18px', height: '18px', color: '#9ca3af' }} 
                  className={`hidden sm:block transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 transform origin-top-right transition-all">
                  <div className="px-4 py-3 border-b border-gray-50 sm:hidden">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Signed in as</p>
                    <p className="text-sm font-bold text-[var(--color-primary-dark)] truncate">{user.email}</p>
                  </div>
                  <Link to="/dashboard/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[var(--color-gold)] transition-colors mt-1">
                    <FiSettings className="w-4 h-4" /> Settings
                  </Link>
                  <Link to="/dashboard/orders" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[var(--color-gold)] transition-colors">
                    <FiShoppingBag className="w-4 h-4" /> My Orders
                  </Link>
                  <div className="h-px bg-gray-100 my-1"></div>
                  <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 w-full text-left transition-colors mb-1">
                    <FiLogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 lg:p-8 w-full overflow-x-hidden">
          <Routes>
            <Route path="/" element={<DashboardHome user={user} />} />
            <Route path="/orders" element={<OrdersContent />} />
            <Route path="/cart" element={<DashboardCartContent />} />
            <Route path="/wishlist" element={<DashboardWishlistContent />} />
            <Route path="/settings" element={<SettingsContent user={user} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const DashboardHome = ({ user }) => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const [recentOrder, setRecentOrder] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${apiUrl}/api/orders/myorders`, { withCredentials: true });
        setTotalOrders(res.data.length);
        if (res.data.length > 0) {
          setRecentOrder(res.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-2">Welcome, {user.name}!</h2>
        <p className="text-gray-500 mb-6">Manage your orders, profile, and security settings here.</p>
        
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => window.location.href='/dashboard/cart'}>
            <span className="text-3xl font-bold text-[var(--color-primary-dark)] mb-1">{cartItems.length}</span>
            <span className="text-sm text-gray-500 font-medium">Items in Bag</span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => window.location.href='/dashboard/wishlist'}>
            <span className="text-3xl font-bold text-[var(--color-primary-dark)] mb-1">{wishlistItems.length}</span>
            <span className="text-sm text-gray-500 font-medium">Saved Items</span>
          </div>
        </div>
      </div>
      
      <div className="bg-[var(--color-primary-dark)] text-white rounded-lg shadow-sm p-6 md:p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <FiShoppingBag className="w-10 h-10 mb-4 text-[var(--color-gold)] relative z-10" />
        <h3 className="text-lg font-bold mb-1 relative z-10">Latest Order</h3>
        
        {recentOrder ? (
          <>
            <p className="text-sm text-gray-300 mb-2 relative z-10">Status: <strong className="text-white">{recentOrder.status}</strong></p>
            <p className="text-sm text-[var(--color-gold)] font-bold mb-6 relative z-10">₹{recentOrder.totalPrice?.toLocaleString('en-IN')}</p>
          </>
        ) : (
          <p className="text-sm text-gray-300 mb-6 relative z-10">You have no active orders.</p>
        )}
        
        <Link to="/dashboard/orders" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs uppercase tracking-widest font-bold py-2 px-6 rounded-full transition-colors relative z-10">
          View All ({totalOrders})
        </Link>
      </div>
    </div>
  );
};

const OrdersContent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${apiUrl}/api/orders/myorders`, { withCredentials: true });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-gray-100 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-primary-dark)]">My Orders</h2>
          <p className="text-gray-500 mt-1">Track and view your order history.</p>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-16">
           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-gold)] mx-auto mb-4"></div>
           <p className="text-gray-500">Loading orders...</p>
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-100 pb-4 mb-4">
                <div>
                  <span className="text-xs text-gray-400 font-bold tracking-wider uppercase">Order ID</span>
                  <p className="text-sm font-bold text-[var(--color-primary-dark)]">#{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-bold tracking-wider uppercase">Date</span>
                  <p className="text-sm font-bold text-gray-800">{new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-bold tracking-wider uppercase">Total</span>
                  <p className="text-sm font-bold text-[var(--color-gold)]">₹{order.totalPrice?.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-bold tracking-wider uppercase">Status</span>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1 ${
                      order.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                    <br />
                    <span className={`inline-flex items-center text-xs font-bold uppercase tracking-wider ${
                      order.isPaid ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {order.isPaid ? '✓ PAID' : '✗ UNPAID'}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end flex-col items-end h-full">
                  {order.isPaid && (
                    <button 
                      onClick={() => downloadOrderReceipt(order)}
                      className="mt-4 md:mt-0 text-[10px] font-bold uppercase tracking-widest bg-[var(--color-primary-dark)] text-white px-4 py-2 rounded hover:bg-[var(--color-gold)] transition-colors"
                    >
                      Download Receipt
                    </button>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-gray-50 border border-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img src={item.image || '/images/products/product_1.jpg'} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-800">{item.name}</h4>
                      <p className="text-xs text-gray-500">Size: {item.size} | Qty: {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <FiShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-base font-bold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">Looks like you haven't placed any orders. Discover our collection.</p>
          <Link to="/products" className="inline-flex items-center justify-center bg-[var(--color-primary-dark)] text-white px-6 py-2.5 rounded text-sm font-bold uppercase tracking-wider hover:bg-[var(--color-gold)] transition-colors">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
