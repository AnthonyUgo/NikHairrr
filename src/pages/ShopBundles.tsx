// src/pages/ShopBundles.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiGrid, FiList } from "react-icons/fi";

type Product = { id: number; name: string; price: number; image: string };

const bundles: Product[] = [
  { id: 1, name: "Body Wave Bundle", price: 85, image: "/bundles-1.jpeg" },
  { id: 2, name: "Straight Bundle", price: 90, image: "/bundles-2.jpeg" },
  { id: 3, name: "Deep Wave Bundle", price: 95, image: "/bundles-3.jpeg" },
];

export default function ShopBundles({ onAddToCart }: { onAddToCart: (p: Product) => void }) {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOrder, setSortOrder] = useState<'low-high' | 'high-low'>('low-high');

  const sortedBundles = [...bundles].sort((a, b) => 
    sortOrder === 'low-high' ? a.price - b.price : b.price - a.price
  );

  return (
    <div style={{ padding: "6rem 2rem", color: "#e5e5e5", minHeight: "100vh", maxWidth: "1400px", margin: "0 auto" }}>
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
            fontSize: "2.5rem", 
            fontWeight: 700,
            marginBottom: "0.5rem",
            letterSpacing: "0.1em",
          }}>
            PREMIUM BUNDLES
          </h2>
          <p style={{ color: "#e5e5e5", fontSize: "1.1rem", opacity: 0.8 }}>
            Ethically sourced, salon-grade quality that lasts through countless styles.
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
      
      <div style={{ 
        display: viewMode === 'grid' ? "grid" : "flex",
        flexDirection: viewMode === 'list' ? "column" : undefined,
        gridTemplateColumns: viewMode === 'grid' ? "repeat(auto-fit, minmax(300px, 1fr))" : undefined,
        gap: "2rem",
      }}>
        {sortedBundles.map((b) => (
          <div 
            key={b.id} 
            style={{ 
              background: "rgba(0, 0, 0, 0.9)", 
              backdropFilter: "blur(12px)", 
              border: "1px solid rgba(255, 255, 255, 0.15)", 
              borderRadius: "0",
              overflow: "hidden",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
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
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.8)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
            }}
          >
            <img 
              src={b.image} 
              alt={b.name}
              style={{ 
                width: viewMode === 'list' ? "300px" : "100%",
                aspectRatio: viewMode === 'list' ? "1" : "4 / 5",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ color: "#ffffff", marginBottom: "0.75rem", fontSize: "1.4rem", fontWeight: 700, letterSpacing: "0.05em" }}>
                  {b.name}
                </h3>
                <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.5rem", marginBottom: "1.25rem" }}>
                  ${b.price}
                </p>
              </div>
              <button
                onClick={() => onAddToCart(b)}
                style={{ 
                  background: "#ffffff",
                  border: "none", 
                  padding: "1rem 2rem", 
                  borderRadius: "0", 
                  color: "#000000", 
                  fontWeight: 600, 
                  fontSize: "0.9rem",
                  cursor: "pointer", 
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  width: viewMode === 'list' ? "200px" : "100%",
                  letterSpacing: "0.12em",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
