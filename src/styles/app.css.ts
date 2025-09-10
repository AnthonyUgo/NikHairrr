// src/styles/app.css.ts
import { style } from '@vanilla-extract/css';

export const container = style({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(to right, #023311ff, #022508ff)',
  color: 'white',
  fontFamily: 'system-ui, sans-serif',
});
