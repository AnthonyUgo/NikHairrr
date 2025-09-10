// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Testimonials from "./pages/Testimonials";
import CartDrawer from "./components/CartDrawer";
import { appBackground } from "./styles/background.css";
import Shop from "./pages/Shop";
import ShopBundles from "./pages/ShopBundles";
import ShopWigs from "./pages/ShopWigs";

type Product = { id: number; name: string; price: number };

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    setCartOpen(true);
  };

    return (
  <div className={appBackground}>
    <Router>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <main style={{ paddingTop: "5rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/bundles" element={<ShopBundles onAddToCart={addToCart} />} />
          <Route path="/shop/wigs" element={<ShopWigs onAddToCart={addToCart} />} />
          <Route path="/testimonials" element={<Testimonials />} />
        </Routes>
      </main>
      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} />}
    </Router>
  </div>
);
}
