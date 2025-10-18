# Video Placeholders

This folder contains placeholder images (posters) for the video wipe transitions.

## Structure

Each video section requires TWO poster images:
- **Layer 1 (top)**: The video that wipes away
- **Layer 2 (bottom)**: The video that gets revealed

## Current Placeholders Needed

### Hero Section
- `hero-1.jpg` - Top layer (wipes away)
- `hero-2.jpg` - Bottom layer (revealed)

### Look 1 Section (Everyday Luxury)
- `look1-1.jpg` - Top layer (wipes away)
- `look1-2.jpg` - Bottom layer (revealed)

### Look 2 Section (Editorial Finish)
- `look2-1.jpg` - Top layer (wipes away)
- `look2-2.jpg` - Bottom layer (revealed)

## Adding Real Videos Later

When you have the final videos:

1. Replace poster images with high-quality stills from your videos
2. Add video sources to the VideoWipeSection component:
   - Update `video1Src` prop with actual video path (MP4/WebM)
   - Update `video2Src` prop with actual video path
3. Ensure videos are optimized for web (compressed, proper codecs)
4. Consider adding multiple formats for browser compatibility

## Recommended Image Specs
- **Aspect ratio**: 16:9
- **Resolution**: 1920x1080 or higher
- **Format**: JPG or WebP
- **Quality**: High (minimal compression for luxury feel)
