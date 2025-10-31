// src/styles/buttons.css.ts
// Premium button styles for NikHairrr - rounded luxury design

import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

// Primary button - pure white with hover lift
export const btnPrimary = style({
  background: '#ffffff',
  backgroundSize: '200% 100%',
  color: '#000000',
  borderRadius: vars.radius.full,
  padding: '0.75rem 1.5rem',
  border: '1px solid #ffffff',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.2s ease, box-shadow 0.3s ease',
  boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)',
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 25px rgba(255, 255, 255, 0.5)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
});

globalStyle('.btnPrimary::before', {
  content: '""',
  position: 'absolute',
  top: 0,
  left: '-100%',
  width: '100%',
  height: '100%',
  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
  transition: 'left 0.6s ease',
});

globalStyle('.btnPrimary:hover::before', {
  left: '100%',
});

// Outline button - transparent with white border
export const btnOutline = style({
  background: 'transparent',
  color: '#ffffff',
  border: '1px solid #ffffff',
  borderRadius: vars.radius.full,
  padding: '0.75rem 1.5rem',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'transform 0.2s ease, background-color 0.2s ease, color 0.2s ease',
  ':hover': {
    background: '#ffffff',
    color: '#000000',
    transform: 'translateY(-1px)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
});

// Secondary button - subtle cream
export const btnSecondary = style({
  background: vars.color.cream,
  color: vars.color.bg,
  borderRadius: vars.radius.full,
  padding: '0.75rem 1.5rem',
  border: '1px solid transparent',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.2s ease, box-shadow 0.3s ease',
  boxShadow: `0 2px 10px ${vars.color.cream}30`,
  ':hover': {
    transform: 'translateY(-2px) scale(1.02)',
    boxShadow: `0 4px 20px ${vars.color.cream}50`,
  },
  ':active': {
    transform: 'translateY(0) scale(1)',
  },
});

globalStyle('.btnSecondary::after', {
  content: '""',
  position: 'absolute',
  inset: 0,
  background: `radial-gradient(circle at center, ${vars.color.gold}20, transparent 70%)`,
  opacity: 0,
  transition: 'opacity 0.4s ease',
});

globalStyle('.btnSecondary:hover::after', {
  opacity: 1,
});

// Link style
export const link = style({
  color: vars.color.gold,
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  ':hover': {
    color: vars.color.cream,
  },
});

// Luxury gradient text effect
export const luxuryGradient = style({
  background: `linear-gradient(90deg, ${vars.color.gold}, ${vars.color.focus}, ${vars.color.cream})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});
