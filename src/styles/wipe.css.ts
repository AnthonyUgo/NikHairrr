// src/styles/wipe.css.ts
// Scroll-locked video wipe transitions with CSS View Timelines

import { style, keyframes, globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

// ============= NEW HOME PAGE LAYOUT =============
// Keyframes for background animations
const hairSweep = keyframes({
  '0%': { 
    transform: 'translate(0, 0) scale(1)',
  },
  '50%': {
    transform: 'translate(-3%, 4%) scale(1.05)',
  },
  '100%': { 
    transform: 'translate(-6%, -3%) scale(1.02)',
  },
});

const hairDrift = keyframes({
  '0%': { 
    transform: 'translate(0, 0) rotate(0deg)',
    opacity: 0.8,
  },
  '33%': {
    transform: 'translate(4%, -5%) rotate(1deg)',
    opacity: 0.9,
  },
  '66%': {
    transform: 'translate(-3%, 6%) rotate(-0.5deg)',
    opacity: 0.85,
  },
  '100%': { 
    transform: 'translate(-5%, 3%) rotate(0.5deg)',
    opacity: 0.8,
  },
});

// Main layout container for scrolling text + fixed media
export const scrollLayout = style({
  position: 'relative',
  minHeight: '300vh',
  width: '100%',
  isolation: 'isolate',
});

// Animated background layers
globalStyle('.scrollLayout::before', {
  content: '""',
  position: 'fixed',
  inset: 0,
  background: `
    radial-gradient(ellipse 800px 600px at 25% 40%, ${vars.color.bg2}dd, transparent 65%),
    radial-gradient(ellipse 700px 500px at 75% 60%, ${vars.color.bg2}99, transparent 70%),
    radial-gradient(circle at 50% 50%, ${vars.color.bg}, ${vars.color.bg} 100%)
  `,
  animation: `${hairSweep} 30s ease-in-out infinite alternate`,
  zIndex: -3,
});

globalStyle('.scrollLayout::after', {
  content: '""',
  position: 'fixed',
  inset: 0,
  background: `
    radial-gradient(circle 700px at 20% 30%, ${vars.color.gold}18, transparent 60%),
    radial-gradient(circle 600px at 80% 70%, ${vars.color.focus}12, transparent 65%),
    radial-gradient(ellipse 900px 400px at 50% 80%, ${vars.color.gold2}08, transparent 70%)
  `,
  mixBlendMode: 'soft-light',
  animation: `${hairDrift} 35s ease-in-out infinite alternate`,
  zIndex: -2,
});

// Define keyframes before usage
const fiberShift = keyframes({
  '0%': { transform: 'translateY(0)' },
  '100%': { transform: 'translateY(-10px)' },
});

const logoFloat = keyframes({
  '0%, 100%': { 
    transform: 'translateY(0) rotateX(0deg)',
  },
  '50%': { 
    transform: 'translateY(-8px) rotateX(2deg)',
  },
});

const fadeInSection = keyframes({
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const strandWave = keyframes({
  '0%, 100%': {
    transform: 'translateX(0) scaleY(1)',
    opacity: 0.4,
  },
  '50%': {
    transform: 'translateX(10px) scaleY(1.1)',
    opacity: 0.7,
  },
});

const headingShimmer = keyframes({
  '0%, 100%': {
    backgroundPosition: '0% center',
  },
  '50%': {
    backgroundPosition: '100% center',
  },
});

// Fixed media box - locked to center right
export const mediaBox = style({
  position: 'fixed',
  top: '50%',
  right: '5vw',
  transform: 'translateY(-50%)',
  width: 'min(45vw, 600px)',
  aspectRatio: '1',
  zIndex: 10,
  '@media': {
    'screen and (max-width: 768px)': {
      top: '20vh',
      right: '50%',
      transform: 'translateX(50%)',
      width: '80vw',
    },
  },
});

export const logoContainer = style({
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.85)',
  borderRadius: '24px',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${vars.color.gold}33`,
  display: 'grid',
  placeItems: 'center',
  padding: '3rem',
  boxShadow: `
    0 20px 60px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(200, 169, 126, 0.1)
  `,
  position: 'relative',
  overflow: 'hidden',
});

// Glass reflection overlay on logo container
globalStyle('.logoContainer::before', {
  content: '""',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '40%',
  background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)',
  borderRadius: '24px 24px 0 0',
  pointerEvents: 'none',
});

// Subtle hair fiber texture
globalStyle('.logoContainer::after', {
  content: '""',
  position: 'absolute',
  inset: 0,
  backgroundImage: `
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(200, 169, 126, 0.02) 2px,
      rgba(200, 169, 126, 0.02) 4px
    ),
    repeating-linear-gradient(
      180deg,
      transparent,
      transparent 3px,
      rgba(200, 169, 126, 0.015) 3px,
      rgba(200, 169, 126, 0.015) 6px
    )
  `,
  opacity: 0.6,
  mixBlendMode: 'overlay',
  pointerEvents: 'none',
  animation: `${fiberShift} 20s linear infinite`,
});

export const logoImage = style({
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
  filter: 'drop-shadow(0 4px 20px rgba(200, 169, 126, 0.3))',
  animation: `${logoFloat} 6s ease-in-out infinite`,
  transformStyle: 'preserve-3d',
  perspective: '1000px',
});

// Scrolling text content - left side
export const scrollContent = style({
  paddingLeft: '5vw',
  paddingRight: 'calc(45vw + 10vw)',
  paddingTop: '20vh',
  paddingBottom: '20vh',
  '@media': {
    'screen and (max-width: 768px)': {
      paddingRight: '5vw',
      paddingTop: '60vh',
    },
  },
});

export const contentSection = style({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: vars.space.lg,
  paddingBlock: vars.space.xl,
  position: 'relative',
  opacity: 0,
  transform: 'translateY(40px)',
  animation: `${fadeInSection} 1s ease-out forwards`,
  animationDelay: '0.2s',
});

// Hair strand decorative element
globalStyle('.contentSection::before', {
  content: '""',
  position: 'absolute',
  left: '-5vw',
  top: '20%',
  width: '2px',
  height: '60%',
  background: `linear-gradient(180deg, transparent, ${vars.color.gold}40, ${vars.color.gold}80, ${vars.color.gold}40, transparent)`,
  borderRadius: '2px',
  animation: `${strandWave} 8s ease-in-out infinite`,
});

export const sectionHeading = style({
  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
  fontWeight: 700,
  background: `linear-gradient(135deg, ${vars.color.gold} 0%, ${vars.color.focus} 50%, ${vars.color.cream} 100%)`,
  backgroundSize: '200% 100%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  lineHeight: 1.1,
  marginBottom: vars.space.sm,
  letterSpacing: '-0.02em',
  animation: `${headingShimmer} 8s ease-in-out infinite`,
  filter: 'drop-shadow(0 0 20px rgba(200, 169, 126, 0.2))',
});

export const sectionTagline = style({
  fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
  color: vars.color.text,
  fontWeight: 300,
  lineHeight: 1.4,
  opacity: 0.9,
});

export const sectionBody = style({
  fontSize: '1.125rem',
  color: vars.color.text,
  lineHeight: 1.8,
  maxWidth: '600px',
  opacity: 0.7,
});

// ============= OLD STYLES FOR OTHER PAGES =============
// Keyframes for the wipe animation - Apple-style horizontal squeeze
export const wipeout = keyframes({
  '0%': {
    clipPath: 'inset(30% 0 30% 0 round 20px)',
  },
  '100%': {
    clipPath: 'inset(70% 0 70% 0 round 20px)',
  },
});

// Main sections container - declares timeline-scope for all section timelines
export const nhSections = style({
  // @ts-ignore - CSS View Timeline API
  timelineScope: '--vt-hero --vt-look1 --vt-look2',
});

// Individual section - creates enough scroll distance for smooth animation
export const nhSection = style({
  minBlockSize: '200vh',
  display: 'grid',
  placeItems: 'center',
  background: `linear-gradient(145deg, ${vars.color.bg} 0%, ${vars.color.bg2} 100%)`,
  position: 'relative',
});

// Sticky container - centered and locked during scroll
export const nhSticky = style({
  position: 'sticky',
  top: '50%',
  transform: 'translateY(-50%)',
  inlineSize: 'min(90vw, 1200px)',
  aspectRatio: '16/9',
  display: 'grid',
  placeItems: 'center',
  zIndex: 1,
});

// Video stack container
export const nhVideoStack = style({
  position: 'relative',
  inlineSize: '100%',
  blockSize: '100%',
  overflow: 'hidden',
  borderRadius: vars.radius.xl,
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.45)',
});

// Video layer styles
export const nhVideo = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  filter: 'saturate(0.9) contrast(1.05)',
});

// Copy overlay
export const nhCopy = style({
  position: 'absolute',
  inset: 'auto 0 5% 0',
  display: 'grid',
  placeItems: 'center',
  textAlign: 'center',
  color: vars.color.cream,
  paddingInline: '2rem',
  zIndex: 10,
});

export const nhHeading = style({
  fontSize: 'clamp(2rem, 5vw, 4rem)',
  fontWeight: 800,
  letterSpacing: '-0.02em',
  margin: '0 0 0.5rem 0',
  color: vars.color.cream,
});

export const nhTagline = style({
  fontSize: 'clamp(1rem, 2vw, 1.5rem)',
  margin: '0 0 1.5rem 0',
  maxWidth: '600px',
});

// Luxury gradient text effect (can be applied to taglines)
export const luxuryGradient = style({
  background: `linear-gradient(90deg, ${vars.color.gold}, ${vars.color.focus}, ${vars.color.cream})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

// Video layer classes
export const layer = style({});
export const layer1 = style({});
export const layer2 = style({});

// Logo-specific layers with Apple-style transformations
export const logoLayer1 = style({
  transition: 'transform 0.3s ease, opacity 0.3s ease',
});

export const logoLayer2 = style({
  transition: 'transform 0.3s ease, opacity 0.3s ease',
  filter: 'blur(0px) brightness(1.05)',
});

// Global styles for view timeline bindings
// Each section's top layer animates with its own timeline

globalStyle('#hero', {
  // @ts-ignore - CSS View Timeline API
  viewTimelineName: '--vt-hero',
  // @ts-ignore
  viewTimelineAxis: 'block',
});

globalStyle('#hero .layer.layer-1', {
  animationName: wipeout,
  // @ts-ignore - CSS View Timeline API
  animationTimeline: '--vt-hero',
  animationFillMode: 'both',
  // @ts-ignore
  animationRange: 'entry 0% contain 100%',
});

globalStyle('#look1', {
  // @ts-ignore
  viewTimelineName: '--vt-look1',
  // @ts-ignore
  viewTimelineAxis: 'block',
});

globalStyle('#look1 .layer.layer-1', {
  animationName: wipeout,
  // @ts-ignore
  animationTimeline: '--vt-look1',
  animationFillMode: 'both',
  // @ts-ignore
  animationRange: 'entry 0% contain 100%',
});

globalStyle('#look2', {
  // @ts-ignore
  viewTimelineName: '--vt-look2',
  // @ts-ignore
  viewTimelineAxis: 'block',
});

globalStyle('#look2 .layer.layer-1', {
  animationName: wipeout,
  // @ts-ignore
  animationTimeline: '--vt-look2',
  animationFillMode: 'both',
  // @ts-ignore
  animationRange: 'entry 0% contain 100%',
});

// Fallback for browsers without CSS View Timeline support
globalStyle('@supports not (animation-timeline: view())', {
  // Disable animation-driven clip and set a default state
});

globalStyle('@supports not (animation-timeline: view()) .nh-video-stack .layer.layer-1', {
  clipPath: 'inset(50% 0 50% 0)',
  transition: 'clip-path 0.6s ease',
});

globalStyle('@supports not (animation-timeline: view()) .nh-section.is-active .layer.layer-1', {
  clipPath: 'inset(80% 0 20% 0)',
});
