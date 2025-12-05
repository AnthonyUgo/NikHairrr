// App.tsx
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CartDrawer from "./components/CartDrawer";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";
import AuthModal from "./components/AuthModal";
import MemberDashboard from "./pages/MemberDashboard";
import Membership from "./pages/Membership";
import { appBackground } from "./styles/background.css";
import Shop from "./pages/Shop";
import ShopBundles from "./pages/ShopBundles";
import ShopWigs from "./pages/ShopWigs";
import ShopClosures from "./pages/ShopClosures";
import ShopFrontals from "./pages/ShopFrontals";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import Success from "./pages/Success";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";

type Product = { 
  id: number; 
  name: string; 
  price: number; 
  size?: string; 
  quantity: number;
  lookupKey?: string; // Stripe lookup key for checkout
};

const CART_STORAGE_KEY = 'nikhairrr_cart';

function AppContent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  // Initialize cart from localStorage
  const [cart, setCart] = useState<Product[]>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutCanceled, setCheckoutCanceled] = useState(false);
  const [itemAddedNotification, setItemAddedNotification] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cart]);

  // Check if user returned from canceled payment (cart should remain)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const canceled = urlParams.get('checkout_canceled');
    
    if (canceled === 'true' && cart.length > 0) {
      // User canceled payment, cart is preserved
      setCheckoutCanceled(true);
      setCartOpen(true);
      
      // Clear the URL parameter
      window.history.replaceState({}, '', window.location.pathname);
      
      // Hide message after 5 seconds
      setTimeout(() => setCheckoutCanceled(false), 5000);
    }
  }, [cart.length]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      // Check if identical item already exists (same id, size, lookupKey/priceId)
      const existingIndex = prev.findIndex(item => 
        item.id === product.id && 
        item.size === product.size &&
        item.lookupKey === product.lookupKey &&
        item.name === product.name // Important for add-ons which might share same id
      );
      
      if (existingIndex !== -1) {
        // Item exists, increase quantity
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + product.quantity
        };
        return updated;
      } else {
        // New item, add to cart
        return [...prev, product];
      }
    });
    // Show notification
    setItemAddedNotification(product.name);
    setTimeout(() => setItemAddedNotification(null), 3000);
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], quantity: newQuantity };
      return updated;
    });
  };

  const updateSize = (index: number, newSize: string) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], size: newSize };
      return updated;
    });
  };

  const removeItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMemberClick = () => {
    if (user) {
      // User is logged in, go to dashboard
      navigate('/member/dashboard');
    } else {
      // User not logged in, show login modal
      setAuthMode('login');
      setAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setAuthModalOpen(false);
    navigate('/member/dashboard');
  };

    return (
  <div className={appBackground}>
      <ScrollToTop />
      <Navbar 
        onCartClick={() => setCartOpen(!cartOpen)} 
        onMemberClick={handleMemberClick}
        cartItemCount={cart.length} 
      />
      
      {/* Checkout Canceled Notification */}
      {checkoutCanceled && (
        <div style={{
          position: "fixed",
          top: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 300,
          background: "rgba(255, 152, 0, 0.95)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          padding: "1rem 2rem",
          color: "#ffffff",
          fontWeight: 600,
          fontSize: "0.95rem",
          letterSpacing: "0.05em",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          animation: "slideDown 0.3s ease-out",
        }}>
          ⚠️ Checkout canceled - Your items are still in your cart
        </div>
      )}
      
      {/* Item Added Notification */}
      {itemAddedNotification && (
        <div style={{
          position: "fixed",
          top: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 300,
          background: "rgba(0, 0, 0, 0.95)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          padding: "1rem 2rem",
          color: "#ffffff",
          fontWeight: 600,
          fontSize: "0.95rem",
          letterSpacing: "0.05em",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          animation: "slideDown 0.3s ease-out",
        }}>
          ✓ {itemAddedNotification} added to cart
        </div>
      )}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
            <Route path="/shop/bundles" element={<ShopBundles onAddToCart={addToCart} />} />
            <Route path="/shop/wigs" element={<ShopWigs onAddToCart={addToCart} />} />
            <Route path="/shop/closures" element={<ShopClosures onAddToCart={addToCart} />} />
            <Route path="/shop/frontals" element={<ShopFrontals onAddToCart={addToCart} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/success" element={<Success />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/member/dashboard" element={<MemberDashboard />} />
      </Routes>
      
      {authModalOpen && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
          onSwitchMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
        />
      )}
      
      {cartOpen && (
        <CartDrawer 
          cart={cart} 
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onUpdateSize={updateSize}
          onRemoveItem={removeItem}
        />
      )}
      <BackToTop />
  </div>
);
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
