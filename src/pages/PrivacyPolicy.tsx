import { Link } from "react-router-dom";
import FooterSignature from "../components/FooterSignature";

export default function PrivacyPolicy() {
  return (
    <div style={{ padding: "clamp(5rem, 10vw, 6rem) clamp(1rem, 4vw, 2rem) 2rem", minHeight: "100vh", maxWidth: "900px", margin: "0 auto", color: "#e5e5e5" }}>
      <Link to="/" style={{ color: "#ffffff", textDecoration: "none", fontSize: "0.9rem", marginBottom: "2rem", display: "inline-block" }}>
        ← Back to Home
      </Link>
      
      <h1 style={{ color: "#ffffff", fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>Privacy Policy</h1>
      <p style={{ fontSize: "0.9rem", color: "#999", marginBottom: "3rem" }}>Last Updated: November 9, 2025</p>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>1. Information We Collect</h2>
        <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
          We collect information that you provide directly to us, including:
        </p>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
          <li>Name, email address, phone number, and shipping address</li>
          <li>Payment information (processed securely through Stripe)</li>
          <li>Order history and preferences</li>
          <li>Reviews and testimonials</li>
          <li>Communications with us</li>
        </ul>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>2. How We Use Your Information</h2>
        <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
          We use the information we collect to:
        </p>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
          <li>Process and fulfill your orders</li>
          <li>Communicate with you about your orders</li>
          <li>Send promotional emails (with your consent)</li>
          <li>Improve our products and services</li>
          <li>Prevent fraud and ensure security</li>
        </ul>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>3. Information Sharing</h2>
        <p style={{ lineHeight: 1.8 }}>
          We do not sell your personal information. We may share your information with:
        </p>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
          <li><strong>Payment processors:</strong> Stripe and MvmntPay for payment processing</li>
          <li><strong>Shipping carriers:</strong> To deliver your orders</li>
          <li><strong>Service providers:</strong> Who assist with our business operations</li>
          <li><strong>Legal requirements:</strong> When required by law</li>
        </ul>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>4. Cookies and Tracking</h2>
        <p style={{ lineHeight: 1.8 }}>
          We use cookies and similar technologies to improve your experience. We use:
        </p>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
          <li><strong>Essential cookies:</strong> Required for the website to function</li>
          <li><strong>Analytics cookies:</strong> To understand how you use our site</li>
          <li><strong>Marketing cookies:</strong> To show relevant ads (with your consent)</li>
        </ul>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>5. Your Rights</h2>
        <p style={{ lineHeight: 1.8 }}>
          You have the right to:
        </p>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt-out of marketing communications</li>
          <li>Object to processing of your information</li>
        </ul>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>6. Data Security</h2>
        <p style={{ lineHeight: 1.8 }}>
          We implement appropriate security measures to protect your information. However, no method of transmission over the Internet is 100% secure.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>7. Children's Privacy</h2>
        <p style={{ lineHeight: 1.8 }}>
          Our services are not intended for children under 13. We do not knowingly collect information from children.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>8. Contact Us</h2>
        <p style={{ lineHeight: 1.8 }}>
          For privacy questions or concerns, contact us at:<br />
          Email: privacy@nikhairrr.com<br />
          Phone: (713) XXX-XXXX
        </p>
      </section>

      <FooterSignature />
    </div>
  );
}
