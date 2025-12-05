import { FiX } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function HolidaySalesBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Check if user previously dismissed the banner
    const dismissed = sessionStorage.getItem('holiday_banner_dismissed');
    if (dismissed) {
      setIsVisible(false);
    }
    setIsMounted(true);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('holiday_banner_dismissed', 'true');
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "80px", // Below navbar
        left: 0,
        right: 0,
        zIndex: 100,
        background: "linear-gradient(135deg, rgba(147, 51, 234, 0.95) 0%, rgba(79, 70, 229, 0.95) 100%)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        animation: "slideDown 0.4s ease-out",
      }}
    >
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .shimmer-text {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.8) 0%,
            rgba(255, 255, 255, 1) 50%,
            rgba(255, 255, 255, 0.8) 100%
          );
          background-size: 1000px 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "clamp(0.75rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          position: "relative",
        }}
      >
        {/* Main Content */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(1rem, 3vw, 2rem)",
            flexWrap: "wrap",
            justifyContent: "center",
            flex: 1,
          }}
        >
          {/* Badge */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#ffffff",
              whiteSpace: "nowrap",
            }}
          >
            HOLIDAY SALE
          </div>

          {/* Main Message */}
          <div style={{ textAlign: "center" }}>
            <h2
              className="shimmer-text"
              style={{
                fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                fontWeight: 700,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Holiday Bundle Sale
            </h2>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                margin: "0.25rem 0 0 0",
                fontWeight: 500,
              }}
            >
              12-18" Bundles: <span style={{ fontWeight: 700 }}>$15 off</span> • 20-26" Bundles: <span style={{ fontWeight: 700 }}>$20 off</span>
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => window.location.href = '/shop/bundles'}
            style={{
              background: "#ffffff",
              color: "#000000",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "999px",
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              cursor: "pointer",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
            }}
          >
            Shop Bundles
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          style={{
            position: "absolute",
            right: "clamp(0.5rem, 2vw, 1rem)",
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            color: "rgba(255, 255, 255, 0.8)",
            cursor: "pointer",
            padding: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
          aria-label="Dismiss banner"
        >
          <FiX size={20} />
        </button>
      </div>
    </div>
  );
}
