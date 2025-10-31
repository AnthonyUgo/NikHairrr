import { useState } from "react";
import FooterSignature from "../components/FooterSignature";
import ReviewCarousel from "../components/ReviewCarousel";
import ReviewForm from "../components/ReviewForm";

export default function Testimonials() {
  const [showForm, setShowForm] = useState(false);

  const handleReviewSubmit = (review: any) => {
    console.log('New review submitted:', review);
    // In production, this would send to your backend/database
    alert('Thank you for your review! It will be published after verification.');
    setShowForm(false);
  };

  return (
    <>
      <div style={{ padding: "clamp(5rem, 10vw, 6rem) clamp(1rem, 4vw, 2rem) 4rem", color: "#e5e5e5", minHeight: "100vh", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(0.75rem, 3vw, 1.5rem)", flexWrap: "wrap" }}>
            <img 
              src="/small-logo.svg" 
              alt="NikHairrr Logo" 
              style={{ 
                height: "clamp(50px, 6vw, 80px)", 
                width: "auto",
                filter: "drop-shadow(0 0 20px rgba(242, 238, 235, 0.3))"
              }}
            />
            <h2 style={{ 
              color: "#ffffff", 
              fontSize: "clamp(1.5rem, 5vw, 3.5rem)", 
              fontWeight: 700, 
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}>
              WHAT OUR CLIENTS SAY
            </h2>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: "1rem 2rem",
              background: showForm ? "transparent" : "#ffffff",
              border: "1px solid #ffffff",
              borderRadius: "0",
              color: showForm ? "#ffffff" : "#000000",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              letterSpacing: "0.1em",
            }}
            onMouseEnter={(e) => {
              if (showForm) {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              } else {
                e.currentTarget.style.transform = "scale(1.02)";
              }
            }}
            onMouseLeave={(e) => {
              if (showForm) {
                e.currentTarget.style.background = "transparent";
              } else {
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
          >
            {showForm ? "CANCEL" : "WRITE A REVIEW"}
          </button>
        </div>

        {showForm && <ReviewForm onSubmit={handleReviewSubmit} />}

        <div style={{ marginBottom: "4rem" }}>
          <h3 style={{ 
            fontSize: "1.5rem", 
            fontWeight: 600, 
            color: "#ffffff", 
            marginBottom: "1.5rem",
            letterSpacing: "0.05em",
          }}>
            TOP RATED REVIEWS
          </h3>
          <ReviewCarousel />
        </div>

        <div style={{ marginTop: "4rem" }}>
          <h3 style={{ 
            fontSize: "1.5rem", 
            fontWeight: 600, 
            color: "#ffffff", 
            marginBottom: "1.5rem",
            letterSpacing: "0.05em",
          }}>
            ALL REVIEWS
          </h3>
          <div style={{ display: "grid", gap: "1.5rem" }}>
            <blockquote style={{ 
              margin: 0, 
              fontStyle: "italic", 
              fontSize: "1.1rem",
              padding: "2rem",
              background: "rgba(0, 0, 0, 0.9)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "0",
              borderLeft: "4px solid #ffffff",
              color: "#e5e5e5",
              lineHeight: 1.6,
            }}>
              "NikHairrr products transformed my curls - the quality is unmatched!"
            </blockquote>
            
            <blockquote style={{ 
              margin: 0, 
              fontStyle: "italic", 
              fontSize: "1.1rem",
              padding: "2rem",
              background: "rgba(0, 0, 0, 0.9)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "0",
              borderLeft: "4px solid #ffffff",
              color: "#e5e5e5",
              lineHeight: 1.6,
            }}>
              "Best salon experience I have ever had. Professional service and amazing results!"
            </blockquote>
          </div>
        </div>
      </div>
      
      <FooterSignature />
    </>
  );
}
