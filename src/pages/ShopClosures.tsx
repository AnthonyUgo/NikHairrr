// src/pages/ShopClosures.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

type Product = { id: number; name: string; price: number; image: string; size?: string; quantity: number; available?: boolean; description?: string; type?: string };

const closures: Omit<Product, 'size' | 'quantity'>[] = [
  { 
    id: 201, 
    name: "5x5 Closure", 
    price: 156,
    image: "/bundles-1.jpeg",
    available: true,
    description: "5 by 5 closure\nPremium lace closure\nST/BW textures available",
    type: "5x5"
  },
];

const SIZES_PRICES: {[key: string]: {size: string; price: number}[]} = {
  "5x5": [
    { size: '12"', price: 156 },
    { size: '14"', price: 171 },
    { size: '16"', price: 189 },
    { size: '18"', price: 211 },
    { size: '20"', price: 228 },
  ]
};

export default function ShopClosures({ onAddToCart }: { onAddToCart: (p: Product) => void }) {
  const [selectedSizes, setSelectedSizes] = useState<{[key: number]: string}>({});
  const [selectedQuantities, setSelectedQuantities] = useState<{[key: number]: number}>({});
  const navigate = useNavigate();

  const getPrice = (closure: typeof closures[0], size?: string) => {
    if (closure.type && size && SIZES_PRICES[closure.type]) {
      const sizePrice = SIZES_PRICES[closure.type].find(sp => sp.size === size);
      return sizePrice ? sizePrice.price : closure.price;
    }
    return closure.price;
  };

  const getAvailableSizes = (closure: typeof closures[0]) => {
    if (closure.type && SIZES_PRICES[closure.type]) {
      return SIZES_PRICES[closure.type].map(sp => sp.size);
    }
    return [];
  };

  return (
    <div style={{ padding: "clamp(5rem, 10vw, 6rem) clamp(1rem, 4vw, 2rem) 2rem", color: "#e5e5e5", minHeight: "100vh", maxWidth: "1400px", margin: "0 auto" }}>
      <button
        onClick={() => navigate("/shop")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "transparent",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "#ffffff",
          padding: "0.75rem 1.5rem",
          fontSize: "0.9rem",
          fontWeight: 500,
          letterSpacing: "0.05em",
          cursor: "pointer",
          transition: "all 0.3s ease",
          marginBottom: "2rem",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
          e.currentTarget.style.background = "transparent";
        }}
      >
        <FiArrowLeft /> BACK TO SHOP
      </button>

      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ 
          color: "#ffffff", 
          fontSize: "clamp(1.5rem, 5vw, 2.5rem)", 
          fontWeight: 700,
          marginBottom: "0.5rem",
          letterSpacing: "0.1em",
        }}>
          CLOSURES
        </h2>
        <p style={{ color: "#e5e5e5", fontSize: "1.1rem", opacity: 0.8 }}>
          Premium lace closures for a natural, seamless finish.
        </p>
      </div>
      
      <div style={{ 
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
        gap: "2rem",
      }}>
        {closures.map((closure) => (
          <div 
            key={closure.id} 
            style={{ 
              background: "rgba(0, 0, 0, 0.9)", 
              backdropFilter: "blur(12px)", 
              border: "1px solid rgba(255, 255, 255, 0.15)", 
              borderRadius: "0",
              overflow: "hidden",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.8)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
            }}
          >
            <div style={{ 
              width: "100%",
              aspectRatio: "4 / 5",
              position: "relative",
              overflow: "hidden",
            }}>
              <video 
                autoPlay
                loop
                muted
                playsInline
                src="/videos/nh_1.MOV"
                style={{ 
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)",
              }} />
            </div>
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ color: "#ffffff", marginBottom: "0.75rem", fontSize: "1.4rem", fontWeight: 700, letterSpacing: "0.05em" }}>
                {closure.name}
              </h3>
              <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.5rem", marginBottom: "1.25rem" }}>
                ${getPrice(closure, selectedSizes[closure.id])}
              </p>
              
              {closure.description && (
                <div style={{ 
                  marginBottom: "1.25rem", 
                  padding: "1rem",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}>
                  {closure.description.split('\n').map((line, i) => (
                    <p key={i} style={{ 
                      color: "#e5e5e5", 
                      fontSize: "0.85rem", 
                      marginBottom: i < closure.description!.split('\n').length - 1 ? "0.5rem" : "0",
                      lineHeight: 1.6,
                    }}>
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {/* Legend */}
              <div style={{
                marginBottom: "1rem",
                padding: "0.75rem 1rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}>
                <div style={{ 
                  fontSize: "0.75rem", 
                  color: "#999", 
                  letterSpacing: "0.1em", 
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                }}>
                  TEXTURE LEGEND
                </div>
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                  <div style={{ fontSize: "0.8rem", color: "#e5e5e5" }}>
                    <span style={{ fontWeight: 700, color: "#ffffff" }}>ST</span> - Straight
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#e5e5e5" }}>
                    <span style={{ fontWeight: 700, color: "#ffffff" }}>BW</span> - Body Wave
                  </div>
                </div>
              </div>
              
              {/* Size Selector */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", color: "#e5e5e5", fontSize: "0.85rem", marginBottom: "0.5rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                  SIZE
                </label>
                <select
                  value={selectedSizes[closure.id] || ''}
                  onChange={(e) => setSelectedSizes({...selectedSizes, [closure.id]: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "0",
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  <option value="" style={{ background: "#000000" }}>Select Size</option>
                  {getAvailableSizes(closure).map(size => (
                    <option key={size} value={size} style={{ background: "#000000" }}>{size}</option>
                  ))}
                </select>
              </div>

              {/* Quantity Selector */}
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", color: "#e5e5e5", fontSize: "0.85rem", marginBottom: "0.5rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                  QUANTITY
                </label>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  width: "fit-content",
                }}>
                  <button
                    onClick={() => {
                      const current = selectedQuantities[closure.id] || 1;
                      if (current > 1) {
                        setSelectedQuantities({...selectedQuantities, [closure.id]: current - 1});
                      }
                    }}
                    style={{
                      width: "36px",
                      height: "36px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "#ffffff",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    }}
                  >
                    −
                  </button>
                  <div style={{
                    minWidth: "50px",
                    padding: "0.5rem 1rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#ffffff",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    textAlign: "center",
                  }}>
                    {selectedQuantities[closure.id] || 1}
                  </div>
                  <button
                    onClick={() => {
                      const current = selectedQuantities[closure.id] || 1;
                      if (current < 10) {
                        setSelectedQuantities({...selectedQuantities, [closure.id]: current + 1});
                      }
                    }}
                    style={{
                      width: "36px",
                      height: "36px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "#ffffff",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  if (closure.available === false) return;
                  const size = selectedSizes[closure.id];
                  if (!size) {
                    alert('Please select a size');
                    return;
                  }
                  onAddToCart({
                    ...closure,
                    size,
                    quantity: selectedQuantities[closure.id] || 1,
                    price: getPrice(closure, size)
                  });
                }}
                disabled={closure.available === false}
                style={{ 
                  background: closure.available === false ? "rgba(255, 255, 255, 0.1)" : "#ffffff",
                  border: "none", 
                  padding: "1rem 2rem", 
                  borderRadius: "0", 
                  color: closure.available === false ? "rgba(255, 255, 255, 0.3)" : "#000000", 
                  fontWeight: 600, 
                  fontSize: "0.9rem",
                  cursor: closure.available === false ? "not-allowed" : "pointer", 
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  width: "100%",
                  letterSpacing: "0.12em",
                }}
                onMouseEnter={(e) => {
                  if (closure.available !== false) {
                    e.currentTarget.style.transform = "scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(255, 255, 255, 0.2)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (closure.available !== false) {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {closure.available === false ? 'Unavailable' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
