import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiShoppingBag, FiMessageCircle, FiShoppingCart } from "react-icons/fi";

export default function Navbar({ onCartClick }: { onCartClick: () => void }) {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 3rem",
        background: "rgba(16, 21, 16, 0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(200, 169, 126, 0.15)",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      {/* Logo Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.filter = "brightness(1.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.filter = "brightness(1)";
        }}
      >
        <img 
          src="/Logo.svg" 
          alt="NikHairrr" 
          style={{ 
            height: "50px",
            width: "auto",
            objectFit: "contain",
          }}
        />
      </button>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <Link
          to="/"
          style={{
            color: "#D9D7D0",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.3s ease",
            fontWeight: 600,
            fontSize: "0.95rem",
            padding: "0.5rem 0.75rem",
            borderRadius: "8px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#C8A97E";
            e.currentTarget.style.background = "rgba(200, 169, 126, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#D9D7D0";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <FiHome size={18} /> Home
        </Link>
        <Link
          to="/shop"
          style={{
            color: "#D9D7D0",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.3s ease",
            fontWeight: 600,
            fontSize: "0.95rem",
            padding: "0.5rem 0.75rem",
            borderRadius: "8px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#C8A97E";
            e.currentTarget.style.background = "rgba(200, 169, 126, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#D9D7D0";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <FiShoppingBag size={18} /> Shop
        </Link>
        <Link
          to="/testimonials"
          style={{
            color: "#D9D7D0",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.3s ease",
            fontWeight: 600,
            fontSize: "0.95rem",
            padding: "0.5rem 0.75rem",
            borderRadius: "8px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#C8A97E";
            e.currentTarget.style.background = "rgba(200, 169, 126, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#D9D7D0";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <FiMessageCircle size={18} /> Testimonials
        </Link>
        <button
          onClick={onCartClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#101510",
            background: "linear-gradient(135deg, #C8A97E, #D4A373)",
            border: "none",
            borderRadius: "999px",
            padding: "0.65rem 1.5rem",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "0.95rem",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(200, 169, 126, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 25px rgba(200, 169, 126, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(200, 169, 126, 0.3)";
          }}
        >
          <FiShoppingCart size={18} /> Cart
        </button>
      </div>
    </nav>
  );
}
