import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiShoppingBag, FiMessageCircle, FiShoppingCart, FiTool } from "react-icons/fi";

export default function Navbar({ onCartClick }: { onCartClick: () => void }) {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .nav-link-text {
          display: inline;
        }
        .hamburger-menu {
          display: none;
        }
        @media (max-width: 768px) {
          .nav-links {
            gap: 0.5rem;
          }
          .nav-link-text {
            display: none;
          }
        }
      `}</style>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.75rem clamp(1rem, 3vw, 2rem)",
          background: "rgba(0, 0, 0, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.8)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
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
        <div style={{
          border: "2px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "50%",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.05)",
        }}>
          <img 
            src="/small-logo.svg" 
            alt="NikHairrr" 
            style={{ 
              height: "40px",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </div>
      </button>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link
          to="/"
          style={{
            color: "#ffffff",
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
            e.currentTarget.style.color = "#cccccc";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <FiHome size={18} /> <span className="nav-link-text">Home</span>
        </Link>
        <Link
          to="/shop"
          style={{
            color: "#ffffff",
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
            e.currentTarget.style.color = "#cccccc";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <FiShoppingBag size={18} /> <span className="nav-link-text">Shop</span>
        </Link>
        <Link
          to="/services"
          style={{
            color: "#ffffff",
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
            e.currentTarget.style.color = "#cccccc";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <FiTool size={18} /> <span className="nav-link-text">Services</span>
        </Link>
        <Link
          to="/testimonials"
          style={{
            color: "#ffffff",
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
            e.currentTarget.style.color = "#cccccc";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <FiMessageCircle size={18} /> <span className="nav-link-text">Testimonials</span>
        </Link>
        <button
          onClick={onCartClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#000000",
            background: "#ffffff",
            border: "1px solid #ffffff",
            borderRadius: "999px",
            padding: "0.65rem clamp(0.75rem, 2vw, 1.5rem)",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "0.95rem",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(255, 255, 255, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 25px rgba(255, 255, 255, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(255, 255, 255, 0.3)";
          }}
        >
          <FiShoppingCart size={18} /> <span className="nav-link-text">Cart</span>
        </button>
      </div>

    </nav>
    </>
  );
}
