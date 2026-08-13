import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiUsers, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import BrandLogoImage from '../../components/ui/BrandLogoImage';
import AdminOrders from './AdminOrders';

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  React.useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) return null;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 flex items-center justify-center border-b border-gray-100 relative">
          <Link to="/" className="w-32 block">
            <BrandLogoImage />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="absolute right-4 lg:hidden text-gray-500">
            <FiX size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1 px-4">
            <Link to="/admin" className={`flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-colors ${location.pathname === '/admin' ? 'bg-[var(--color-primary-dark)] text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
              <FiHome className="w-5 h-5" /> Dashboard
            </Link>
            <Link to="/admin/orders" className={`flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-colors ${location.pathname.includes('/admin/orders') ? 'bg-[var(--color-primary-dark)] text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
              <FiShoppingBag className="w-5 h-5" /> Orders
            </Link>
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-red-500 uppercase tracking-wider rounded-lg hover:bg-red-50 transition-colors"
          >
            <FiLogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-[var(--color-primary-dark)]">
              <FiMenu size={24} />
            </button>
            <h1 className="text-xl font-bold text-[var(--color-primary-dark)] tracking-wider">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-gold)] text-white flex items-center justify-center font-bold text-sm uppercase">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <Routes>
            <Route path="/" element={<div className="text-gray-500">Welcome to Admin Panel</div>} />
            <Route path="/orders" element={<AdminOrders />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
