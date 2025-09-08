// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ onCartClick }: { onCartClick: () => void }) {
  return (
    <nav
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "rgba(0,0,0,0.4)", // transparent overlay
    backdropFilter: "blur(6px)",   // subtle glass effect
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  }}
>
      <h2 style={{ color: "white", margin: 0 }}>NikHairrr</h2>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/shop" style={{ color: "white", textDecoration: "none" }}>
          Shop
        </Link>
        <Link to="/testimonials" style={{ color: "white", textDecoration: "none" }}>
          Testimonials
        </Link>
        <button
          onClick={onCartClick}
          style={{
            color: "white",
            background: "transparent",
            border: "1px solid white",
            borderRadius: "8px",
            padding: "0.3rem 0.8rem",
          }}
        >
          Cart
        </button>
      </div>
    </nav>
  );
}
