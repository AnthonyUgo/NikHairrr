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

// Apply actual values to those tokens - Luxury Black & White Palette
createGlobalTheme(":root", vars, {
  color: {
    bg: "#000000",      // pure black
    bg2: "#1a1a1a",     // deep charcoal
    text: "#e5e5e5",    // off-white text
    brand: "#ffffff",   // pure white (primary)
    gold: "#ffffff",    // white accent
    gold2: "#cccccc",   // light gray hover
    cream: "#ffffff",   // headings / bright white
    focus: "#f5f5f5",   // active/accent light gray
    muted: "#666666",   // medium gray
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
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  fontFeatureSettings: "'ss01', 'ss02', 'cv01', 'cv03'",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});
globalStyle("body", {
  margin: 0,
  backgroundColor: vars.color.bg,
  color: vars.color.text,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  fontFeatureSettings: "'ss01', 'ss02', 'cv01', 'cv03'",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

