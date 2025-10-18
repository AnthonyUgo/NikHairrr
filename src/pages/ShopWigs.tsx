// src/pages/ShopWigs.tsx
type Product = { id: number; name: string; price: number; image: string };

const wigs: Product[] = [
  { id: 101, name: "Lace Front Wig", price: 220, image: "/05.jpeg" },
  { id: 102, name: "Curly Bob Wig", price: 180, image: "/06.jpeg" },
  { id: 103, name: "Straight HD Wig", price: 250, image: "/07.jpeg" },
];

export default function ShopWigs({ onAddToCart }: { onAddToCart: (p: Product) => void }) {
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
        Luxury Wigs
      </h2>
      <p style={{ color: "#D9D7D0", fontSize: "1.1rem", marginBottom: "3rem", opacity: 0.8 }}>
        Handcrafted perfection for effortless style and natural movement.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {wigs.map((wig) => (
          <div
            key={wig.id}
            style={{
              background: "rgba(16, 21, 16, 0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(200, 169, 126, 0.3)",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(200, 169, 126, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
            }}
          >
            <img 
              src={wig.image} 
              alt={wig.name}
              style={{ 
                width: "100%", 
                aspectRatio: "4 / 5", 
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "#EDEAE5", fontSize: "1.4rem", fontWeight: 700 }}>
                {wig.name}
              </h3>
              <p style={{ marginBottom: "1.25rem", color: "#C8A97E", fontWeight: 700, fontSize: "1.5rem" }}>
                ${wig.price}
              </p>
              <button
                onClick={() => onAddToCart(wig)}
                style={{
                  background: "linear-gradient(135deg, #C8A97E, #D4A373)",
                  border: "none",
                  borderRadius: "999px",
                  padding: "0.875rem 1.75rem",
                  color: "#101510",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  width: "100%",
                  boxShadow: "0 4px 15px rgba(200, 169, 126, 0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 25px rgba(200, 169, 126, 0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 15px rgba(200, 169, 126, 0.3)";
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
