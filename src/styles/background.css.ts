// src/styles/background.css.ts
import { style } from "@vanilla-extract/css";

export const appBackground = style({
  minHeight: "100vh",
  width: "100%",
  backgroundColor: "#4A5A2C", // olive green base
  backgroundImage: `
    linear-gradient(to right, rgba(74,90,44,0.95), rgba(30,30,30,0.85)),
    url("/textures/cement.svg")
  `,
  backgroundSize: "cover, 512px 512px",
  backgroundRepeat: "no-repeat, repeat",
  backgroundAttachment: "fixed, fixed",
  backgroundBlendMode: "soft-light, normal",
  color: "white",
});
