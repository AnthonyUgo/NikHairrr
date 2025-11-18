// src/styles/app.css.ts
import { style, keyframes } from '@vanilla-extract/css';

// Global animations
export const fadeInScale = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate(-50%, -50%) scale(0.9)',
  },
  '100%': {
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1)',
  },
});

export const float = keyframes({
  '0%, 100%': {
    transform: 'translateY(0)',
  },
  '50%': {
    transform: 'translateY(-10px)',
  },
});

export const container = style({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(to right, #023311ff, #022508ff)',
  color: 'white',
  fontFamily: 'system-ui, sans-serif',
});
