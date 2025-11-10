import { Link } from "react-router-dom";
import FooterSignature from "../components/FooterSignature";

export default function RefundPolicy() {
  return (
    <div style={{ padding: "clamp(5rem, 10vw, 6rem) clamp(1rem, 4vw, 2rem) 2rem", minHeight: "100vh", maxWidth: "900px", margin: "0 auto", color: "#e5e5e5" }}>
      <Link to="/" style={{ color: "#ffffff", textDecoration: "none", fontSize: "0.9rem", marginBottom: "2rem", display: "inline-block" }}>
        ← Back to Home
      </Link>
      
      <h1 style={{ color: "#ffffff", fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>Return & Exchange Policy</h1>
      <p style={{ fontSize: "0.9rem", color: "#999", marginBottom: "3rem" }}>Last Updated: November 10, 2025</p>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>1. Quality Assurance</h2>
        <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
          We are committed to excellence. Every product undergoes a strict quality control process before shipment to maintain the highest standards.
        </p>
        <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
          If you receive a defective or damaged product, please contact our customer service team at <strong>support@nikhairrr.com</strong> within <strong>72 hours of receiving your order</strong>. Be sure to include:
        </p>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
          <li>Clear photos of the product and packaging</li>
          <li>A detailed description of the issue</li>
        </ul>
        <p style={{ lineHeight: 1.8, marginTop: "1rem", padding: "1rem", background: "rgba(255, 152, 0, 0.1)", border: "1px solid rgba(255, 152, 0, 0.3)" }}>
          ⚠️ <strong>Important:</strong> Failure to provide photos may result in the claim being denied.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>2. Final Sale Policy</h2>
        <p style={{ lineHeight: 1.8 }}>
          All purchases are <strong>final sale</strong> and cannot be returned, refunded, or exchanged except in cases where the product does not meet our quality standards (see Section 1).
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>3. Returns for Quality Issues</h2>
        <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
          Returns are only accepted if the product is defective or does not meet our quality standards. If approved, you may be eligible for:
        </p>
        <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem", marginBottom: "1rem" }}>
          <li>A full refund to the original payment method, or</li>
          <li>A store credit for the full amount</li>
        </ul>
        <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
          In rare cases, NikHairrr may offer a refund minus a 15% restocking fee, at our discretion.
        </p>
        <p style={{ lineHeight: 1.8, padding: "1rem", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <strong>Approval Requirement:</strong> Approval for returns is contingent upon the items being returned in their original packaging, including intact and untampered hang tags, EVA bag, and NikHairrr box.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>4. Restocking Fee</h2>
        <p style={{ lineHeight: 1.8 }}>
          Any approved returns are subject to a <strong>15% restocking fee</strong>, unless the return is due to an error on our part.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>5. Order Cancellations</h2>
        <p style={{ lineHeight: 1.8 }}>
          Orders cannot be changed or canceled once submitted. Please review your order carefully before checkout.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>6. Shipping Costs</h2>
        <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
          NikHairrr does not cover return shipping costs unless the return is due to an error or a defective product.
        </p>
        <p style={{ lineHeight: 1.8 }}>
          Customers are responsible for shipping costs associated with returns.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>7. Refused & Misplaced Deliveries</h2>
        <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
          Refusing delivery does not qualify as a return. Any refused deliveries will incur a restocking fee, and original shipping costs will not be refunded.
        </p>
        <p style={{ lineHeight: 1.8 }}>
          NikHairrr is not responsible for lost, misplaced, or incorrectly delivered shipments due to customer errors.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>8. Pre-Orders</h2>
        <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
          Pre-orders are processed immediately and cannot be canceled or altered.
        </p>
        <p style={{ lineHeight: 1.8 }}>
          Shipping dates are subject to change due to order volume, supply chain delays, or other factors. We will update the product description and send email alerts regarding any changes.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>9. Delayed Orders</h2>
        <p style={{ lineHeight: 1.8 }}>
          If an order is delayed by more than <strong>30 business days</strong> from the expected shipping date, you may request a full refund to your original payment method.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>10. Import Duties</h2>
        <p style={{ lineHeight: 1.8 }}>
          Customers are responsible for any applicable import duties or taxes on international orders.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>11. Delivery and Signature Requirement for Orders Over $500</h2>
        <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
          Orders over $500 will require a signature upon delivery to confirm receipt of the product. If the recipient is unavailable to sign for the delivery, the carrier may attempt re-delivery or hold the package for pick-up.
        </p>
        <p style={{ lineHeight: 1.8 }}>
          Please ensure that someone is available to sign at the delivery address. If no one is available to sign, the delivery may be delayed, and we are not responsible for any shipping-related issues caused by the lack of signature.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>12. Policy Changes</h2>
        <p style={{ lineHeight: 1.8 }}>
          NikHairrr reserves the right to update or modify this policy at any time. Please refer to our website for the most current version.
        </p>
      </section>

      <section style={{ marginBottom: "3rem", padding: "1.5rem", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)" }}>
        <p style={{ lineHeight: 1.8, fontWeight: 600 }}>
          By completing your purchase, you acknowledge that you have read, understood, and agreed to our Return & Exchange Policy.
        </p>
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
