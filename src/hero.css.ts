// src/hero.css.ts
// Premium luxury styling for Hero component with new NikHairrr palette
import { style } from '@vanilla-extract/css';
import { vars } from './styles/theme.css';

export const shell = style({
  maxWidth: 1200,
  margin: '0 auto',
  padding: vars.space.xl,
  display: 'grid',
  gap: vars.space.lg,
  minHeight: '60vh',
  placeContent: 'center',
});

export const title = style({
  fontSize: 'clamp(40px, 6vw, 72px)',
  lineHeight: 1.05,
  fontWeight: 800,
  letterSpacing: '-0.02em',
  backgroundImage: `linear-gradient(90deg, ${vars.color.gold}, ${vars.color.focus}, ${vars.color.cream})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: vars.space.md,
});

export const sub = style({
  color: vars.color.text,
  fontSize: 'clamp(18px, 2vw, 22px)',
  maxWidth: 700,
  lineHeight: 1.6,
  marginBottom: vars.space.lg,
});

export const cta = style({
  background: vars.color.gold,
  color: vars.color.bg,
  border: '1px solid transparent',
  padding: '0.75rem 1.5rem',
  borderRadius: vars.radius.full,
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  width: 'fit-content',
  transition: 'transform 0.2s ease, background-color 0.2s ease',
  ':hover': {
    background: vars.color.gold2,
    transform: 'translateY(-1px)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
});
