// Shop.tsx
type Product = { id: number; name: string; price: number };

const products: Product[] = [
  { id: 1, name: "Shampoo", price: 15 },
  { id: 2, name: "Conditioner", price: 18 },
  { id: 3, name: "Hair Oil", price: 22 },
];

export default function Shop({ onAddToCart }: { onAddToCart: (p: Product) => void }) {
  return (
    <div style={{ padding: "6rem 2rem" }}>
      <h2 style={{ color: "white" }}>Shop Products</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginTop: "2rem" }}>
        {products.map((product) => (
          <div key={product.id} style={{ background: "#222", padding: "1rem", borderRadius: "12px", color: "white" }}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button
              onClick={() => onAddToCart(product)}
              style={{ marginTop: "1rem", padding: "0.5rem 1rem", borderRadius: "8px", border: "none", background: "#FF3EA5", color: "white" }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
