// src/styles/background.css.ts
// Premium deep olive-black background for NikHairrr luxury experience
import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const appBackground = style({
  minHeight: "100vh",
  width: "100%",
  backgroundColor: vars.color.bg, // Deep olive-black (#101510)
  color: vars.color.text,
  // Removed gradient for better performance
});
