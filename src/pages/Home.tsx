// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import FooterSignature from "../components/FooterSignature";
import * as w from "../styles/wipe.css";
import * as buttonStyles from "../styles/buttons.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className={`${w.scrollLayout} scrollLayout`}>
        {/* Fixed media box - center right of page */}
        <div className={w.mediaBox}>
          <div className={`${w.logoContainer} logoContainer`}>
            <img src="/NH-Logo.svg" alt="NikHairrr" className={w.logoImage} />
          </div>
        </div>

        {/* Scrolling text content - left side */}
        <div className={w.scrollContent}>
          <section className={`${w.contentSection} contentSection`}>
            <img 
              src="/Logo.svg" 
              alt="NikHairrr" 
              style={{ 
                width: "min(400px, 80%)",
                height: "auto",
                marginBottom: "2rem",
              }}
            />
            <p className={w.sectionTagline}>Luxury hair, zero compromise.</p>
            <button 
              className={`${buttonStyles.btnSecondary} btnSecondary`}
              onClick={() => navigate('/shop/bundles')}
            >
              Shop Bundles
            </button>
          </section>

          <section className={`${w.contentSection} contentSection`}>
            <h2 className={w.sectionHeading}>Everyday Luxury</h2>
            <p className={w.sectionTagline}>Bundles, frontals, and wigs that actually last.</p>
            <p className={w.sectionBody}>
              Since 2026, we've been crafting premium hair extensions that redefine luxury. 
              Every bundle is ethically sourced and designed to maintain its beauty through countless styles.
            </p>
          </section>

          <section className={`${w.contentSection} contentSection`}>
            <h2 className={w.sectionHeading}>Editorial Finish</h2>
            <p className={w.sectionTagline}>Natural opulence, salon-grade quality.</p>
            <p className={w.sectionBody}>
              Our signature finish delivers the movement and shine you see in editorial shoots. 
              Professional-grade quality that transforms your look instantly.
            </p>
            <button 
              className={`${buttonStyles.btnPrimary} btnPrimary`}
              onClick={() => navigate('/shop')}
            >
              Explore All
            </button>
          </section>
        </div>
      </div>
      
      <FooterSignature />
    </>
  );
}
