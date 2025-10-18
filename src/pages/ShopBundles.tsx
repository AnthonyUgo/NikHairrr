// src/pages/ShopBundles.tsx
type Product = { id: number; name: string; price: number; image: string };

const bundles: Product[] = [
  { id: 1, name: "Body Wave Bundle", price: 85, image: "/01.jpeg" },
  { id: 2, name: "Straight Bundle", price: 90, image: "/02.jpeg" },
  { id: 3, name: "Deep Wave Bundle", price: 95, image: "/03.jpeg" },
  { id: 4, name: "Kinky Straight Bundle", price: 88, image: "/04.jpeg" },
];

export default function ShopBundles({ onAddToCart }: { onAddToCart: (p: Product) => void }) {
  return (
    <div style={{ padding: "6rem 2rem", color: "#D9D7D0", minHeight: "100vh", maxWidth: "1400px", margin: "0 auto" }}>
      <h2 style={{ 
        color: "#EDEAE5", 
        fontSize: "2.5rem", 
        fontWeight: 700,
        marginBottom: "1rem",
        background: "linear-gradient(135deg, #C8A97E 0%, #EDEAE5 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}>
        Premium Bundles
      </h2>
      <p style={{ color: "#D9D7D0", fontSize: "1.1rem", marginBottom: "3rem", opacity: 0.8 }}>
        Ethically sourced, salon-grade quality that lasts through countless styles.
      </p>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "2rem",
      }}>
        {bundles.map((b) => (
          <div 
            key={b.id} 
            style={{ 
              background: "rgba(16, 21, 16, 0.7)", 
              backdropFilter: "blur(12px)", 
              border: "1px solid rgba(200, 169, 126, 0.3)", 
              borderRadius: "16px",
              overflow: "hidden",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(200, 169, 126, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.4)";
            }}
          >
            <img 
              src={b.image} 
              alt={b.name}
              style={{ 
                width: "100%", 
                aspectRatio: "4 / 5", 
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ color: "#EDEAE5", marginBottom: "0.75rem", fontSize: "1.4rem", fontWeight: 700 }}>
                {b.name}
              </h3>
              <p style={{ color: "#C8A97E", fontWeight: 700, fontSize: "1.5rem", marginBottom: "1.25rem" }}>
                ${b.price}
              </p>
              <button
                onClick={() => onAddToCart(b)}
                style={{ 
                  background: "linear-gradient(135deg, #C8A97E, #D4A373)",
                  border: "none", 
                  padding: "0.875rem 1.75rem", 
                  borderRadius: "999px", 
                  color: "#101510", 
                  fontWeight: 700, 
                  fontSize: "1rem",
                  cursor: "pointer", 
                  transition: "all 0.3s ease",
                  width: "100%",
                  boxShadow: "0 4px 15px rgba(200, 169, 126, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 25px rgba(200, 169, 126, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(200, 169, 126, 0.3)";
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

