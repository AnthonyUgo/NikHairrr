import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiShoppingBag, FiMessageCircle, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";

export default function Navbar({ onCartClick }: { onCartClick: () => void }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .hamburger-menu {
          display: none;
        }
        .mobile-menu-overlay {
          display: none;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .hamburger-menu {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          .mobile-menu-overlay {
            display: ${mobileMenuOpen ? 'flex' : 'none'};
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.97);
            backdrop-filter: blur(20px);
            z-index: 999;
            flex-direction: column;
            padding: 2rem;
            animation: slideIn 0.3s ease-out;
          }
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .mobile-menu-link {
            padding: 1.25rem;
            font-size: 1.25rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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

      {/* Mobile Menu Overlay */}
      <div className="mobile-menu-overlay">
        <button
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            background: "transparent",
            border: "none",
            color: "#ffffff",
            cursor: "pointer",
            padding: "0.5rem",
          }}
        >
          <FiX size={28} />
        </button>
        
        <div style={{ marginTop: "4rem", display: "flex", flexDirection: "column", gap: "0" }}>
          <Link
            to="/"
            className="mobile-menu-link"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: "#ffffff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              fontWeight: 600,
            }}
          >
            <FiHome size={24} /> Home
          </Link>
          <Link
            to="/shop"
            className="mobile-menu-link"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: "#ffffff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              fontWeight: 600,
            }}
          >
            <FiShoppingBag size={24} /> Shop
          </Link>
          <Link
            to="/testimonials"
            className="mobile-menu-link"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: "#ffffff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              fontWeight: 600,
            }}
          >
            <FiMessageCircle size={24} /> Testimonials
          </Link>
        </div>
      </div>

      {/* Desktop Navigation */}
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

      {/* Mobile Hamburger & Cart */}
      <div className="hamburger-menu">
        <button
          onClick={onCartClick}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#000000",
            background: "#ffffff",
            border: "1px solid #ffffff",
            borderRadius: "50%",
            width: "44px",
            height: "44px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          <FiShoppingCart size={20} />
        </button>
        <button
          onClick={() => setMobileMenuOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "8px",
            width: "44px",
            height: "44px",
            color: "#ffffff",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          <FiMenu size={24} />
        </button>
      </div>
    </nav>
    </>
  );
}
