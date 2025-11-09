import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FooterSignature from "../components/FooterSignature";

type ServiceItem = {
  name: string;
  description: string;
  price: string;
  priceNote?: string;
};

type ServiceCategory = {
  category: string;
  items: ServiceItem[];
};

export default function Services() {
  const navigate = useNavigate();

  const services: ServiceCategory[] = [
    {
      category: "Wigging Services",
      items: [
        {
          name: "3 Bundles and Closure",
          description: "Professional wig construction with 3 bundles and closure",
          price: "$35"
        },
        {
          name: "Extra Bundles (Each)",
          description: "Additional bundle installation",
          price: "$10"
        },
        {
          name: "Frontal Customization (Bleached Knots & Light Plucking)",
          description: "Professional frontal customization for natural hairline",
          price: "$20"
        }
      ]
    },
    {
      category: "Coloring Services",
      items: [
        {
          name: "Jet Black",
          description: "Rich jet black color application",
          price: "$30/BD",
          priceNote: "per bundle"
        },
        {
          name: "Browns/Brunettes",
          description: "Warm brown and brunette tones",
          price: "$35/BD",
          priceNote: "per bundle"
        },
        {
          name: "Blondes",
          description: "Beautiful blonde color transformation",
          price: "$50/BD",
          priceNote: "per bundle"
        },
        {
          name: "Reds/Gingers",
          description: "Vibrant red and ginger tones",
          price: "$50/BD",
          priceNote: "per bundle"
        }
      ]
    }
  ];

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
      color: "#e5e5e5",
    }}>
      <div style={{ 
        padding: "clamp(5rem, 10vw, 6rem) clamp(1rem, 4vw, 2rem) 2rem",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "#ffffff",
            padding: "0.75rem 1.5rem",
            fontSize: "0.9rem",
            fontWeight: 500,
            letterSpacing: "0.05em",
            cursor: "pointer",
            transition: "all 0.3s ease",
            marginBottom: "3rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <FiArrowLeft /> BACK TO HOME
        </button>

        {/* Header */}
        <div style={{ marginBottom: "4rem", textAlign: "center" }}>
          <h1 style={{ 
            color: "#ffffff", 
            fontSize: "clamp(2rem, 6vw, 3.5rem)", 
            fontWeight: 700,
            marginBottom: "1rem",
            letterSpacing: "0.1em",
          }}>
            SERVICES
          </h1>
          <p style={{ 
            color: "#e5e5e5", 
            fontSize: "clamp(1rem, 2vw, 1.2rem)", 
            opacity: 0.8,
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            Professional hair customization services to complete your look. Add these services to your bundle purchase for the perfect finish.
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 500px), 1fr))",
          gap: "3rem",
          marginBottom: "4rem",
        }}>
          {services.map((serviceCategory, idx) => (
            <div 
              key={idx}
              style={{
                background: "rgba(0, 0, 0, 0.9)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "0",
                padding: "2.5rem",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.8)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
              }}
            >
              <h2 style={{
                color: "#ffffff",
                fontSize: "1.8rem",
                fontWeight: 700,
                marginBottom: "2rem",
                letterSpacing: "0.05em",
                borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
                paddingBottom: "1rem",
              }}>
                {serviceCategory.category}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {serviceCategory.items.map((service, serviceIdx) => (
                  <div 
                    key={serviceIdx}
                    style={{
                      padding: "1.5rem",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    }}
                  >
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "flex-start",
                      marginBottom: "0.5rem",
                      gap: "1rem",
                      flexWrap: "wrap",
                    }}>
                      <h3 style={{
                        color: "#ffffff",
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        margin: 0,
                        letterSpacing: "0.03em",
                      }}>
                        {service.name}
                      </h3>
                      <div style={{ textAlign: "right" }}>
                        <div style={{
                          color: "#ffffff",
                          fontSize: "1.3rem",
                          fontWeight: 700,
                        }}>
                          {service.price}
                        </div>
                        {service.priceNote && (
                          <div style={{
                            color: "#999",
                            fontSize: "0.75rem",
                            marginTop: "0.25rem",
                            letterSpacing: "0.05em",
                          }}>
                            {service.priceNote}
                          </div>
                        )}
                      </div>
                    </div>
                    <p style={{
                      color: "#e5e5e5",
                      fontSize: "0.95rem",
                      opacity: 0.8,
                      margin: 0,
                      lineHeight: 1.5,
                    }}>
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note Section */}
        <div style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          padding: "2rem",
          marginBottom: "3rem",
        }}>
          <h3 style={{
            color: "#ffffff",
            fontSize: "1.3rem",
            fontWeight: 600,
            marginBottom: "1rem",
            letterSpacing: "0.05em",
          }}>
            Important Notes
          </h3>
          <ul style={{
            color: "#e5e5e5",
            fontSize: "1rem",
            lineHeight: 1.8,
            opacity: 0.9,
            paddingLeft: "1.5rem",
            margin: 0,
          }}>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>BD</strong> = Per Bundle pricing
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              Services must be requested at the time of purchase
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              Processing time may vary based on service selection
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              Contact us for custom color requests or bulk service orders
            </li>
            <li>
              Wigging services are available for bundle purchases only
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <button
            onClick={() => navigate("/shop")}
            style={{
              background: "#ffffff",
              border: "none",
              padding: "1.25rem 3rem",
              color: "#000000",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              letterSpacing: "0.1em",
              boxShadow: "0 4px 20px rgba(255, 255, 255, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(255, 255, 255, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(255, 255, 255, 0.3)";
            }}
          >
            SHOP PRODUCTS
          </button>
        </div>

      </div>
      
      <FooterSignature />
    </div>
  );
}
