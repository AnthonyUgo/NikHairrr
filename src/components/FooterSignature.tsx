// src/components/FooterSignature.tsx
import * as styles from './FooterSignature.css';

export default function FooterSignature() {
  return (
    <div className={styles.signatureContainer}>
      <img 
        src="/small-logo.svg" 
        alt="NikHairrr signature" 
        className={styles.signatureLogo}
      />
    </div>
  );
}
