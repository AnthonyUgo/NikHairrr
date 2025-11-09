// src/components/FooterSignature.tsx
import { Link } from "react-router-dom";
import * as styles from './FooterSignature.css';

export default function FooterSignature() {
  return (
    <>
      <div className={styles.signatureContainer}>
        <img 
          src="/small-logo.svg" 
          alt="NikHairrr signature" 
          className={styles.signatureLogo}
        />
      </div>
      
      {/* Legal Footer */}
      <footer style={{
        marginTop: "4rem",
        paddingTop: "2rem",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        textAlign: "center",
        color: "#999",
        fontSize: "0.85rem",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}>
          <Link to="/privacy-policy" style={{ color: "#999", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#ffffff"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#999"}>
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" style={{ color: "#999", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#ffffff"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#999"}>
            Terms of Service
          </Link>
          <Link to="/refund-policy" style={{ color: "#999", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#ffffff"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#999"}>
            Refund Policy
          </Link>
        </div>
        <p style={{ margin: "0.5rem 0" }}>
          © {new Date().getFullYear()} NikHairrr. All rights reserved.
        </p>
        <p style={{ margin: "0.5rem 0", fontSize: "0.75rem" }}>
          Houston, Texas | Premium Single Donor Raw Hair
        </p>
      </footer>
    </>
  );
}
