// src/styles/review.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const reviewForm = style({
  background: 'rgba(16, 21, 16, 0.7)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${vars.color.gold}33`,
  borderRadius: '16px',
  padding: '2rem',
  marginBottom: '3rem',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
});

export const formHeading = style({
  fontSize: '1.75rem',
  fontWeight: 700,
  color: vars.color.cream,
  marginBottom: vars.space.lg,
  background: `linear-gradient(135deg, ${vars.color.gold} 0%, ${vars.color.cream} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

export const formGroup = style({
  marginBottom: vars.space.lg,
});

export const label = style({
  display: 'block',
  color: vars.color.cream,
  fontSize: '0.95rem',
  fontWeight: 600,
  marginBottom: vars.space.sm,
  letterSpacing: '0.02em',
});

export const input = style({
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'rgba(40, 56, 32, 0.3)',
  border: `1px solid ${vars.color.gold}33`,
  borderRadius: vars.radius.md,
  color: vars.color.text,
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  ':focus': {
    outline: 'none',
    borderColor: vars.color.gold,
    boxShadow: `0 0 0 3px ${vars.color.gold}20`,
    background: 'rgba(40, 56, 32, 0.5)',
  },
  '::placeholder': {
    color: vars.color.muted,
    opacity: 0.6,
  },
});

export const textarea = style({
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'rgba(40, 56, 32, 0.3)',
  border: `1px solid ${vars.color.gold}33`,
  borderRadius: vars.radius.md,
  color: vars.color.text,
  fontSize: '1rem',
  fontFamily: 'inherit',
  resize: 'vertical',
  minHeight: '120px',
  transition: 'all 0.3s ease',
  ':focus': {
    outline: 'none',
    borderColor: vars.color.gold,
    boxShadow: `0 0 0 3px ${vars.color.gold}20`,
    background: 'rgba(40, 56, 32, 0.5)',
  },
  '::placeholder': {
    color: vars.color.muted,
    opacity: 0.6,
  },
});

export const starContainer = style({
  display: 'flex',
  gap: '0.5rem',
});

export const starButton = style({
  background: 'transparent',
  border: 'none',
  fontSize: '2rem',
  color: vars.color.muted,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  padding: '0.25rem',
  ':hover': {
    transform: 'scale(1.2)',
  },
});

export const starActive = style({
  color: vars.color.gold,
  filter: 'drop-shadow(0 0 8px rgba(200, 169, 126, 0.5))',
});

export const submitButton = style({
  width: '100%',
  padding: '0.875rem 2rem',
  background: `linear-gradient(135deg, ${vars.color.gold}, ${vars.color.focus})`,
  border: 'none',
  borderRadius: vars.radius.full,
  color: vars.color.bg,
  fontSize: '1.05rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: `0 4px 20px ${vars.color.gold}40`,
  letterSpacing: '0.02em',
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 30px ${vars.color.gold}60`,
  },
  ':active': {
    transform: 'translateY(0)',
  },
});

// Review carousel styles
export const reviewCarousel = style({
  position: 'relative',
  marginBottom: '4rem',
  overflow: 'hidden',
  borderRadius: '0',
  width: '100%',
});

export const carouselTrack = style({
  display: 'flex',
  transition: 'transform 0.5s ease-in-out',
  width: '100%',
  willChange: 'transform',
});

export const reviewCard = style({
  minWidth: '100%',
  maxWidth: '100%',
  width: '100%',
  flex: '0 0 100%',
  padding: '2.5rem',
  background: 'rgba(0, 0, 0, 0.9)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: '0',
  position: 'relative',
  boxSizing: 'border-box',
});

export const reviewHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: vars.space.md,
});

export const reviewerName = style({
  fontSize: '1.25rem',
  fontWeight: 700,
  color: '#ffffff',
  marginBottom: '0.25rem',
});

export const reviewDate = style({
  fontSize: '0.875rem',
  color: '#e5e5e5',
  opacity: 0.7,
});

export const reviewStars = style({
  color: '#ffffff',
  fontSize: '1.25rem',
  letterSpacing: '0.1rem',
});

export const reviewTitle = style({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#ffffff',
  marginBottom: vars.space.md,
});

export const reviewText = style({
  fontSize: '1.1rem',
  lineHeight: 1.8,
  color: vars.color.text,
  marginBottom: vars.space.md,
  fontStyle: 'italic',
});

export const reviewProduct = style({
  fontSize: '0.95rem',
  color: '#ffffff',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginTop: vars.space.md,
  paddingTop: vars.space.md,
  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
});

export const verifiedBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
  padding: '0.25rem 0.75rem',
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: vars.radius.full,
  fontSize: '0.8rem',
  color: '#ffffff',
  fontWeight: 600,
});

export const carouselControls = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  marginTop: vars.space.lg,
});

export const carouselButton = style({
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '0',
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontSize: '1.5rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  ':hover': {
    background: '#ffffff',
    color: '#000000',
    transform: 'scale(1.05)',
  },
  ':disabled': {
    opacity: 0.3,
    cursor: 'not-allowed',
    transform: 'scale(1)',
  },
});

export const carouselDots = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '0.5rem',
  marginTop: vars.space.md,
});

export const dot = style({
  width: '10px',
  height: '10px',
  borderRadius: '0',
  background: 'rgba(255, 255, 255, 0.3)',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  ':hover': {
    background: 'rgba(255, 255, 255, 0.6)',
  },
});

export const dotActive = style({
  background: '#ffffff',
  width: '28px',
  borderRadius: '0',
});
