import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function MembershipBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has seen the popup before
    const hasSeenPopup = sessionStorage.getItem('hasSeenMembershipPopup');
    
    if (!hasSeenPopup) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('hasSeenMembershipPopup', 'true');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(8px)",
          zIndex: 250,
          animation: "fadeIn 0.3s ease-out",
        }}
      />

      {/* Popup Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(90vw, 600px)",
          zIndex: 251,
          background: "rgba(0, 0, 0, 0.95)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "0",
          padding: "3rem 2.5rem",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.9)",
          animation: "slideUp 0.4s ease-out",
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "0",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#ffffff",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
            e.currentTarget.style.transform = "rotate(90deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.transform = "rotate(0deg)";
          }}
        >
          <FiX size={24} />
        </button>

        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "999px",
            padding: "0.5rem 1rem",
            marginBottom: "1.5rem",
          }}
        >
          <span style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.05em" }}>
            EXCLUSIVE OFFER
          </span>
        </div>

        {/* Content */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "2.5rem",
              fontWeight: 700,
              margin: "0 0 1rem 0",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontStyle: "italic",
            }}
          >
            Become a NikHairrr Baby
          </h2>
          <p
            style={{
              color: "#e5e5e5",
              fontSize: "1.1rem",
              margin: "0 0 1.5rem 0",
              lineHeight: 1.6,
              maxWidth: "500px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Join our exclusive membership program and get{" "}
            <span style={{ 
              fontWeight: 700, 
              color: "#ffffff",
              fontSize: "1.3rem",
            }}>
              500 points
            </span>{" "}
            instantly upon sign up. Unlock{" "}
            <span style={{ 
              fontWeight: 700, 
              color: "#ffffff",
            }}>
              Elite tier
            </span>{" "}
            at 2,500 points for 2x rewards.
          </p>

          {/* Benefits Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#ffffff", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                Earn Points
              </div>
              <div style={{ color: "#999", fontSize: "0.8rem" }}>
                One dollar equals one point
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#ffffff", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                Exclusive Sales
              </div>
              <div style={{ color: "#999", fontSize: "0.8rem" }}>
                Members only
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#ffffff", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                Early Access
              </div>
              <div style={{ color: "#999", fontSize: "0.8rem" }}>
                New products first
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            onClick={() => {
              handleClose();
              navigate("/membership");
            }}
            style={{
              flex: 1,
              minWidth: "150px",
              background: "#ffffff",
              color: "#000000",
              border: "none",
              borderRadius: "0",
              padding: "1rem 2rem",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.1em",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(255, 255, 255, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 6px 25px rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(255, 255, 255, 0.1)";
            }}
          >
            JOIN NOW
          </button>
          <button
            onClick={handleClose}
            style={{
              flex: 1,
              minWidth: "150px",
              background: "transparent",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "0",
              padding: "1rem 2rem",
              fontWeight: 600,
              fontSize: "1rem",
              letterSpacing: "0.1em",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            }}
          >
            MAYBE LATER
          </button>
        </div>

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translate(-50%, -45%);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%);
            }
          }

          @media (max-width: 600px) {
            div[style*="padding: 3rem 2.5rem"] {
              padding: 2rem 1.5rem !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}
