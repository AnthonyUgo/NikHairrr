// src/pages/ShopFrontals.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

type Product = { id: number; name: string; price: number; image: string; size?: string; quantity: number; available?: boolean; description?: string; type?: string };

type ServiceAddon = {
  id: string;
  name: string;
  price: number;
  description: string;
};

const COLORING_SERVICES: ServiceAddon[] = [
  { id: "jet-black", name: "Jet Black", price: 30, description: "$30/bundle" },
  { id: "browns", name: "Browns/Brunettes", price: 35, description: "$35/bundle" },
  { id: "blondes", name: "Blondes", price: 50, description: "$50/bundle" },
  { id: "reds", name: "Reds/Gingers", price: 50, description: "$50/bundle" },
];

const frontals: Omit<Product, 'size' | 'quantity'>[] = [
  { 
    id: 301, 
    name: "13x4 Frontal", 
    price: 205,
    image: "/bundles-2.jpeg",
    available: true,
    description: "13 by 4 frontal\nEar to ear coverage\nST/NW textures available",
    type: "13x4"
  },
  { 
    id: 302, 
    name: "13x6 Frontal", 
    price: 290,
    image: "/bundles-3.jpeg",
    available: true,
    description: "13 by 6 frontal\nExtended parting space\nST/NW textures available",
    type: "13x6"
  },
];

const SIZES_PRICES: {[key: string]: {size: string; price: number}[]} = {
  "13x4": [
    { size: '12"', price: 205 },
    { size: '14"', price: 225 },
    { size: '16"', price: 258 },
    { size: '18"', price: 284 },
    { size: '20"', price: 308 },
  ],
  "13x6": [
    { size: '14"', price: 290 },
    { size: '16"', price: 310 },
    { size: '18"', price: 329 },
    { size: '20"', price: 350 },
  ]
};

