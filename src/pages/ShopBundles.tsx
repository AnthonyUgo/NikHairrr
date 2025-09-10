// src/pages/ShopBundles.tsx
type Product = { id: number; name: string; price: number };

const bundles: Product[] = [
  { id: 1, name: "Body Wave Bundle", price: 85 },
  { id: 2, name: "Straight Bundle", price: 90 },
];

export default function ShopBundles({ onAddToCart }: { onAddToCart: (p: Product) => void }) {
  return (
    <div style={{ padding: "6rem 2rem", color: "white" }}>
      <h2 style={{ color: "#9C7B4D" }}>Bundles</h2>
      <div style={{ display: "grid", gap: "1.5rem", marginTop: "2rem" }}>
        {bundles.map((b) => (
          <div key={b.id} style={{ background: "rgba(0,0,0,0.6)", padding: "1rem", borderRadius: "12px" }}>
            <h3>{b.name}</h3>
            <p>${b.price}</p>
            <button
              onClick={() => onAddToCart(b)}
              style={{ background: "#9C7B4D", border: "none", padding: "0.5rem 1rem", borderRadius: "8px", color: "white" }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

