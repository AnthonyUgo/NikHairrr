import { Link } from "react-router-dom";
import FooterSignature from "../components/FooterSignature";

export default function RefundPolicy() {
  return (
    <div style={{ padding: "clamp(5rem, 10vw, 6rem) clamp(1rem, 4vw, 2rem) 2rem", minHeight: "100vh", maxWidth: "900px", margin: "0 auto", color: "#e5e5e5" }}>
      <Link to="/" style={{ color: "#ffffff", textDecoration: "none", fontSize: "0.9rem", marginBottom: "2rem", display: "inline-block" }}>
        ← Back to Home
      </Link>
      
      <h1 style={{ color: "#ffffff", fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>Refund Policy</h1>
      <p style={{ fontSize: "0.9rem", color: "#999", marginBottom: "3rem" }}>Last Updated: November 9, 2025</p>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>Return Window</h2>
        <p style={{ lineHeight: 1.8 }}>
          We accept returns within <strong>7 days of delivery</strong> for eligible products. To be eligible for a return, items must be:
        </p>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem", marginTop: "1rem" }}>
          <li>Unused and unworn</li>
          <li>In original packaging with all tags attached</li>
          <li>Not washed, colored, or chemically treated</li>
          <li>Free from any odors (smoke, perfume, etc.)</li>
        </ul>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>Non-Refundable Items</h2>
        <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
          The following items are <strong>final sale</strong> and cannot be returned or exchanged:
        </p>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
          <li>Custom-colored hair</li>
          <li>Custom-cut or styled wigs</li>
          <li>Sale or clearance items</li>
          <li>Items worn or installed</li>
          <li>Items without original packaging</li>
          <li>Gift cards</li>
        </ul>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>Return Process</h2>
        <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
          To initiate a return:
        </p>
        <ol style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
          <li>Contact us at <strong>returns@nikhairrr.com</strong> within 7 days of delivery</li>
          <li>Provide your order number and reason for return</li>
          <li>Wait for return authorization (RMA) number</li>
          <li>Ship the item back using a trackable shipping method</li>
          <li>Include the RMA number on the package</li>
        </ol>
        <p style={{ lineHeight: 1.8, marginTop: "1rem", padding: "1rem", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
          ⚠️ <strong>Important:</strong> Returns without an RMA number will not be accepted.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>Return Shipping Costs</h2>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
          <li><strong>Customer error:</strong> Customer pays return shipping</li>
          <li><strong>Our error or defective product:</strong> We pay return shipping</li>
          <li><strong>Exchanges:</strong> We cover shipping for exchanges on defective items</li>
        </ul>
        <p style={{ lineHeight: 1.8, marginTop: "1rem" }}>
          Return shipping address will be provided with your RMA number.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>Refund Processing</h2>
        <p style={{ lineHeight: 1.8 }}>
          Once we receive and inspect your return:
        </p>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem", marginTop: "1rem" }}>
          <li><strong>Inspection time:</strong> 2-3 business days</li>
          <li><strong>Refund processing:</strong> 5-10 business days</li>
          <li><strong>Refund method:</strong> Original payment method</li>
          <li><strong>Shipping costs:</strong> Original shipping fees are non-refundable</li>
          <li><strong>Platform fees:</strong> Non-refundable (2.94%)</li>
        </ul>
        <p style={{ lineHeight: 1.8, marginTop: "1rem" }}>
          You will receive an email confirmation once your refund is processed.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>Exchanges</h2>
        <p style={{ lineHeight: 1.8 }}>
          We accept exchanges for:
        </p>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem", marginTop: "1rem" }}>
          <li>Different sizes (subject to availability)</li>
          <li>Defective or damaged products</li>
          <li>Incorrect items shipped</li>
        </ul>
        <p style={{ lineHeight: 1.8, marginTop: "1rem" }}>
          To request an exchange, follow the same return process and specify your exchange preference.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>Damaged or Defective Products</h2>
        <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
          If you receive a damaged or defective product:
        </p>
        <ol style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
          <li>Contact us immediately at <strong>support@nikhairrr.com</strong></li>
          <li>Provide photos/videos of the damage or defect</li>
          <li>Include your order number</li>
          <li>We will arrange for a replacement or full refund</li>
        </ol>
        <p style={{ lineHeight: 1.8, marginTop: "1rem", padding: "1rem", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
          📸 <strong>Tip:</strong> Take photos/videos when unboxing to document any shipping damage.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>Lost or Stolen Packages</h2>
        <p style={{ lineHeight: 1.8 }}>
          We are not responsible for packages marked as "delivered" by the carrier. Please:
        </p>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem", marginTop: "1rem" }}>
          <li>Check with neighbors or building management</li>
          <li>Verify the shipping address</li>
          <li>File a claim with the shipping carrier</li>
          <li>Contact us if the package cannot be located</li>
        </ul>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>Warranty</h2>
        <p style={{ lineHeight: 1.8 }}>
          All NikHairrr products are covered by our quality guarantee:
        </p>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem", marginTop: "1rem" }}>
          <li><strong>Coverage:</strong> Manufacturing defects and quality issues</li>
          <li><strong>Duration:</strong> 30 days from delivery</li>
          <li><strong>Not covered:</strong> Improper care, chemical damage, or misuse</li>
          <li><strong>Claim process:</strong> Email warranty@nikhairrr.com with proof of purchase</li>
        </ul>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>Store Credit</h2>
        <p style={{ lineHeight: 1.8 }}>
          As an alternative to refunds, we offer store credit:
        </p>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem", marginTop: "1rem" }}>
          <li><strong>110% value:</strong> Get 10% extra as store credit</li>
          <li><strong>No expiration:</strong> Use anytime on future purchases</li>
          <li><strong>Transferable:</strong> Can be shared with friends/family</li>
        </ul>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>Contact Us</h2>
        <p style={{ lineHeight: 1.8 }}>
          For returns and refund questions:<br />
          Email: returns@nikhairrr.com<br />
          Support: support@nikhairrr.com<br />
          Phone: (713) XXX-XXXX<br />
          Hours: Monday-Friday, 9AM-6PM CST
        </p>
      </section>

      <FooterSignature />
    </div>
  );
}
