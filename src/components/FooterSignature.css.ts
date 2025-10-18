// src/components/FooterSignature.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css';

export const signatureContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: `${vars.space.md} 0`,
  opacity: 0.4,
  transition: 'opacity 0.3s ease',
  ':hover': {
    opacity: 0.7,
  },
});

export const signatureLogo = style({
  width: '70px',
  height: 'auto',
  filter: 'grayscale(0.3) brightness(1.1)',
});
