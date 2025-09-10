import { Link } from "react-router-dom";
import { FiHome, FiShoppingBag, FiMessageCircle, FiShoppingCart } from "react-icons/fi";

export default function Navbar({ onCartClick }: { onCartClick: () => void }) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(10px)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <h2 style={{ color: "#9C7B4D", fontWeight: 700, margin: 0 }}>NikHairrr</h2>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <FiHome /> Home
        </Link>
        <Link to="/shop" style={{ color: "white", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <FiShoppingBag /> Shop
        </Link>
        <Link to="/testimonials" style={{ color: "white", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <FiMessageCircle /> Testimonials
        </Link>
        <button
          onClick={onCartClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            color: "white",
            background: "transparent",
            border: "1px solid #9C7B4D",
            borderRadius: "8px",
            padding: "0.3rem 0.8rem",
            cursor: "pointer",
          }}
        >
          <FiShoppingCart /> Cart
        </button>
      </div>
    </nav>
  );
}
