// src/pages/ShopWigs.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiGrid, FiList } from "react-icons/fi";

type Product = { id: number; name: string; price: number; image: string; size?: string; quantity: number; available?: boolean; description?: string; availableSizes?: string[] };

const wigs: Omit<Product, 'size' | 'quantity'>[] = [
  { 
    id: 101, 
    name: "Lace Front Wig", 
    price: 220, 
    image: "/weave-1.jpeg", 
    available: false,
    description: "13 x 4 frontal unit\nTotal weight 350g\nNatural hairline"
  },
  { 
    id: 102, 
    name: "Hafy Bob", 
    price: 465, 
    image: "/weave-2.jpeg", 
    available: true,
    description: "13 x 4 frontal unit\nTotal weight 400g\nPremium bob style",
    availableSizes: ['12"']
  },
  { 
    id: 103, 
    name: "Straight HD Wig", 
    price: 250, 
    image: "/weave-3.jpeg", 
    available: false,
    description: "13 x 4 frontal unit\nTotal weight 380g\nHD lace technology"
  },
];

const SIZES = ['12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"'];

export default function ShopWigs({ onAddToCart }: { onAddToCart: (p: Product) => void }) {
  const [selectedSizes, setSelectedSizes] = useState<{[key: number]: string}>({});
  const [selectedQuantities, setSelectedQuantities] = useState<{[key: number]: number}>({});
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
          gridTemplateColumns: viewMode === 'grid' ? "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" : undefined,
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
              width: viewMode === 'list' ? "300px" : "100%",
              aspectRatio: viewMode === 'list' ? "1" : "4 / 5",
              position: "relative",
              flexShrink: 0,
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
            <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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
              </div>
              <button
                onClick={() => {
                  if (wig.available === false) return;
                  const size = selectedSizes[wig.id];
                  if (!size) {
                    alert('Please select a size');
                    return;
                  }
                  onAddToCart({
                    ...wig,
                    size,
                    quantity: selectedQuantities[wig.id] || 1
                  });
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
                  width: viewMode === 'list' ? "200px" : "100%",
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
