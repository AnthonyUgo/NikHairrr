import { useState, useEffect } from "react";
import FooterSignature from "../components/FooterSignature";
import ReviewCarousel from "../components/ReviewCarousel";
import ReviewForm from "../components/ReviewForm";
import { supabase } from "../utils/supabase";

interface Review {
  id: string;
  name: string;
  text: string;
  product: string | null;
  rating: number;
  verified: boolean;
  created_at: string;
}

export default function Testimonials() {
  const [showForm, setShowForm] = useState(false);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAllReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmitted = () => {
    setShowForm(false);
    fetchAllReviews(); // Refresh reviews after submission
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

        {showForm && <ReviewForm onSuccess={handleReviewSubmitted} />}

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
            ALL REVIEWS ({allReviews.length})
          </h3>
          
          {loading ? (
            <div style={{ 
              textAlign: "center", 
              padding: "4rem 2rem",
              color: "#999",
            }}>
              Loading reviews...
            </div>
          ) : allReviews.length === 0 ? (
            <div style={{
              padding: "4rem 2rem",
              background: "rgba(0, 0, 0, 0.9)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              textAlign: "center",
              color: "#999",
            }}>
              <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
                No reviews yet. Be the first to share your experience!
              </p>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "#ffffff",
                  border: "none",
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  letterSpacing: "0.1em",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                WRITE A REVIEW
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "1.5rem" }}>
              {allReviews.map((review) => (
                <div
                  key={review.id}
                  style={{ 
                    padding: "2rem",
                    background: "rgba(0, 0, 0, 0.9)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "0",
                    borderLeft: "4px solid #ffffff",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderLeftColor = "#9333ea";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderLeftColor = "#ffffff";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  {/* Rating Stars */}
                  <div style={{ 
                    display: "flex", 
                    gap: "0.25rem", 
                    marginBottom: "1rem",
                  }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        style={{
                          color: i < review.rating ? "#fbbf24" : "#444",
                          fontSize: "1.25rem",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Review Text */}
                  <blockquote style={{ 
                    margin: "0 0 1.5rem 0", 
                    fontStyle: "italic", 
                    fontSize: "1.1rem",
                    color: "#e5e5e5",
                    lineHeight: 1.6,
                  }}>
                    "{review.text}"
                  </blockquote>

                  {/* Reviewer Info */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}>
                    <div>
                      <div style={{
                        fontWeight: 600,
                        color: "#ffffff",
                        fontSize: "1rem",
                        marginBottom: "0.25rem",
                      }}>
                        {review.name}
                        {review.verified && (
                          <span style={{
                            marginLeft: "0.5rem",
                            fontSize: "0.75rem",
                            color: "#51cf66",
                            border: "1px solid #51cf66",
                            padding: "0.125rem 0.5rem",
                            borderRadius: "4px",
                          }}>
                            ✓ VERIFIED
                          </span>
                        )}
                      </div>
                      {review.product && (
                        <div style={{
                          fontSize: "0.85rem",
                          color: "#999",
                        }}>
                          Product: {review.product}
                        </div>
                      )}
                    </div>
                    <div style={{
                      fontSize: "0.85rem",
                      color: "#666",
                    }}>
                      {new Date(review.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <FooterSignature />
    </>
  );
}
