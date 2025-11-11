// src/pages/ShopWigs.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiGrid, FiList } from "react-icons/fi";
import { getPriceId } from "../utils/productPrices";
import LazyVideo from "../components/LazyVideo";

type Product = { id: number; name: string; price: number; image?: string; size?: string; quantity: number; available?: boolean; description?: string; availableSizes?: string[]; lookupKey?: string; priceId?: string };

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

const WIGGING_SERVICES: ServiceAddon[] = [
  { id: "frontal-custom", name: "Frontal Customization (Bleached Knots & Light Plucking)", price: 20, description: "$20", lookupKey: "price_1SRwEbJLcxQ0xaoLufl1klB4" },
];

const wigs: Omit<Product, 'size' | 'quantity'>[] = [
  { 
    id: 102, 
    name: "Hafy Bob", 
    price: 465, 
    image: "/weave-2.jpeg", 
    available: true,
    description: "13 x 4 frontal unit\nTotal weight 400g\nPremium bob style",
    availableSizes: ['12"']
  },
];

const SIZES = ['12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"'];

export default function ShopWigs({ onAddToCart }: { onAddToCart: (p: Product) => void }) {
  const [selectedSizes, setSelectedSizes] = useState<{[key: number]: string}>({});
  const [selectedQuantities, setSelectedQuantities] = useState<{[key: number]: number}>({});
  const [selectedColoringService, setSelectedColoringService] = useState<{[key: number]: string}>({});
  const [selectedWiggingService, setSelectedWiggingService] = useState<{[key: number]: string}>({});
  const [showAddons, setShowAddons] = useState<{[key: number]: boolean}>({});
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOrder, setSortOrder] = useState<'low-high' | 'high-low'>('low-high');

  const sortedWigs = [...wigs].sort((a, b) => 
    sortOrder === 'low-high' ? a.price - b.price : b.price - a.price
  );

  return (
    <div style={{ padding: "clamp(5rem, 10vw, 6rem) clamp(1rem, 4vw, 2rem) 2rem", color: "#e5e5e5", minHeight: "100vh", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Back Button */}
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

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ 
            color: "#ffffff", 
            fontSize: "clamp(1.5rem, 5vw, 2.5rem)", 
            fontWeight: 700,
            marginBottom: "0.5rem",
            letterSpacing: "0.1em",
          }}>
            LUXURY WIGS
          </h2>
          <p style={{ color: "#e5e5e5", fontSize: "1.1rem", opacity: 0.8 }}>
            Handcrafted perfection for effortless style and natural movement.
          </p>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {/* View Toggle */}
          <div style={{ display: "flex", gap: "0.5rem", border: "1px solid rgba(255, 255, 255, 0.2)", padding: "0.25rem" }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                background: viewMode === 'grid' ? "#ffffff" : "transparent",
                color: viewMode === 'grid' ? "#000000" : "#ffffff",
                border: "none",
                padding: "0.5rem 0.75rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              <FiGrid /> GRID
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                background: viewMode === 'list' ? "#ffffff" : "transparent",
                color: viewMode === 'list' ? "#000000" : "#ffffff",
                border: "none",
                padding: "0.5rem 0.75rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              <FiList /> LIST
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'low-high' | 'high-low')}
            style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              padding: "0.5rem 1rem",
              fontSize: "0.85rem",
              cursor: "pointer",
              letterSpacing: "0.05em",
              fontWeight: 600,
            }}
          >
            <option value="low-high" style={{ background: "#000000" }}>PRICE: LOW TO HIGH</option>
            <option value="high-low" style={{ background: "#000000" }}>PRICE: HIGH TO LOW</option>
          </select>
        </div>
      </div>

      <div
        style={{
          display: viewMode === 'grid' ? "grid" : "flex",
          flexDirection: viewMode === 'list' ? "column" : undefined,
          gridTemplateColumns: viewMode === 'grid' ? "repeat(auto-fill, minmax(min(100%, 280px), 1fr))" : undefined,
          gap: "2rem",
        }}
      >
        {sortedWigs.map((wig, index) => (
          <div
            key={wig.id}
            style={{
              background: "rgba(0, 0, 0, 0.9)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "0",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.8)",
              transition: "all 0.3s ease",
              display: viewMode === 'list' ? "flex" : "block",
              flexDirection: viewMode === 'list' ? "row" : undefined,
              flexWrap: viewMode === 'list' ? "wrap" : undefined,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.8)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
            }}
          >
            <div style={{ 
              width: viewMode === 'list' ? "min(300px, 40%)" : "100%",
              aspectRatio: viewMode === 'list' ? "1" : "4 / 5",
              position: "relative",
              flexShrink: 0,
              overflow: "hidden",
            }}>
              <LazyVideo 
                src={`/videos/nh_${(index % 4) + 1}.MOV`}
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
            <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: "0" }}>
              <div>
                <h3 style={{ marginBottom: "0.75rem", color: "#ffffff", fontSize: "1.4rem", fontWeight: 700, letterSpacing: "0.05em" }}>
                  {wig.name}
                </h3>
                <p style={{ marginBottom: "1.25rem", color: "#ffffff", fontWeight: 700, fontSize: "1.5rem" }}>
                  ${wig.price}
                </p>
                
                {/* Description */}
                {wig.description && (
                  <div style={{ 
                    marginBottom: "1.25rem", 
                    padding: "1rem",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}>
                    {wig.description.split('\n').map((line, i) => (
                      <p key={i} style={{ 
                        color: "#e5e5e5", 
                        fontSize: "0.85rem", 
                        marginBottom: i < wig.description!.split('\n').length - 1 ? "0.5rem" : "0",
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
                    value={selectedSizes[wig.id] || ''}
                    onChange={(e) => setSelectedSizes({...selectedSizes, [wig.id]: e.target.value})}
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
                    {(wig.availableSizes || SIZES).map(size => (
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
                        const current = selectedQuantities[wig.id] || 1;
                        if (current > 1) {
                          setSelectedQuantities({...selectedQuantities, [wig.id]: current - 1});
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
                      {selectedQuantities[wig.id] || 1}
                    </div>
                    <button
                      onClick={() => {
                        const current = selectedQuantities[wig.id] || 1;
                        if (current < 10) {
                          setSelectedQuantities({...selectedQuantities, [wig.id]: current + 1});
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
                    onClick={() => setShowAddons({...showAddons, [wig.id]: !showAddons[wig.id]})}
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
                      transform: showAddons[wig.id] ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      display: "inline-block",
                    }}>▼</span>
                  </button>

                  {showAddons[wig.id] && (
                    <div style={{ padding: "1.25rem" }}>
                      {/* Wigging Services */}
                      <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", color: "#e5e5e5", fontSize: "0.8rem", marginBottom: "0.5rem", fontWeight: 600 }}>
                          Wig Customization
                        </label>
                        <select
                          value={selectedWiggingService[wig.id] || ''}
                          onChange={(e) => setSelectedWiggingService({...selectedWiggingService, [wig.id]: e.target.value})}
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
                          {WIGGING_SERVICES.map(service => (
                            <option key={service.id} value={service.id} style={{ background: "#000000" }}>
                              {service.name} - {service.description}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Coloring Services */}
                      <div>
                        <label style={{ display: "block", color: "#e5e5e5", fontSize: "0.8rem", marginBottom: "0.5rem", fontWeight: 600 }}>
                          Coloring Service
                        </label>
                        <select
                          value={selectedColoringService[wig.id] || ''}
                          onChange={(e) => setSelectedColoringService({...selectedColoringService, [wig.id]: e.target.value})}
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
              </div>
              <button
                onClick={() => {
                  if (wig.available === false) return;
                  const size = selectedSizes[wig.id];
                  if (!size) {
                    alert('Please select a size');
                    return;
                  }
                  // Hafy Bob uses price_id system (not lookup_key)
                  // We'll pass the price_id as a special identifier
                  const priceId = getPriceId('hafy-bob-wig');
                  const wigQuantity = selectedQuantities[wig.id] || 1;
                  
                  // Add main wig to cart
                  onAddToCart({
                    ...wig,
                    size,
                    quantity: wigQuantity,
                    priceId: priceId || undefined,
                    // For now, don't include lookupKey for Hafy Bob
                    // Cart will handle checkout via price_id
                  });

                  // Add wigging service if selected
                  const wiggingServiceId = selectedWiggingService[wig.id];
                  if (wiggingServiceId) {
                    const wiggingService = WIGGING_SERVICES.find(s => s.id === wiggingServiceId);
                    if (wiggingService) {
                      onAddToCart({
                        id: Date.now() + 1,
                        name: wiggingService.name,
                        price: wiggingService.price,
                        quantity: 1,
                        priceId: wiggingService.lookupKey
                      });
                    }
                  }

                  // Reset selections after adding
                  const coloringServiceId = selectedColoringService[wig.id];
                  if (coloringServiceId) {
                    const coloringService = COLORING_SERVICES.find(s => s.id === coloringServiceId);
                    if (coloringService) {
                      onAddToCart({
                        id: Date.now() + 2,
                        name: coloringService.name,
                        price: coloringService.price,
                        quantity: 1,
                        priceId: coloringService.lookupKey
                      });
                    }
                  }

                  // Add wigging service if selected
                  setSelectedWiggingService({...selectedWiggingService, [wig.id]: ''});
                  setSelectedColoringService({...selectedColoringService, [wig.id]: ''});
                }}
                disabled={wig.available === false}
                style={{
                  background: wig.available === false ? "rgba(255, 255, 255, 0.1)" : "#ffffff",
                  border: "none",
                  borderRadius: "0",
                  padding: "1rem 2rem",
                  color: wig.available === false ? "rgba(255, 255, 255, 0.3)" : "#000000",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: wig.available === false ? "not-allowed" : "pointer", 
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  width: viewMode === 'list' ? "auto" : "100%",
                  minWidth: viewMode === 'list' ? "150px" : undefined,
                  letterSpacing: "0.12em",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  if (wig.available !== false) {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 30px rgba(255, 255, 255, 0.2)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (wig.available !== false) {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  }
                }}
              >
                {wig.available === false ? 'Unavailable' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
