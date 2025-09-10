// src/pages/ShopWigs.tsx
type Product = { id: number; name: string; price: number };

const wigs: Product[] = [
  { id: 101, name: "Lace Front Wig", price: 220 },
  { id: 102, name: "Curly Bob Wig", price: 180 },
  { id: 103, name: "Straight HD Wig", price: 250 },
];

export default function ShopWigs({ onAddToCart }: { onAddToCart: (p: Product) => void }) {
  return (
    <div style={{ padding: "6rem 2rem", color: "white" }}>
      <h2 style={{ color: "#9C7B4D" }}>Wigs</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        {wigs.map((wig) => (
          <div
            key={wig.id}
            style={{
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(156,123,77,0.4)",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem", color: "#f7f7f7" }}>{wig.name}</h3>
            <p style={{ marginBottom: "1rem", color: "#9C7B4D", fontWeight: 500 }}>
              ${wig.price}
            </p>
            <button
              onClick={() => onAddToCart(wig)}
              style={{
                background: "#9C7B4D",
                border: "none",
                borderRadius: "8px",
                padding: "0.6rem 1rem",
                color: "white",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#b08c5f")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#9C7B4D")}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
