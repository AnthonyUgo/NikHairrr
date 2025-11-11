// src/pages/ShopClosures.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

type Product = { id: number; name: string; price: number; image?: string; size?: string; quantity: number; available?: boolean; description?: string; type?: string; lookupKey?: string; priceId?: string };

type ServiceAddon = {
  id: string;
  name: string;
  price: number;
  description: string;
  lookupKey: string;
};

const COLORING_SERVICES: ServiceAddon[] = [
  { id: "jet-black", name: "Jet Black", price: 30, description: "$30/bundle", lookupKey: "price_1SRvjNJLcxQ0xaoL2faRCGUB" },
  { id: "browns", name: "Browns/Brunettes", price: 35, description: "$35/bundle", lookupKey: "price_1SRwBNJLcxQ0xaoLTC1vJTMT" },
  { id: "blondes", name: "Blondes", price: 50, description: "$50/bundle", lookupKey: "price_1SRwBNJLcxQ0xaoLxsP83Yqn" },
  { id: "reds", name: "Reds/Gingers", price: 50, description: "$50/bundle", lookupKey: "price_1SRwBNJLcxQ0xaoLk0LG8GtE" },
];

const closures: Omit<Product, 'size' | 'quantity'>[] = [
  { 
    id: 201, 
    name: "5x5 Closure", 
    price: 156,
    image: "/closure.png",
    available: true,
    description: "5 by 5 closure\nPremium lace closure\nST/NW textures available",
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
  const [selectedColoringService, setSelectedColoringService] = useState<{[key: number]: string}>({});
  const [showAddons, setShowAddons] = useState<{[key: number]: boolean}>({});
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

  // Get lookup key from Stripe price IDs
  const getLookupKey = (_closure: typeof closures[0], size?: string): string | undefined => {
    if (!size) return undefined;
    // Map sizes to Stripe price IDs for 5x5 closures
    const priceIdMap: {[key: string]: string} = {
      '12"': 'price_1SRvyMJLcxQ0xaoLF2l5zq7x',
      '14"': 'price_1SRvyMJLcxQ0xaoL5TUaQb1J',
      '16"': 'price_1SRvyMJLcxQ0xaoLDy7phXB4',
      '18"': 'price_1SRvyMJLcxQ0xaoLt8liSalh',
      '20"': 'price_1SRvyMJLcxQ0xaoLo3nofIbT',
    };
    return priceIdMap[size];
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
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
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
              {closure.image && (
                <img
                  src={closure.image}
                  alt={closure.name}
                  loading="lazy"
                  style={{ 
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
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
                    <span style={{ fontWeight: 700, color: "#ffffff" }}>NW</span> - Natural Wave
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

              {/* Service Add-ons - Collapsible */}
              <div style={{
                marginBottom: "1.25rem",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                overflow: "hidden",
              }}>
                <button
                  onClick={() => setShowAddons({...showAddons, [closure.id]: !showAddons[closure.id]})}
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
                    transform: showAddons[closure.id] ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    display: "inline-block",
                  }}>▼</span>
                </button>

                {showAddons[closure.id] && (
                  <div style={{ padding: "1.25rem" }}>
                    {/* Coloring Services */}
                    <div>
                      <label style={{ display: "block", color: "#e5e5e5", fontSize: "0.8rem", marginBottom: "0.5rem", fontWeight: 600 }}>
                        Coloring Service
                      </label>
                      <select
                        value={selectedColoringService[closure.id] || ''}
                        onChange={(e) => setSelectedColoringService({...selectedColoringService, [closure.id]: e.target.value})}
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
                  if (closure.available === false) return;
                  const size = selectedSizes[closure.id];
                  if (!size) {
                    alert('Please select a size');
                    return;
                  }
                  const lookupKey = getLookupKey(closure, size);
                  if (!lookupKey) {
                    alert('This size is not available for checkout yet');
                    return;
                  }
                  // Add main closure to cart
                  const closureQuantity = selectedQuantities[closure.id] || 1;
                  onAddToCart({
                    ...closure,
                    size,
                    quantity: closureQuantity,
                    price: getPrice(closure, size),
                    lookupKey
                  });

                  // Add coloring service if selected (multiplied by closure quantity)
                  const coloringServiceId = selectedColoringService[closure.id];
                  if (coloringServiceId) {
                    const coloringService = COLORING_SERVICES.find(s => s.id === coloringServiceId);
                    if (coloringService) {
                      onAddToCart({
                        id: Date.now() + 1,
                        name: coloringService.name,
                        price: coloringService.price,
                        quantity: closureQuantity,
                        lookupKey: coloringService.lookupKey
                      });
                    }
                  }

                  // Reset selections
                  setSelectedColoringService({...selectedColoringService, [closure.id]: ''});
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
