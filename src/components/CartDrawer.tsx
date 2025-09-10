// src/components/CartDrawer.tsx
type Product = { id: number; name: string; price: number };

export default function CartDrawer({
  cart,
  onClose,
}: {
  cart: Product[];
  onClose: () => void;
}) {
  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "320px",
        height: "100%",
        background: "#071f02ff",
        color: "white",
        padding: "1rem",
        boxShadow: "-4px 0 10px rgba(7, 49, 2, 0.58)",
        zIndex: 200,
      }}
    >
      <button onClick={onClose} style={{ float: "right", color: "white", background: "transparent", border: "none" }}>
        ✕
      </button>
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {cart.map((item, idx) => (
            <li key={idx} style={{ margin: "1rem 0" }}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )}
      <h4>Total: ${total}</h4>
      <button
        style={{ width: "100%", padding: "0.8rem", background: "#655804ff", border: "none", borderRadius: "8px", color: "white" }}
      >
        Checkout
      </button>
    </div>
  );
}
