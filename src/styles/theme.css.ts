// src/styles/theme.css.ts
import { createGlobalTheme, createGlobalThemeContract, globalStyle } from "@vanilla-extract/css";

// Explicit tokens with clear, semantic names
export const vars = createGlobalThemeContract({
  color: {
    bg: "nikkhair-color-bg",
    bg2: "nikkhair-color-bg2",
    text: "nikkhair-color-text",
    brand: "nikkhair-color-brand",
    gold: "nikkhair-color-gold",
    gold2: "nikkhair-color-gold2",
    cream: "nikkhair-color-cream",
    focus: "nikkhair-color-focus",
    muted: "nikkhair-color-muted",
  },
  space: {
    xs: "nikkhair-space-xs",
    sm: "nikkhair-space-sm",
    md: "nikkhair-space-md",
    lg: "nikkhair-space-lg",
    xl: "nikkhair-space-xl",
  },
  radius: {
    sm: "nikkhair-radius-sm",
    md: "nikkhair-radius-md",
    xl: "nikkhair-radius-xl",
    full: "nikkhair-radius-full",
  },
});

// Apply actual values to those tokens - Premium NikHairrr Palette
createGlobalTheme(":root", vars, {
  color: {
    bg: "#101510",      // deep olive-black
    bg2: "#283820",     // dark botanical
    text: "#D9D7D0",    // body text
    brand: "#C8A97E",   // champagne gold (primary)
    gold: "#C8A97E",    // champagne gold
    gold2: "#9B6B3C",   // bronze hover
    cream: "#EDEAE5",   // headings / light text
    focus: "#D4A373",   // active/accent
    muted: "#9aa0a6",   // Grayish neutral (legacy)
  },
  space: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  radius: {
    sm: "8px",
    md: "12px",
    xl: "24px",
    full: "999px",
  },
});

// Global styles
globalStyle("html, body, #app", {
  height: "100%",
  margin: 0,
  color: "white",
  fontFamily: "Inter, ui-sans-serif, system-ui, Arial, sans-serif",
});
globalStyle("body", {
  margin: 0,
  backgroundColor: vars.color.bg,
  color: vars.color.text,
  fontFamily: "Inter, ui-sans-serif, system-ui, Arial, sans-serif",
});

