// src/pages/Shop.tsx
import { useNavigate } from "react-router-dom";
import FooterSignature from "../components/FooterSignature";

export default function Shop() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "clamp(5rem, 10vw, 6rem) clamp(1rem, 4vw, 2rem) 2rem", minHeight: "100vh", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ marginBottom: "4rem" }}>
        <h2 style={{ 
          color: "#ffffff", 
          fontSize: "clamp(2rem, 5vw, 3.5rem)", 
          fontWeight: 700, 
          marginBottom: "1rem", 
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
        }}>
          SHOP BY CATEGORY
        </h2>
        <p style={{ color: "#e5e5e5", fontSize: "1.1rem", opacity: 0.7 }}>
          Discover our curated collection of premium hair products
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 350px), 1fr))",
          gap: "clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        {/* Bundles Card */}
        <button
          onClick={() => navigate("/shop/bundles")}
          style={{
            background: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            overflow: "hidden",
            color: "white",
            textAlign: "left",
            cursor: "pointer",
            padding: 0,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            const img = e.currentTarget.querySelector('img') as HTMLImageElement;
            if (img) img.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
            const img = e.currentTarget.querySelector('img') as HTMLImageElement;
            if (img) img.style.transform = "scale(1)";
          }}
        >
          <div style={{ overflow: "hidden", position: "relative", aspectRatio: "4/5" }}>
            <img
              src="/bundles.png"
              alt="Bundles"
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
                objectPosition: "center 1pt",
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",
            }} />
          </div>
          <div style={{ padding: "2rem" }}>
            <h3 style={{ 
              fontSize: "1.75rem", 
              fontWeight: 700, 
              color: "#ffffff", 
              letterSpacing: "0.08em",
              marginBottom: "1rem",
            }}>
              BUNDLES
            </h3>
            <p style={{ 
              fontSize: "0.95rem", 
              lineHeight: 1.6, 
              color: "#e5e5e5",
              opacity: 0.8,
            }}>
              Premium bundles delivering unmatched fullness and longevity. Designed for natural blending.
            </p>
            <div style={{
              marginTop: "1.5rem",
              fontSize: "0.85rem",
              color: "#ffffff",
              letterSpacing: "0.15em",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              SHOP NOW <span style={{ fontSize: "1.2rem" }}>→</span>
            </div>
          </div>
        </button>

        {/* Wigs Card */}
        <button
          onClick={() => navigate("/shop/wigs")}
          style={{
            background: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            overflow: "hidden",
            color: "white",
            textAlign: "left",
            cursor: "pointer",
            padding: 0,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            const img = e.currentTarget.querySelector('img') as HTMLImageElement;
            if (img) img.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
            const img = e.currentTarget.querySelector('img') as HTMLImageElement;
            if (img) img.style.transform = "scale(1)";
          }}
        >
          <div style={{ overflow: "hidden", position: "relative", aspectRatio: "4/5" }}>
            <img
              src="/wigs.png"
              alt="Wigs"
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
                objectPosition: "center 1pt",
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",
            }} />
          </div>
          <div style={{ padding: "2rem" }}>
            <h3 style={{ 
              fontSize: "1.75rem", 
              fontWeight: 700, 
              color: "#ffffff", 
              letterSpacing: "0.08em",
              marginBottom: "1rem",
            }}>
              WIGS
            </h3>
            <p style={{ 
              fontSize: "0.95rem", 
              lineHeight: 1.6, 
              color: "#e5e5e5",
              opacity: 0.8,
            }}>
              Handcrafted wigs for effortless style. Flawless looks with zero compromise.
            </p>
            <div style={{
              marginTop: "1.5rem",
              fontSize: "0.85rem",
              color: "#ffffff",
              letterSpacing: "0.15em",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              SHOP NOW <span style={{ fontSize: "1.2rem" }}>→</span>
            </div>
          </div>
        </button>

        {/* Closures Card */}
        <button
          onClick={() => navigate("/shop/closures")}
          style={{
            background: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            overflow: "hidden",
            color: "white",
            textAlign: "left",
            cursor: "pointer",
            padding: 0,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            const img = e.currentTarget.querySelector('img') as HTMLImageElement;
            if (img) img.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
            const img = e.currentTarget.querySelector('img') as HTMLImageElement;
            if (img) img.style.transform = "scale(1)";
          }}
        >
          <div style={{ overflow: "hidden", position: "relative", aspectRatio: "4/5" }}>
            <img
              src="/closure.png"
              alt="Closures"
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
                objectPosition: "center 1pt",
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",
            }} />
          </div>
          <div style={{ padding: "2rem" }}>
            <h3 style={{ 
              fontSize: "1.75rem", 
              fontWeight: 700, 
              color: "#ffffff", 
              letterSpacing: "0.08em",
              marginBottom: "1rem",
            }}>
              CLOSURES
            </h3>
            <p style={{ 
              fontSize: "0.95rem", 
              lineHeight: 1.6, 
              color: "#e5e5e5",
              opacity: 0.8,
            }}>
              Premium lace closures for a natural, seamless finish to your install.
            </p>
            <div style={{
              marginTop: "1.5rem",
              fontSize: "0.85rem",
              color: "#ffffff",
              letterSpacing: "0.15em",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              SHOP NOW <span style={{ fontSize: "1.2rem" }}>→</span>
            </div>
          </div>
        </button>

        {/* Frontals Card */}
        <button
          onClick={() => navigate("/shop/frontals")}
          style={{
            background: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            overflow: "hidden",
            color: "white",
            textAlign: "left",
            cursor: "pointer",
            padding: 0,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            const img = e.currentTarget.querySelector('img') as HTMLImageElement;
            if (img) img.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
            const img = e.currentTarget.querySelector('img') as HTMLImageElement;
            if (img) img.style.transform = "scale(1)";
          }}
        >
          <div style={{ overflow: "hidden", position: "relative", aspectRatio: "4/5" }}>
            <img
              src="/frontals.png"
              alt="Frontals"
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
                objectPosition: "center 1pt",
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",
            }} />
          </div>
          <div style={{ padding: "2rem" }}>
            <h3 style={{ 
              fontSize: "1.75rem", 
              fontWeight: 700, 
              color: "#ffffff", 
              letterSpacing: "0.08em",
              marginBottom: "1rem",
            }}>
              FRONTALS
            </h3>
            <p style={{ 
              fontSize: "0.95rem", 
              lineHeight: 1.6, 
              color: "#e5e5e5",
              opacity: 0.8,
            }}>
              Premium lace frontals for maximum versatility and styling freedom.
            </p>
            <div style={{
              marginTop: "1.5rem",
              fontSize: "0.85rem",
              color: "#ffffff",
              letterSpacing: "0.15em",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              SHOP NOW <span style={{ fontSize: "1.2rem" }}>→</span>
            </div>
          </div>
        </button>
      </div>
      
      <FooterSignature />
    </div>
  );
}
