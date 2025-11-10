// src/pages/Success.tsx
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiCheckCircle, FiHome, FiShoppingBag } from "react-icons/fi";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  size?: string;
}

export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<{
    sessionId?: string;
    items?: OrderItem[];
    total?: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get session ID from URL params
    const sessionId = searchParams.get('session_id');
    
    if (sessionId) {
      // In a full implementation, you would fetch order details from Mvmnt Pay API
      // For now, we'll show a success message
      setOrderDetails({
        sessionId,
      });
    }
    
    setLoading(false);
    
    // Clear cart from localStorage on success
    localStorage.removeItem('nikhairrr_cart');
  }, [searchParams]);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000000",
        color: "#ffffff",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: "2rem",
            marginBottom: "1rem",
            animation: "spin 1s linear infinite",
          }}>
            ⏳
          </div>
          <p>Processing your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#000000",
      color: "#ffffff",
      padding: "2rem",
    }}>
      <div style={{
        maxWidth: "600px",
        width: "100%",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        padding: "3rem 2rem",
        textAlign: "center",
      }}>
        {/* Success Icon */}
        <div style={{
          width: "80px",
          height: "80px",
          margin: "0 auto 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(34, 197, 94, 0.1)",
          border: "2px solid rgba(34, 197, 94, 0.3)",
          borderRadius: "50%",
        }}>
          <FiCheckCircle size={40} color="#22c55e" />
        </div>

        {/* Success Message */}
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          letterSpacing: "0.05em",
          marginBottom: "1rem",
          color: "#ffffff",
        }}>
          ORDER CONFIRMED!
        </h1>

        <p style={{
          fontSize: "1.1rem",
          color: "#e5e5e5",
          marginBottom: "2rem",
          lineHeight: 1.6,
        }}>
          Thank you for your purchase! We've received your order and will begin processing it shortly.
        </p>

        {/* Order Details */}
        {orderDetails?.sessionId && (
          <div style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "1.5rem",
            marginBottom: "2rem",
            textAlign: "left",
          }}>
            <h3 style={{
              fontSize: "0.9rem",
              color: "#999",
              letterSpacing: "0.1em",
              marginBottom: "1rem",
              fontWeight: 600,
            }}>
              ORDER DETAILS
            </h3>
            
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.75rem",
            }}>
              <span style={{ color: "#e5e5e5" }}>Order ID:</span>
              <span style={{ 
                color: "#ffffff",
                fontFamily: "monospace",
                fontSize: "0.9rem",
              }}>
                {orderDetails.sessionId.substring(0, 20)}...
              </span>
            </div>
            
            <div style={{
              marginTop: "1.5rem",
              paddingTop: "1rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}>
              <p style={{
                fontSize: "0.85rem",
                color: "#999",
                lineHeight: 1.6,
              }}>
                A confirmation email has been sent to your email address with your order details and tracking information.
              </p>
            </div>
          </div>
        )}

        {/* Shipping Info */}
        <div style={{
          background: "rgba(34, 197, 94, 0.05)",
          border: "1px solid rgba(34, 197, 94, 0.2)",
          padding: "1.25rem",
          marginBottom: "2rem",
          borderRadius: "4px",
        }}>
          <p style={{
            fontSize: "0.9rem",
            color: "#e5e5e5",
            lineHeight: 1.6,
            margin: 0,
          }}>
            <strong style={{ color: "#22c55e" }}>📦 What's Next?</strong><br />
            Your order will be prepared and shipped within 1-2 business days.
            You'll receive tracking information via email.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          <button
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#ffffff",
              padding: "0.875rem 1.75rem",
              fontSize: "0.9rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            }}
          >
            <FiHome /> HOME
          </button>

          <button
            onClick={() => navigate("/shop")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#ffffff",
              border: "none",
              color: "#000000",
              padding: "0.875rem 1.75rem",
              fontSize: "0.9rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(255, 255, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <FiShoppingBag /> CONTINUE SHOPPING
          </button>
        </div>

        {/* Support Info */}
        <div style={{
          marginTop: "3rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}>
          <p style={{
            fontSize: "0.85rem",
            color: "#999",
            lineHeight: 1.6,
          }}>
            Questions about your order?<br />
            Contact us at <a 
              href="mailto:support@nikhairrr.com" 
              style={{ color: "#ffffff", textDecoration: "underline" }}
            >
              support@nikhairrr.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
