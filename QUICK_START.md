# Quick Start Guide - NikHairrr Premium Site

## 🎉 What's Been Done

Your site now has:
- ✅ **Premium luxury color palette** (deep olive-black + champagne gold)
- ✅ **Scroll-locked video wipe transitions** (cutting-edge CSS animations)
- ✅ **Luxury buttons with hover effects** across all pages
- ✅ **Glass-morphism UI elements** (navbar, cards, cart)
- ✅ **Temporary SVG placeholders** (so you can see it working immediately)
- ✅ **Browser compatibility fallback** (works everywhere)

## 🚀 How to Run & Test

### 1. Install Dependencies (if needed)
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Visit: `http://localhost:5173` (or the port Vite shows)

### 4. Test the Scroll Animation
- Scroll slowly on the homepage
- You should see 3 sections with videos that "wipe" away as you scroll
- Currently using SVG placeholders with brand colors

## 📸 Adding Your Real Content

### Phase 1: Add Placeholder Images (Temporary)
Replace the SVG files with actual images:

**Location:** `public/placeholders/`

**Files to replace:**
- `hero-1.svg` → `hero-1.jpg` (hero top layer)
- `hero-2.svg` → `hero-2.jpg` (hero bottom layer)
- `look1-1.svg` → `look1-1.jpg`
- `look1-2.svg` → `look1-2.jpg`
- `look2-1.svg` → `look2-1.jpg`
- `look2-2.svg` → `look2-2.jpg`

**Update in:** `src/pages/Home.tsx`
```tsx
// Change from .svg to .jpg
video1Poster="/placeholders/hero-1.jpg"
video2Poster="/placeholders/hero-2.jpg"
```

### Phase 2: Add Real Videos (Final)
When you have your videos ready:

1. **Create videos folder:**
```bash
mkdir public/videos
```

2. **Add videos** (MP4 format recommended):
- `public/videos/hero-1.mp4`
- `public/videos/hero-2.mp4`
- etc.

3. **Update Home.tsx:**
```tsx
<VideoWipeSection
  id="hero"
  video1Poster="/placeholders/hero-1.jpg"
  video2Poster="/placeholders/hero-2.jpg"
  video1Src="/videos/hero-1.mp4"  // ← Add this line
  video2Src="/videos/hero-2.mp4"  // ← Add this line
  heading="NikHairrr"
  tagline="Luxury hair, zero compromise."
  showCTA={true}
  ctaText="Shop Bundles"
  ctaOnClick={() => navigate("/shop/bundles")}
/>
```

## 🎨 Color Palette Reference

Use these values anywhere in the site:

```css
--nh-bg: #101510         /* Deep olive-black */
--nh-bg-2: #283820       /* Dark botanical */
--nh-gold: #C8A97E       /* Champagne gold */
--nh-gold-2: #9B6B3C     /* Bronze hover */
--nh-cream: #EDEAE5      /* Headings */
--nh-text: #D9D7D0       /* Body text */
--nh-focus: #D4A373      /* Accents */
```

In TypeScript/vanilla-extract, access via:
```tsx
import { vars } from './styles/theme.css';

// Use:
vars.color.gold      // #C8A97E
vars.color.cream     // #EDEAE5
vars.color.bg        // #101510
```

## 🎬 How the Video Wipe Works

### For Modern Browsers (Chrome 115+)
- Uses **CSS View Timeline API**
- Animation is 100% scroll-locked
- Smooth as butter, zero JavaScript
- Check console for: "✅ CSS View Timeline API supported"

### For Older Browsers
- Automatic fallback using IntersectionObserver
- Simpler transition (still beautiful!)
- Check console for: "⚠️ CSS View Timeline API not supported"

## 📁 Key Files You Might Edit

### Adding More Sections
- Edit: `src/pages/Home.tsx`
- Add another `<VideoWipeSection />` component
- Create unique `id` (e.g., "look3")
- Update `timeline-scope` in wipe.css.ts if needed

### Changing Button Styles
- Edit: `src/styles/buttons.css.ts`
- Modify `btnPrimary`, `btnOutline`, etc.

### Tweaking Colors
- Edit: `src/styles/theme.css.ts`
- Change color values in `createGlobalTheme`

### Animation Timing
- Edit: `src/styles/wipe.css.ts`
- Modify `animation-range` values
- Adjust `clip-path` percentages in keyframes

## 🐛 Troubleshooting

### Videos not showing?
- Check browser console for errors
- Verify file paths are correct
- Videos need `playsinline muted loop` attributes

### Scroll animation not working?
- Check console - fallback might be active
- Ensure each section has unique `id`
- Verify timeline names match in wipe.css.ts

### Colors look wrong?
- Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+F5)
- Check vanilla-extract styles are building correctly
- Run `npm run dev` fresh

### Performance issues?
- Compress videos (aim for <5MB each)
- Use poster images for initial load
- Consider lazy loading off-screen videos

## 📊 Build for Production

```bash
npm run build
```

Output goes to `dist/` folder - ready to deploy!

## 🎯 What's Next?

1. ✅ Replace SVG placeholders with real images
2. ✅ Film/source your hero videos
3. ✅ Add video sources to Home.tsx
4. ✅ Test on mobile devices
5. ✅ Deploy and show off your luxury site! 🌟

---

## Need Help?

All code is commented and organized. Key locations:

- **Video sections**: `src/pages/Home.tsx`
- **Animation styles**: `src/styles/wipe.css.ts`
- **Button styles**: `src/styles/buttons.css.ts`
- **Color palette**: `src/styles/theme.css.ts`
- **Placeholders**: `public/placeholders/`

Everything is cosmetic - no business logic was touched! 🎨✨
