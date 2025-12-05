import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiShoppingBag, FiMessageCircle, FiShoppingCart, FiTool, FiUser, FiStar, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export default function Navbar({ onCartClick, onMemberClick, cartItemCount = 0 }: { onCartClick: () => void; onMemberClick: () => void; cartItemCount?: number }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        .mobile-menu-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.98);
          z-index: 100000;
          padding: 1rem;
          overflow-y: auto;
        }
        .mobile-menu-overlay.open {
          display: block !important;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none !important;
          }
          .hamburger-menu {
            display: flex !important;
            align-items: center;
            gap: 1rem;
          }
          .mobile-menu-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 0;
            margin-bottom: 2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          .mobile-menu-links {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
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
          to="/membership"
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
            background: "rgba(147, 51, 234, 0.1)",
            border: "1px solid rgba(147, 51, 234, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(147, 51, 234, 0.2)";
            e.currentTarget.style.borderColor = "rgba(147, 51, 234, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(147, 51, 234, 0.1)";
            e.currentTarget.style.borderColor = "rgba(147, 51, 234, 0.3)";
          }}
        >
          <FiStar size={18} /> <span className="nav-link-text">Rewards</span>
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
        
        {/* Member Button */}
        <button
          onClick={onMemberClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: user ? "#000000" : "#ffffff",
            background: user ? "#ffffff" : "transparent",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "999px",
            padding: "0.65rem clamp(0.75rem, 2vw, 1.5rem)",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.95rem",
            transition: "all 0.3s ease",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            if (user) {
              e.currentTarget.style.background = "#cccccc";
            } else {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            }
          }}
          onMouseLeave={(e) => {
            if (user) {
              e.currentTarget.style.background = "#ffffff";
            } else {
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          <FiUser size={18} /> <span className="nav-link-text">{user ? 'Account' : 'Sign In'}</span>
        </button>
        
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
            position: "relative",
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
          {cartItemCount > 0 && (
            <span style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              background: "#ff0000",
              color: "#ffffff",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: 700,
              border: "2px solid #000000",
              boxShadow: "0 2px 8px rgba(255, 0, 0, 0.4)",
            }}>
              {cartItemCount > 99 ? '99+' : cartItemCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="hamburger-menu" style={{ position: "relative", zIndex: 10000 }}>
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
            boxShadow: "0 4px 15px rgba(255, 255, 255, 0.3)",
            position: "relative",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <FiShoppingCart size={20} />
          {cartItemCount > 0 && (
            <span style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              background: "#ff0000",
              color: "#ffffff",
              borderRadius: "50%",
              width: "22px",
              height: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.7rem",
              fontWeight: 700,
              border: "2px solid #000000",
              boxShadow: "0 2px 8px rgba(255, 0, 0, 0.4)",
            }}>
              {cartItemCount > 99 ? '99+' : cartItemCount}
            </span>
          )}
        </button>
        <button
          onClick={() => {
            console.log('Hamburger clicked!');
            setMobileMenuOpen(true);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            background: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "8px",
            width: "44px",
            height: "44px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <FiMenu size={24} />
        </button>
      </div>
    </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
      <div className="mobile-menu-overlay open">
        <div className="mobile-menu-header">
          <div style={{
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "50%",
            padding: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.05)",
          }}>
            <img 
              src="/small-logo.svg" 
              alt="NikHairrr" 
              style={{ 
                height: "32px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </div>
          <button
            onClick={() => {
              console.log('Close clicked!');
              setMobileMenuOpen(false);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "8px",
              width: "44px",
              height: "44px",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="mobile-menu-links">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: "#ffffff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              fontWeight: 600,
              fontSize: "1.1rem",
              padding: "1rem",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <FiHome size={22} /> Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: "#ffffff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              fontWeight: 600,
              fontSize: "1.1rem",
              padding: "1rem",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <FiShoppingBag size={22} /> Shop
          </Link>
          <Link
            to="/services"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: "#ffffff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              fontWeight: 600,
              fontSize: "1.1rem",
              padding: "1rem",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <FiTool size={22} /> Services
          </Link>
          <Link
            to="/membership"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: "#ffffff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              fontWeight: 600,
              fontSize: "1.1rem",
              padding: "1rem",
              borderRadius: "12px",
              background: "rgba(147, 51, 234, 0.15)",
              border: "1px solid rgba(147, 51, 234, 0.4)",
            }}
          >
            <FiStar size={22} /> Rewards
          </Link>
          <Link
            to="/testimonials"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: "#ffffff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              fontWeight: 600,
              fontSize: "1.1rem",
              padding: "1rem",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <FiMessageCircle size={22} /> Testimonials
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onMemberClick();
            }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              color: user ? "#000000" : "#ffffff",
              background: user ? "#ffffff" : "rgba(255, 255, 255, 0.05)",
              border: user ? "1px solid #ffffff" : "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              padding: "1rem",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "1.1rem",
            }}
          >
            <FiUser size={22} /> {user ? 'Account' : 'Sign In'}
          </button>
        </div>
      </div>
      )}
    </>
  );
}
