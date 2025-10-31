// src/components/CartDrawer.tsx
import { FiX, FiTrash2 } from "react-icons/fi";

type Product = { id: number; name: string; price: number; size?: string; quantity: number };

export default function CartDrawer({
  cart,
  onClose,
  onUpdateQuantity,
  onUpdateSize,
  onRemoveItem,
}: {
  cart: Product[];
  onClose: () => void;
  onUpdateQuantity: (index: number, newQuantity: number) => void;
  onUpdateSize: (index: number, newSize: string) => void;
  onRemoveItem: (index: number) => void;
}) {
  const total = cart.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  
  const sizes = ["12\"", "14\"", "16\"", "18\"", "20\"", "22\"", "24\"", "26\""];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "420px",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.98)",
        backdropFilter: "blur(24px)",
        color: "#e5e5e5",
        padding: 0,
        boxShadow: "-8px 0 32px rgba(0, 0, 0, 0.9)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", padding: "2rem 2rem 0 2rem", flexShrink: 0 }}>
        <h3 style={{ 
          color: "#ffffff", 
          fontSize: "1.75rem", 
          fontWeight: 700,
          margin: 0,
          letterSpacing: "0.1em",
        }}>
          YOUR CART
        </h3>
        <button 
          onClick={onClose} 
          style={{ 
            color: "#ffffff", 
            background: "rgba(255, 255, 255, 0.1)", 
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "0",
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
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
            e.currentTarget.style.transform = "rotate(90deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
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
            color: "#e5e5e5", 
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
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "0",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.75rem" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: "1.05rem", marginBottom: "0.5rem" }}>{item.name}</div>
                    
                    {/* Size Selector */}
                    {item.size && (
                      <div style={{ marginTop: "0.5rem" }}>
                        <label style={{ fontSize: "0.75rem", opacity: 0.7, display: "block", marginBottom: "0.25rem" }}>
                          Size:
                        </label>
                        <select
                          value={item.size}
                          onChange={(e) => onUpdateSize(idx, e.target.value)}
                          style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            color: "#ffffff",
                            padding: "0.4rem 0.6rem",
                            fontSize: "0.85rem",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          {sizes.map(size => (
                            <option key={size} value={size} style={{ background: "#000000" }}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => onRemoveItem(idx)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#ffffff",
                      cursor: "pointer",
                      opacity: 0.6,
                      transition: "all 0.2s ease",
                      padding: "0.25rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ff4444";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.opacity = "0.6";
                    }}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
                
                {/* Quantity Controls and Price */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>Qty:</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255, 255, 255, 0.1)", borderRadius: "4px", padding: "0.25rem" }}>
                      <button
                        onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#ffffff",
                          cursor: "pointer",
                          fontSize: "1.1rem",
                          padding: "0.25rem 0.5rem",
                          lineHeight: 1,
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#cccccc"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#ffffff"}
                      >
                        −
                      </button>
                      <span style={{ 
                        minWidth: "30px", 
                        textAlign: "center",
                        fontWeight: 600,
                        fontSize: "0.95rem"
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#ffffff",
                          cursor: "pointer",
                          fontSize: "1.1rem",
                          padding: "0.25rem 0.5rem",
                          lineHeight: 1,
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#cccccc"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#ffffff"}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span style={{ 
                    color: "#ffffff", 
                    fontWeight: 700,
                    fontSize: "1.15rem",
                  }}>
                    ${item.price * item.quantity}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{
        padding: "1.5rem",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: "0",
        marginBottom: "1rem",
        marginLeft: "2rem",
        marginRight: "2rem",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <span style={{ color: "#e5e5e5", fontSize: "0.95rem" }}>Subtotal</span>
          <span style={{ color: "#e5e5e5", fontWeight: 600 }}>${total}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <span style={{ color: "#e5e5e5", fontSize: "0.95rem" }}>Shipping</span>
          <span style={{ color: "#ffffff", fontSize: "0.9rem" }}>FREE</span>
        </div>
        <div style={{ 
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          paddingTop: "1rem",
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
        }}>
          <span style={{ color: "#ffffff", fontSize: "1.15rem", fontWeight: 700 }}>Total</span>
          <span style={{ 
            color: "#ffffff", 
            fontSize: "1.5rem", 
            fontWeight: 700,
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
          padding: "1.25rem 2rem", 
          background: cart.length === 0 ? "rgba(255, 255, 255, 0.1)" : "#ffffff", 
          border: "none", 
          borderRadius: "0", 
          color: cart.length === 0 ? "#666666" : "#000000",
          fontWeight: 600,
          fontSize: "0.95rem",
          cursor: cart.length === 0 ? "not-allowed" : "pointer",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          letterSpacing: "0.12em",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          if (cart.length > 0) {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 15px 35px rgba(255, 255, 255, 0.2)";
          }
        }}
        onMouseLeave={(e) => {
          if (cart.length > 0) {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }
        }}
      >
        {cart.length === 0 ? "Add Items to Checkout" : "Proceed to Checkout"}
      </button>
    </div>
  );
}
