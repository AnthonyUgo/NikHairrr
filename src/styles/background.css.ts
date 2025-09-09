import { style } from "@vanilla-extract/css";

export const appBackground = style({
  minHeight: "100vh",
  width: "100%",
  backgroundColor: "#111",
  backgroundImage: `
    linear-gradient(to right, #111, #333),
    url("/cement-texture.png")
  `,
  backgroundSize: "cover",
  backgroundRepeat: "repeat",
  backgroundAttachment: "fixed",
  backgroundBlendMode: "overlay", // blends texture with gradient
  color: "white",
});
