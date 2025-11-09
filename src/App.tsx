// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Testimonials from "./pages/Testimonials";
import CartDrawer from "./components/CartDrawer";
import ScrollToTop from "./components/ScrollToTop";
import { appBackground } from "./styles/background.css";
import Shop from "./pages/Shop";
import ShopBundles from "./pages/ShopBundles";
import ShopWigs from "./pages/ShopWigs";
import ShopClosures from "./pages/ShopClosures";
import ShopFrontals from "./pages/ShopFrontals";

type Product = { id: number; name: string; price: number; size?: string; quantity: number };

const CART_STORAGE_KEY = 'nikhairrr_cart';

export default function App() {
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

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    setCartOpen(true);
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

    return (
  <div className={appBackground}>
    <Router>
      <ScrollToTop />
      <Navbar onCartClick={() => setCartOpen(!cartOpen)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/bundles" element={<ShopBundles onAddToCart={addToCart} />} />
        <Route path="/shop/wigs" element={<ShopWigs onAddToCart={addToCart} />} />
        <Route path="/shop/closures" element={<ShopClosures onAddToCart={addToCart} />} />
        <Route path="/shop/frontals" element={<ShopFrontals onAddToCart={addToCart} />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Routes>
      {cartOpen && (
        <CartDrawer 
          cart={cart} 
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onUpdateSize={updateSize}
          onRemoveItem={removeItem}
        />
      )}
    </Router>
  </div>
);
}
