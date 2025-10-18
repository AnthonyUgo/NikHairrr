// src/styles/background.css.ts
// Premium deep olive-black background for NikHairrr luxury experience
import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const appBackground = style({
  minHeight: "100vh",
  width: "100%",
  backgroundColor: vars.color.bg, // Deep olive-black (#101510)
  backgroundImage: `
    linear-gradient(145deg, ${vars.color.bg} 0%, ${vars.color.bg2} 50%, ${vars.color.bg} 100%)
  `,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  color: vars.color.text,
});
