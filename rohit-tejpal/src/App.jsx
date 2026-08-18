import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Collections from './pages/Collections';
import CollectionDetails from './pages/CollectionDetails';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutFail from './pages/CheckoutFail';
import AdminPanel from './pages/admin/AdminPanel';
import PageTransition from './components/layout/PageTransition';
import ScrollToTop from './components/utils/ScrollToTop';

import FloatingButtons from './components/ui/FloatingButtons';

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isAdmin = location.pathname.startsWith('/admin');

  const hideNavbarFooter = isDashboard || isAdmin;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--color-off-white)] relative">
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '4px',
          fontSize: '14px'
        }
      }} />
      {!hideNavbarFooter && <Navbar />}
      <main className="flex-1 w-full">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category/:id" element={<ProductDetails />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:slug" element={<CollectionDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/wishlist" element={<Navigate to="/dashboard/wishlist" replace />} />
            <Route path="/cart" element={<Navigate to="/dashboard/cart" replace />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success/:orderId" element={<CheckoutSuccess />} />
            <Route path="/checkout/fail/:orderId" element={<CheckoutFail />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/admin/*" element={<AdminPanel />} />
            {/* Add more routes here as we build them */}
          </Routes>
        </PageTransition>
      </main>
      {!hideNavbarFooter && <Footer />}
      {!hideNavbarFooter && <FloatingButtons />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <ScrollToTop />
            <AppContent />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
