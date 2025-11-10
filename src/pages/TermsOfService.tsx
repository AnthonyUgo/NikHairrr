import { Link } from "react-router-dom";
import FooterSignature from "../components/FooterSignature";

export default function TermsOfService() {
  return (
    <div style={{ padding: "clamp(5rem, 10vw, 6rem) clamp(1rem, 4vw, 2rem) 2rem", minHeight: "100vh", maxWidth: "900px", margin: "0 auto", color: "#e5e5e5" }}>
      <Link to="/" style={{ color: "#ffffff", textDecoration: "none", fontSize: "0.9rem", marginBottom: "2rem", display: "inline-block" }}>
        ← Back to Home
      </Link>
      
      <h1 style={{ color: "#ffffff", fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>Terms of Service</h1>
      <p style={{ fontSize: "0.9rem", color: "#999", marginBottom: "3rem" }}>Last Updated: November 9, 2025</p>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>1. Agreement to Terms</h2>
        <p style={{ lineHeight: 1.8 }}>
          By accessing or using NikHairrr.com, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>2. Products and Services</h2>
        <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
          NikHairrr offers premium hair products including:
        </p>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
          <li>Hair bundles (Brazilian, Peruvian, Malaysian)</li>
          <li>Lace closures and frontals</li>
          <li>Custom wigs</li>
          <li>Hair care accessories</li>
        </ul>
        <p style={{ lineHeight: 1.8, marginTop: "1rem" }}>
          All products are 100% single donor raw human hair unless otherwise stated.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>3. Pricing and Payment</h2>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
          <li>All prices are in USD and subject to change without notice</li>
          <li>A 2.94% platform processing fee is added at checkout</li>
          <li>Payment is processed securely through Stripe and MvmntPay</li>
          <li>We accept major credit cards and debit cards</li>
          <li>Full payment is required before order fulfillment</li>
        </ul>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>4. Shipping and Delivery</h2>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
          <li><strong>Houston, TX:</strong> Free local delivery/pickup available</li>
          <li><strong>United States:</strong> Standard shipping rates apply</li>
          <li><strong>Processing time:</strong> 1-3 business days</li>
          <li><strong>Delivery time:</strong> 3-7 business days (domestic)</li>
          <li>Tracking information will be provided once shipped</li>
          <li>We are not responsible for delays caused by shipping carriers</li>
        </ul>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>5. Returns and Refunds</h2>
        <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
          See our <Link to="/refund-policy" style={{ color: "#ffffff", textDecoration: "underline" }}>Refund Policy</Link> for complete details.
        </p>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
          <li>Returns accepted within 7 days of delivery</li>
          <li>Products must be unused and in original packaging</li>
          <li>Custom/colored items are non-refundable</li>
          <li>Customer pays return shipping costs</li>
        </ul>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>6. Product Quality and Care</h2>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
          <li>Products are guaranteed to be 100% authentic virgin hair</li>
          <li>Quality assurance covers manufacturing defects only</li>
          <li>All claims must be reported within 72 hours of delivery with photographic evidence</li>
          <li>Improper care or chemical alterations void quality guarantee</li>
          <li>Care instructions provided with each order</li>
        </ul>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>7. Prohibited Uses</h2>
        <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
          You may not use our site:
        </p>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
          <li>For any unlawful purpose</li>
          <li>To solicit others to perform unlawful acts</li>
          <li>To violate any international, federal, or state regulations</li>
          <li>To infringe upon intellectual property rights</li>
          <li>To upload viruses or malicious code</li>
          <li>To attempt unauthorized access to our systems</li>
        </ul>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>8. Intellectual Property</h2>
        <p style={{ lineHeight: 1.8 }}>
          All content on this site, including text, graphics, logos, images, and software, is the property of NikHairrr and protected by copyright and trademark laws. Unauthorized use is prohibited.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>9. Limitation of Liability</h2>
        <p style={{ lineHeight: 1.8 }}>
          NikHairrr shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our products or services. Our total liability shall not exceed the amount paid for the product in question.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>10. Governing Law</h2>
        <p style={{ lineHeight: 1.8 }}>
          These terms are governed by the laws of the State of Texas, United States. Any disputes shall be resolved in the courts of Harris County, Texas.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>11. Changes to Terms</h2>
        <p style={{ lineHeight: 1.8 }}>
          We reserve the right to modify these terms at any time. Changes become effective immediately upon posting. Continued use of the site constitutes acceptance of modified terms.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>12. Contact Information</h2>
        <p style={{ lineHeight: 1.8 }}>
          For questions about these Terms of Service, contact us at:<br />
          Email: support@nikhairrr.com<br />
          Phone: (713) XXX-XXXX<br />
          Address: Houston, TX
        </p>
      </section>

      <FooterSignature />
    </div>
  );
}
