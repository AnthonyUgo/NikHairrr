// src/pages/Shop.tsx
import { useNavigate } from "react-router-dom";

export default function Shop() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "6rem 2rem", display: "grid", gap: "2rem" }}>
      <h2 style={{ color: "#9C7B4D", fontSize: "2rem", fontWeight: 700, marginBottom: "2rem" }}>
        Shop by Category
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
        }}
      >
        {/* Bundles Card */}
        <button
          onClick={() => navigate("/shop/bundles")}
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(156,123,77,0.4)",
            borderRadius: "16px",
            overflow: "hidden",
            color: "white",
            textAlign: "left",
            cursor: "pointer",
            padding: 0,
            boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(-4px)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)")}
        >
          <img
            src="/images/bundles-placeholder.png"
            alt="Bundles"
            style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }}
          />
          <div style={{ padding: "1.2rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#9C7B4D" }}>Bundles</h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.5, color: "#ddd" }}>
              Our premium bundles deliver unmatched fullness and longevity. Soft, tangle-free, and
              designed for natural blending, they’re perfect for styling versatility and long-term wear.
            </p>
          </div>
        </button>

        {/* Wigs Card */}
        <button
          onClick={() => navigate("/shop/wigs")}
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(156,123,77,0.4)",
            borderRadius: "16px",
            overflow: "hidden",
            color: "white",
            textAlign: "left",
            cursor: "pointer",
            padding: 0,
            boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(-4px)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)")}
        >
          <img
            src="/images/wigs-placeholder.png"
            alt="Wigs"
            style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }}
          />
          <div style={{ padding: "1.2rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#9C7B4D" }}>Wigs</h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.5, color: "#ddd" }}>
              Our handcrafted wigs are made to fit comfortably while giving you effortless style.
              Whether you want sleek straight, bouncy curls, or protective coverage, our wigs provide
              flawless looks with zero compromise.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