export default function ShopFrontals({ onAddToCart }: { onAddToCart: (p: Product) => void }) {
  const [selectedSizes, setSelectedSizes] = useState<{[key: number]: string}>({});
  const [selectedQuantities, setSelectedQuantities] = useState<{[key: number]: number}>({});
  const [selectedColoringService, setSelectedColoringService] = useState<{[key: number]: string}>({});
  const [showAddons, setShowAddons] = useState<{[key: number]: boolean}>({});
  const navigate = useNavigate();

  const getPrice = (frontal: typeof frontals[0], size?: string) => {
    if (frontal.type && size && SIZES_PRICES[frontal.type]) {
      const sizePrice = SIZES_PRICES[frontal.type].find(sp => sp.size === size);
      return sizePrice ? sizePrice.price : frontal.price;
    }
    return frontal.price;
  };

  const getAvailableSizes = (frontal: typeof frontals[0]) => {
    if (frontal.type && SIZES_PRICES[frontal.type]) {
      return SIZES_PRICES[frontal.type].map(sp => sp.size);
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
          FRONTALS
        </h2>
        <p style={{ color: "#e5e5e5", fontSize: "1.1rem", opacity: 0.8 }}>
          Premium lace frontals for maximum versatility and styling options.
        </p>
      </div>

      {/* Legend */}
      <div style={{
        marginBottom: "2rem",
        padding: "1rem 1.5rem",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
      }}>
        <div style={{ 
          fontSize: "0.75rem", 
          color: "#999", 
          letterSpacing: "0.1em", 
          marginBottom: "0.75rem",
          fontWeight: 600,
        }}>
          TEXTURE LEGEND
        </div>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <div style={{ fontSize: "0.85rem", color: "#e5e5e5" }}>
            <span style={{ fontWeight: 700, color: "#ffffff" }}>ST</span> - Straight
          </div>
          <div style={{ fontSize: "0.85rem", color: "#e5e5e5" }}>
            <span style={{ fontWeight: 700, color: "#ffffff" }}>NW</span> - Natural Wave
          </div>
        </div>
      </div>
      
      <div style={{ 
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
        gap: "2rem",
      }}>
        {frontals.map((frontal, index) => (
          <div 
            key={frontal.id} 
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
                src={`/videos/nh_${(index % 2) + 3}.MOV`}
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
                {frontal.name}
              </h3>
              <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.5rem", marginBottom: "1.25rem" }}>
                ${getPrice(frontal, selectedSizes[frontal.id])}
              </p>
              
              {frontal.description && (
                <div style={{ 
                  marginBottom: "1.25rem", 
                  padding: "1rem",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}>
                  {frontal.description.split('\n').map((line, i) => (
                    <p key={i} style={{ 
                      color: "#e5e5e5", 
                      fontSize: "0.85rem", 
                      marginBottom: i < frontal.description!.split('\n').length - 1 ? "0.5rem" : "0",
                      lineHeight: 1.6,
                    }}>
                      {line}
                    </p>
                  ))}
                </div>
              )}
              
              {/* Size Selector */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", color: "#e5e5e5", fontSize: "0.85rem", marginBottom: "0.5rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                  SIZE
                </label>
                <select
                  value={selectedSizes[frontal.id] || ''}
                  onChange={(e) => setSelectedSizes({...selectedSizes, [frontal.id]: e.target.value})}
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
                  {getAvailableSizes(frontal).map(size => (
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
                      const current = selectedQuantities[frontal.id] || 1;
                      if (current > 1) {
                        setSelectedQuantities({...selectedQuantities, [frontal.id]: current - 1});
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
                    {selectedQuantities[frontal.id] || 1}
                  </div>
                  <button
                    onClick={() => {
                      const current = selectedQuantities[frontal.id] || 1;
                      if (current < 10) {
                        setSelectedQuantities({...selectedQuantities, [frontal.id]: current + 1});
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

              {/* Service Add-ons - Collapsible */}
              <div style={{
                marginBottom: "1.25rem",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                overflow: "hidden",
              }}>
                <button
                  onClick={() => setShowAddons({...showAddons, [frontal.id]: !showAddons[frontal.id]})}
                  style={{
                    width: "100%",
                    padding: "1rem 1.25rem",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "none",
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                  }}
                >
                  <span>ADD-ON SERVICES (OPTIONAL)</span>
                  <span style={{
                    transform: showAddons[frontal.id] ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    display: "inline-block",
                  }}>▼</span>
                </button>

                {showAddons[frontal.id] && (
                  <div style={{ padding: "1.25rem" }}>
                    {/* Coloring Services */}
                    <div>
                      <label style={{ display: "block", color: "#e5e5e5", fontSize: "0.8rem", marginBottom: "0.5rem", fontWeight: 600 }}>
                        Coloring Service
                      </label>
                      <select
                        value={selectedColoringService[frontal.id] || ''}
                        onChange={(e) => setSelectedColoringService({...selectedColoringService, [frontal.id]: e.target.value})}
                        style={{
                          width: "100%",
                          padding: "0.65rem",
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "0",
                          color: "#ffffff",
                          fontSize: "0.85rem",
                          cursor: "pointer",
                        }}
                      >
                        <option value="" style={{ background: "#000000" }}>None</option>
                        {COLORING_SERVICES.map(service => (
                          <option key={service.id} value={service.id} style={{ background: "#000000" }}>
                            {service.name} - {service.description}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  if (frontal.available === false) return;
                  const size = selectedSizes[frontal.id];
                  if (!size) {
                    alert('Please select a size');
                    return;
                  }
                  onAddToCart({
                    ...frontal,
                    size,
                    quantity: selectedQuantities[frontal.id] || 1,
                    price: getPrice(frontal, size)
                  });
                }}
                disabled={frontal.available === false}
                style={{ 
                  background: frontal.available === false ? "rgba(255, 255, 255, 0.1)" : "#ffffff",
                  border: "none", 
                  padding: "1rem 2rem", 
                  borderRadius: "0", 
                  color: frontal.available === false ? "rgba(255, 255, 255, 0.3)" : "#000000", 
                  fontWeight: 600, 
                  fontSize: "0.9rem",
                  cursor: frontal.available === false ? "not-allowed" : "pointer", 
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  width: "100%",
                  letterSpacing: "0.12em",
                }}
                onMouseEnter={(e) => {
                  if (frontal.available !== false) {
                    e.currentTarget.style.transform = "scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(255, 255, 255, 0.2)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (frontal.available !== false) {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {frontal.available === false ? 'Unavailable' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
