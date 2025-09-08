// src/hero.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './styles/theme.css';

export const shell = style({
  maxWidth: 1200,
  margin: '0 auto',
  padding: vars.space.lg,
  display: 'grid',
  gap: vars.space.lg
});

export const title = style({
  fontSize: 'clamp(32px, 6vw, 64px)',
  lineHeight: 1.05,
  fontWeight: 800,
  letterSpacing: '-0.02em',
  backgroundImage: `linear-gradient(90deg, ${vars.color.brand}, #ffffff)`,
  WebkitBackgroundClip: 'text',
  color: 'transparent'
});

export const sub = style({
  color: vars.color.muted,
  fontSize: '18px',
  maxWidth: 700
});

export const cta = style({
  background: vars.color.brand,
  color: vars.color.bg,
  border: 'none',
  padding: '12px 20px',
  borderRadius: vars.radius.xl,
  fontWeight: 700,
  cursor: 'pointer',
  width: 'fit-content'
});
