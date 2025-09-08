// src/styles/theme.css.ts
import { createGlobalTheme, createGlobalThemeContract, globalStyle } from "@vanilla-extract/css";

// Explicit tokens with clear, semantic names
export const vars = createGlobalThemeContract({
  color: {
    bg: "nikkhair-color-bg",
    text: "nikkhair-color-text",
    brand: "nikkhair-color-brand",
    muted: "nikkhair-color-muted",
  },
  space: {
    xs: "nikkhair-space-xs",
    sm: "nikkhair-space-sm",
    md: "nikkhair-space-md",
    lg: "nikkhair-space-lg",
  },
  radius: {
    md: "nikkhair-radius-md",
    xl: "nikkhair-radius-xl",
  },
});

// Apply actual values to those tokens
createGlobalTheme(":root", vars, {
  color: {
    bg: "#0b0b0c",
    text: "#f7f7f7",
    brand: "#FF3EA5", // Signature pink
    muted: "#9aa0a6", // Grayish neutral
  },
  space: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
  },
  radius: {
    md: "12px",
    xl: "24px",
  },
});

// Global styles
globalStyle("html, body, #app", {
  height: "100%",
  margin: 0,
  background: "linear-gradient(to right, #111, #333)", // the fade
  color: "white",
  fontFamily: "Inter, ui-sans-serif, system-ui, Arial, sans-serif",
});
globalStyle("body", {
  margin: 0,
  backgroundColor: vars.color.bg,
  color: vars.color.text,
  fontFamily: "Inter, ui-sans-serif, system-ui, Arial, sans-serif",
});

