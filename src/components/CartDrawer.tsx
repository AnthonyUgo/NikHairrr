// src/components/CartDrawer.tsx
import { FiX, FiTrash2 } from "react-icons/fi";

type Product = { id: number; name: string; price: number };

export default function CartDrawer({
  cart,
  onClose,
}: {
  cart: Product[];
  onClose: () => void;
}) {
  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "420px",
        height: "100vh",
        background: "rgba(16, 21, 16, 0.97)",
        backdropFilter: "blur(24px)",
        color: "#D9D7D0",
        padding: 0,
        boxShadow: "-8px 0 32px rgba(0, 0, 0, 0.6)",
        borderLeft: "1px solid rgba(200, 169, 126, 0.2)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", padding: "2rem 2rem 0 2rem", flexShrink: 0 }}>
        <h3 style={{ 
          color: "#EDEAE5", 
          fontSize: "1.75rem", 
          fontWeight: 700,
          margin: 0,
          background: "linear-gradient(135deg, #C8A97E 0%, #EDEAE5 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Your Cart
        </h3>
        <button 
          onClick={onClose} 
          style={{ 
            color: "#C8A97E", 
            background: "rgba(200, 169, 126, 0.1)", 
            border: "1px solid rgba(200, 169, 126, 0.3)",
            borderRadius: "8px",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(200, 169, 126, 0.2)";
            e.currentTarget.style.transform = "rotate(90deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(200, 169, 126, 0.1)";
            e.currentTarget.style.transform = "rotate(0deg)";
          }}
        >
          <FiX />
        </button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 2rem", marginBottom: "1.5rem", minHeight: 0 }}>
        {cart.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            padding: "3rem 1rem",
            color: "#D9D7D0", 
            opacity: 0.6,
          }}>
            <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Your cart is empty</p>
            <p style={{ fontSize: "0.9rem" }}>Add some luxury hair to get started!</p>
          </div>
        ) : (
          <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
            {cart.map((item, idx) => (
              <li 
                key={idx} 
                style={{ 
                  marginBottom: "1rem", 
                  padding: "1.25rem",
                  background: "rgba(40, 56, 32, 0.4)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(200, 169, 126, 0.2)",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(40, 56, 32, 0.6)";
                  e.currentTarget.style.borderColor = "rgba(200, 169, 126, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(40, 56, 32, 0.4)";
                  e.currentTarget.style.borderColor = "rgba(200, 169, 126, 0.2)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.75rem" }}>
                  <span style={{ fontWeight: 600, fontSize: "1.05rem" }}>{item.name}</span>
                  <button style={{
                    background: "transparent",
                    border: "none",
                    color: "#D9D7D0",
                    cursor: "pointer",
                    opacity: 0.6,
                    transition: "all 0.2s ease",
                    padding: "0.25rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#C8A97E";
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#D9D7D0";
                    e.currentTarget.style.opacity = "0.6";
                  }}>
                    <FiTrash2 size={16} />
                  </button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.9rem", opacity: 0.7 }}>Qty: 1</span>
                  <span style={{ 
                    color: "#C8A97E", 
                    fontWeight: 700,
                    fontSize: "1.15rem",
                  }}>
                    ${item.price}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{
        padding: "1.5rem",
        background: "rgba(40, 56, 32, 0.4)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(200, 169, 126, 0.2)",
        borderRadius: "12px",
        marginBottom: "1rem",
        marginLeft: "2rem",
        marginRight: "2rem",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <span style={{ color: "#D9D7D0", fontSize: "0.95rem" }}>Subtotal</span>
          <span style={{ color: "#D9D7D0", fontWeight: 600 }}>${total}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <span style={{ color: "#D9D7D0", fontSize: "0.95rem" }}>Shipping</span>
          <span style={{ color: "#C8A97E", fontSize: "0.9rem" }}>FREE</span>
        </div>
        <div style={{ 
          borderTop: "1px solid rgba(200, 169, 126, 0.3)",
          paddingTop: "1rem",
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
        }}>
          <span style={{ color: "#EDEAE5", fontSize: "1.15rem", fontWeight: 700 }}>Total</span>
          <span style={{ 
            color: "#C8A97E", 
            fontSize: "1.5rem", 
            fontWeight: 700,
            background: "linear-gradient(135deg, #C8A97E 0%, #D4A373 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            ${total}
          </span>
        </div>
      </div>
      
      <button
        disabled={cart.length === 0}
        style={{ 
          width: "calc(100% - 4rem)", 
          margin: "0 2rem 2rem 2rem",
          padding: "1rem 1.5rem", 
          background: cart.length === 0 ? "rgba(200, 169, 126, 0.3)" : "linear-gradient(135deg, #C8A97E, #D4A373)", 
          border: "none", 
          borderRadius: "999px", 
          color: cart.length === 0 ? "#9aa0a6" : "#101510",
          fontWeight: 700,
          fontSize: "1.05rem",
          cursor: cart.length === 0 ? "not-allowed" : "pointer",
          transition: "all 0.3s ease",
          boxShadow: cart.length === 0 ? "none" : "0 4px 20px rgba(200, 169, 126, 0.4)",
          letterSpacing: "0.02em",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          if (cart.length > 0) {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 30px rgba(200, 169, 126, 0.6)";
          }
        }}
        onMouseLeave={(e) => {
          if (cart.length > 0) {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(200, 169, 126, 0.4)";
          }
        }}
      >
        {cart.length === 0 ? "Add Items to Checkout" : "Proceed to Checkout"}
      </button>
    </div>
  );
}
