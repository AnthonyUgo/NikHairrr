// src/pages/Shop.tsx
import { useNavigate } from "react-router-dom";
import FooterSignature from "../components/FooterSignature";

export default function Shop() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "6rem 2rem", display: "grid", gap: "2rem", minHeight: "100vh" }}>
      <h2 style={{ color: "#EDEAE5", fontSize: "2rem", fontWeight: 700, marginBottom: "2rem" }}>
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
            background: "rgba(16, 21, 16, 0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(200, 169, 126, 0.3)",
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
            src="/08.jpeg"
            alt="Bundles"
            style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }}
          />
          <div style={{ padding: "1.2rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#C8A97E" }}>Bundles</h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.5, color: "#D9D7D0" }}>
              Our premium bundles deliver unmatched fullness and longevity. Soft, tangle-free, and
              designed for natural blending, they're perfect for styling versatility and long-term wear.
            </p>
          </div>
        </button>

        {/* Wigs Card */}
        <button
          onClick={() => navigate("/shop/wigs")}
          style={{
            background: "rgba(16, 21, 16, 0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(200, 169, 126, 0.3)",
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
            src="/07.jpeg"
            alt="Wigs"
            style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }}
          />
          <div style={{ padding: "1.2rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#C8A97E" }}>Wigs</h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.5, color: "#D9D7D0" }}>
              Our handcrafted wigs are made to fit comfortably while giving you effortless style.
              Whether you want sleek straight, bouncy curls, or protective coverage, our wigs provide
              flawless looks with zero compromise.
            </p>
          </div>
        </button>
      </div>
      
      <FooterSignature />
    </div>
  );
}
