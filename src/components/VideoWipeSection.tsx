// src/components/VideoWipeSection.tsx
// Scroll-locked video wipe transition component with CSS View Timelines
// Each section reveals the video beneath as you scroll

import * as w from '../styles/wipe.css';
import * as b from '../styles/buttons.css';

interface VideoWipeSectionProps {
  id: string;
  heading: string;
  tagline: string;
  showCTA?: boolean;
  ctaText?: string;
  ctaOnClick?: () => void;
  // Optional: can pass custom images instead of using NH-Logo
  customImage1?: string;
  customImage2?: string;
}

export default function VideoWipeSection({
  id,
  heading,
  tagline,
  showCTA = false,
  ctaText = 'Shop Now',
  ctaOnClick,
  customImage1,
  customImage2,
}: VideoWipeSectionProps) {
  // Use NH-Logo.png by default, allow custom images for variety
  const layer1Image = customImage1 || '/NH-Logo.png';
  const layer2Image = customImage2 || '/NH-Logo.png';

  return (
    <section className={w.nhSection} id={id}>
      <div className={w.nhSticky}>
        <div className={w.nhVideoStack}>
          {/* Layer 2 - Bottom layer */}
          <div
            className={`${w.nhVideo} ${w.layer} ${w.logoLayer2} layer-2`}
            style={{
              backgroundImage: `url(${layer2Image})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'rgba(16, 21, 16, 0.5)',
            }}
          />
          
          {/* Layer 1 - Top layer */}
          <div
            className={`${w.nhVideo} ${w.layer} ${w.logoLayer1} layer-1`}
            style={{
              backgroundImage: `url(${layer1Image})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
        
        {/* Copy overlay */}
        <div className={w.nhCopy}>
          <h2 className={w.nhHeading}>{heading}</h2>
          <p className={w.nhTagline}>{tagline}</p>
          {showCTA && (
            <button className={b.btnPrimary} onClick={ctaOnClick}>
              {ctaText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
