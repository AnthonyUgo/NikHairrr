// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Testimonials from "./pages/Testimonials";
import CartDrawer from "./components/CartDrawer";

type Product = { id: number; name: string; price: number };

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    setCartOpen(true);
  };

  return (
    <Router>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop onAddToCart={addToCart} />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Routes>
      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} />}
    </Router>
  );
}
