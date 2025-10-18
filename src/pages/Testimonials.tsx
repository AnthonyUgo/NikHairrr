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
      <div style={{ padding: "6rem 2rem 4rem", color: "#D9D7D0", minHeight: "100vh", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
          <h2 style={{ 
            color: "#EDEAE5", 
            fontSize: "2.5rem", 
            fontWeight: 700, 
            background: "linear-gradient(135deg, #C8A97E 0%, #EDEAE5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            What Our Clients Say
          </h2>
          
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: "0.75rem 1.5rem",
              background: showForm ? "transparent" : "#C8A97E",
              border: `1px solid #C8A97E`,
              borderRadius: "999px",
              color: showForm ? "#C8A97E" : "#101510",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (!showForm) {
                e.currentTarget.style.background = "#9B6B3C";
              }
            }}
            onMouseLeave={(e) => {
              if (!showForm) {
                e.currentTarget.style.background = "#C8A97E";
              }
            }}
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        </div>

        {showForm && <ReviewForm onSubmit={handleReviewSubmit} />}

        <div style={{ marginBottom: "4rem" }}>
          <h3 style={{ 
            fontSize: "1.5rem", 
            fontWeight: 600, 
            color: "#EDEAE5", 
            marginBottom: "1.5rem",
            opacity: 0.9,
          }}>
            Top Rated Reviews
          </h3>
          <ReviewCarousel />
        </div>

        <div style={{ marginTop: "4rem" }}>
          <h3 style={{ 
            fontSize: "1.5rem", 
            fontWeight: 600, 
            color: "#EDEAE5", 
            marginBottom: "1.5rem",
            opacity: 0.9,
          }}>
            All Reviews
          </h3>
          <div style={{ display: "grid", gap: "1.5rem" }}>
            <blockquote style={{ 
              margin: 0, 
              fontStyle: "italic", 
              fontSize: "1.1rem",
              padding: "1.5rem",
              background: "rgba(16, 21, 16, 0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(200, 169, 126, 0.3)",
              borderRadius: "12px",
              borderLeft: "4px solid #C8A97E",
              color: "#D9D7D0",
              lineHeight: 1.6,
            }}>
              "NikHairrr products transformed my curls - the quality is unmatched!"
            </blockquote>
            
            <blockquote style={{ 
              margin: 0, 
              fontStyle: "italic", 
              fontSize: "1.1rem",
              padding: "1.5rem",
              background: "rgba(16, 21, 16, 0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(200, 169, 126, 0.3)",
              borderRadius: "12px",
              borderLeft: "4px solid #C8A97E",
              color: "#D9D7D0",
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
