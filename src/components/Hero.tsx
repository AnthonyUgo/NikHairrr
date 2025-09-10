// src/components/Hero.tsx
import * as h from "../hero.css";

export default function Hero() {
  return (
    <section className={h.shell}>
      <h1 className={h.title}>NikHairrr</h1>
      <p className={h.sub}>
        Luxury hair, zero compromise—bundles, frontals, and wigs that actually last.
      </p>
      <button className={h.cta}>Shop Bundles</button>
    </section>
  );
}
