// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../utils/supabase";
import ReviewCarousel from "../components/ReviewCarousel";
import MembershipBanner from "../components/MembershipBanner";
import { fadeInScale, float } from "../styles/app.css";

export default function Home() {
  const navigate = useNavigate();
  const [showSubscribeSuccess, setShowSubscribeSuccess] = useState(false);
  const { user } = useAuth();
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      {/* Membership Popup */}
      <MembershipBanner />
      
      {/* Subscribe Success Message */}
      {showSubscribeSuccess && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          background: "rgba(0, 0, 0, 0.98)",
          border: "2px solid #ffffff",
          padding: "3rem 4rem",
          textAlign: "center",
          animation: `${fadeInScale} 0.5s cubic-bezier(0.4, 0, 0.2, 1)`,
          maxWidth: "90vw",
          boxShadow: "0 0 60px rgba(255, 255, 255, 0.3)",
        }}>
          {/* Close button */}
          <button
            onClick={() => setShowSubscribeSuccess(false)}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#ffffff",
              width: "32px",
              height: "32px",
              fontSize: "1.25rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.transform = "rotate(90deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
          >
            ×
          </button>
          
          <div style={{
            fontSize: "4rem",
            marginBottom: "1rem",
            animation: `${float} 2s ease-in-out infinite`,
          }}>
            ✦
          </div>
          <h2 style={{
            color: "#ffffff",
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            marginBottom: "1rem",
          }}>
            {user ? 'WELCOME TO THE FAMILY!' : 'THANK YOU FOR SUBSCRIBING!'}
          </h2>
          <p style={{
            color: "#e5e5e5",
            fontSize: "1.1rem",
            lineHeight: 1.6,
            marginBottom: "1.5rem",
          }}>
            {user ? (
              <>
                You're now part of our exclusive community.<br />
                <strong style={{ color: "#51cf66" }}>+50 loyalty points added to your account!</strong><br />
                Get ready for luxury hair updates, styling tips, and special offers.
              </>
            ) : (
              <>
                Get ready for luxury hair updates, styling tips, and special offers.<br />
                <strong style={{ color: "#ffffff", marginTop: "1rem", display: "block" }}>
                  Want to earn loyalty points?
                </strong>
              </>
            )}
          </p>
          {user ? (
            <button
              onClick={() => {
                setShowSubscribeSuccess(false);
                navigate('/member/dashboard');
              }}
              style={{
                display: "inline-block",
                padding: "0.75rem 2rem",
                background: "#ffffff",
                color: "#000000",
                border: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                letterSpacing: "0.1em",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              VIEW YOUR POINTS
            </button>
          ) : (
            <button
              onClick={() => {
                setShowSubscribeSuccess(false);
                // Scroll to top and trigger auth modal (you'll need to pass this function down)
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => {
                  const signInBtn = document.querySelector('[data-auth-trigger]') as HTMLElement;
                  signInBtn?.click();
                }, 500);
              }}
              style={{
                display: "inline-block",
                padding: "0.75rem 2rem",
                background: "#ffffff",
                color: "#000000",
                border: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                letterSpacing: "0.1em",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              CREATE ACCOUNT & EARN POINTS
            </button>
          )}
          <p style={{
            color: "#666",
            fontSize: "0.85rem",
            marginTop: "1.5rem",
          }}>
            {user 
              ? "Check your email for exclusive updates!" 
              : "Members earn points on every purchase and get exclusive perks!"}
          </p>
        </div>
      )}

      {/* Backdrop overlay for success message */}
      {showSubscribeSuccess && (
        <div
          onClick={() => setShowSubscribeSuccess(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.7)",
            zIndex: 999,
          }}
        />
      )}
      
      {/* Hero Section */}
      <section style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(3rem, 6vw, 4rem) clamp(1rem, 5vw, 2rem)",
        position: "relative",
      }}>

        <div style={{
          maxWidth: "1400px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
          gap: "clamp(2rem, 4vw, 4rem)",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}>
          {/* Left Content */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}>
            <div>
              <h1 style={{
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                marginBottom: "1.5rem",
              }}>
                LUXURY<br/>REDEFINED
              </h1>
              <p style={{
                fontSize: "1.25rem",
                color: "#e5e5e5",
                lineHeight: 1.6,
                opacity: 0.9,
                maxWidth: "500px",
              }}>
                100% single donor raw hair extensions crafted for those who refuse to compromise on quality.
              </p>
            </div>

            {/* Modern Button Group */}
            <div style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}>
              <button
                onClick={() => navigate('/shop')}
                style={{
                  padding: "1.25rem 3rem",
                  background: "#ffffff",
                  color: "#000000",
                  border: "none",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(255, 255, 255, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                SHOP NOW
              </button>
              
              <button
                onClick={() => navigate('/shop/bundles')}
                style={{
                  padding: "1.25rem 3rem",
                  background: "transparent",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                }}
              >
                VIEW BUNDLES
              </button>
            </div>

            {/* Feature Tags */}
            <div style={{
              display: "flex",
              gap: "2rem",
              marginTop: "2rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              flexWrap: "wrap",
              justifyContent: "center",
            }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#666", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
                  QUALITY
                </div>
                <div style={{ fontSize: "1rem", color: "#ffffff", fontWeight: 600 }}>
                  100% Raw Hair
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#666", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
                  SHIPPING
                </div>
                <div style={{ fontSize: "1rem", color: "#ffffff", fontWeight: 600 }}>
                  Calculated at Checkout
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#666", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
                  GUARANTEE
                </div>
                <div style={{ fontSize: "1rem", color: "#ffffff", fontWeight: 600 }}>
                  Lifetime Quality
                </div>
              </div>
            </div>
          </div>

          {/* Right - Logo Display */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}>
            <div style={{
              width: "100%",
              maxWidth: "600px",
              aspectRatio: "1",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4rem",
              position: "relative",
            }}>
              {/* Decorative corner elements */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "40px",
                height: "40px",
                borderTop: "2px solid rgba(255, 255, 255, 0.3)",
                borderLeft: "2px solid rgba(255, 255, 255, 0.3)",
              }} />
              <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "40px",
                height: "40px",
                borderTop: "2px solid rgba(255, 255, 255, 0.3)",
                borderRight: "2px solid rgba(255, 255, 255, 0.3)",
              }} />
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "40px",
                height: "40px",
                borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
                borderLeft: "2px solid rgba(255, 255, 255, 0.3)",
              }} />
              <div style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "40px",
                height: "40px",
                borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
                borderRight: "2px solid rgba(255, 255, 255, 0.3)",
              }} />
              
              <img 
                src="/small-logo.svg" 
                alt="NikHairrr"
                loading="eager"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "500px",
                  margin: "0 auto",
                  filter: "drop-shadow(0 0 40px rgba(255, 255, 255, 0.1))",
                }}
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: "absolute",
          bottom: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0.4,
        }}>
          <div style={{
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            color: "#ffffff",
          }}>
            SCROLL
          </div>
          <div style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.5), transparent)",
          }} />
        </div>
      </section>

      {/* Stylish Image Section with Parallax Effect */}
      <section style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 2rem",
        position: "relative",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      }}>
        
        <div style={{
          maxWidth: "1400px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))",
          gap: "4rem",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}>
          {/* Image with decorative frame */}
          <div style={{
            position: "relative",
            aspectRatio: "3/4",
            maxHeight: "80vh",
          }}>
            {/* Decorative border frame */}
            <div style={{
              position: "absolute",
              inset: "-20px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              pointerEvents: "none",
              zIndex: 2,
            }}>
              {/* Corner accents */}
              <div style={{
                position: "absolute",
                top: "-1px",
                left: "-1px",
                width: "60px",
                height: "60px",
                borderTop: "3px solid rgba(255, 255, 255, 0.4)",
                borderLeft: "3px solid rgba(255, 255, 255, 0.4)",
              }} />
              <div style={{
                position: "absolute",
                top: "-1px",
                right: "-1px",
                width: "60px",
                height: "60px",
                borderTop: "3px solid rgba(255, 255, 255, 0.4)",
                borderRight: "3px solid rgba(255, 255, 255, 0.4)",
              }} />
              <div style={{
                position: "absolute",
                bottom: "-1px",
                left: "-1px",
                width: "60px",
                height: "60px",
                borderBottom: "3px solid rgba(255, 255, 255, 0.4)",
                borderLeft: "3px solid rgba(255, 255, 255, 0.4)",
              }} />
              <div style={{
                position: "absolute",
                bottom: "-1px",
                right: "-1px",
                width: "60px",
                height: "60px",
                borderBottom: "3px solid rgba(255, 255, 255, 0.4)",
                borderRight: "3px solid rgba(255, 255, 255, 0.4)",
              }} />
            </div>
            
            <div style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              position: "relative",
            }}>
              <img 
                src="/images/nh_2.JPG"
                alt="NikHairrr Luxury Hair"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.9) contrast(1.1)",
                  transition: "transform 0.4s ease-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
              {/* Gradient overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)",
                pointerEvents: "none",
              }} />
            </div>
            
            {/* Floating label */}
            <div style={{
              position: "absolute",
              bottom: "-10px",
              right: "-10px",
              background: "#ffffff",
              color: "#000000",
              padding: "1rem 2rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              zIndex: 3,
            }}>
              LUXURY EDITION
            </div>
          </div>
          
          {/* Text Content */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}>
            <div>
              <div style={{
                fontSize: "0.85rem",
                color: "#666",
                letterSpacing: "0.2em",
                marginBottom: "1rem",
              }}>
                SIGNATURE COLLECTION
              </div>
              <h2 style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "1.5rem",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}>
                DEFINING<br/>ELEGANCE
              </h2>
              <p style={{
                fontSize: "1.15rem",
                color: "#e5e5e5",
                lineHeight: 1.8,
                marginBottom: "2rem",
                opacity: 0.9,
              }}>
                Where artistry meets authenticity. Our signature pieces embody 
                the perfect blend of natural beauty and refined craftsmanship, 
                designed to make you feel extraordinary every single day.
              </p>
            </div>
            
            {/* Feature highlights */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  flexShrink: 0,
                }}>
                  ✦
                </div>
                <div>
                  <div style={{ color: "#ffffff", fontWeight: 600, marginBottom: "0.25rem" }}>
                    Versatile Styling
                  </div>
                  <div style={{ color: "#999", fontSize: "0.95rem" }}>
                    Style, dye, and customize to your vision
                  </div>
                </div>
              </div>
              
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  flexShrink: 0,
                }}>
                  ✦
                </div>
                <div>
                  <div style={{ color: "#ffffff", fontWeight: 600, marginBottom: "0.25rem" }}>
                    Long-Lasting Luxury
                  </div>
                  <div style={{ color: "#999", fontSize: "0.95rem" }}>
                    Investment pieces that endure with care
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/shop')}
              style={{
                padding: "1.25rem 3rem",
                background: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                fontSize: "0.95rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                alignSelf: "flex-start",
                marginTop: "1rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
                e.currentTarget.style.transform = "translateX(10px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              DISCOVER MORE →
            </button>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 2rem",
        position: "relative",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      }}>
        <div style={{
          maxWidth: "1200px",
          width: "100%",
          textAlign: "center",
        }}>
          <h2 style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "2rem",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}>
            CRAFTED FOR<br/>PERFECTION
          </h2>
          <p style={{
            fontSize: "1.25rem",
            color: "#e5e5e5",
            lineHeight: 1.8,
            maxWidth: "700px",
            margin: "0 auto 3rem",
            opacity: 0.8,
          }}>
            Every bundle is 100% single donor raw hair, unprocessed and authentic. 
            Natural cuticle-aligned hair that delivers authentic movement and shine. 
            Professional-grade quality that transforms your look instantly.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            marginTop: "4rem",
          }}>
            <div style={{
              padding: "2rem",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition: "border-color 0.3s ease",
            }}>
              <div style={{
                fontSize: "3rem",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "1rem",
              }}>
                100%
              </div>
              <div style={{
                fontSize: "0.9rem",
                color: "#e5e5e5",
                letterSpacing: "0.1em",
                opacity: 0.7,
              }}>
                RAW HAIR
              </div>
            </div>
            <div style={{
              padding: "2rem",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}>
              <div style={{
                fontSize: "3rem",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "1rem",
              }}>
                100%
              </div>
              <div style={{
                fontSize: "0.9rem",
                color: "#e5e5e5",
                letterSpacing: "0.1em",
                opacity: 0.7,
              }}>
                QUALITY GUARANTEED
              </div>
            </div>
            <div style={{
              padding: "2rem",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}>
              <div style={{
                fontSize: "3rem",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "1rem",
              }}>
                24/7
              </div>
              <div style={{
                fontSize: "0.9rem",
                color: "#e5e5e5",
                letterSpacing: "0.1em",
                opacity: 0.7,
              }}>
                SUPPORT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 2rem",
        position: "relative",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      }}>
        <div style={{
          maxWidth: "1200px",
          width: "100%",
        }}>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "3rem",
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}>
            LOVED BY THOUSANDS
          </h2>
          <ReviewCarousel />
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 2rem 8rem",
        position: "relative",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      }}>
        <div style={{
          maxWidth: "800px",
          width: "100%",
          textAlign: "center",
        }}>
          <h2 style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "2rem",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}>
            STAY IN THE LOOP
          </h2>
          <p style={{
            fontSize: "1.25rem",
            color: "#e5e5e5",
            lineHeight: 1.8,
            marginBottom: "3rem",
            opacity: 0.8,
          }}>
            Get exclusive access to new collections, styling tips, and special offers.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setSubscribing(true);
              setSubscribeError(null);
              
              const formData = new FormData(e.currentTarget);
              const email = formData.get('email') as string;
              
              try {
                // Check if already subscribed
                const { data: existing } = await supabase
                  .from('newsletter_subscribers')
                  .select('email')
                  .eq('email', email)
                  .single();
                
                if (existing) {
                  setSubscribeError('This email is already subscribed!');
                  setSubscribing(false);
                  return;
                }
                
                // Subscribe to newsletter
                const { error } = await supabase
                  .from('newsletter_subscribers')
                  .insert({
                    email,
                    user_id: user?.id || null,
                    source: 'website'
                  });
                
                if (error) throw error;
                
                // Show success message
                setShowSubscribeSuccess(true);
                
                // Reset form
                e.currentTarget.reset();
              } catch (error: any) {
                console.error('Subscription error:', error);
                setSubscribeError('Something went wrong. Please try again.');
              } finally {
                setSubscribing(false);
              }
            }}
            style={{
              display: "flex",
              gap: "1rem",
              maxWidth: "600px",
              margin: "0 auto",
              flexDirection: "column",
            }}
          >
            {/* Error Message */}
            {subscribeError && (
              <div style={{
                padding: '1rem',
                background: 'rgba(255, 0, 0, 0.1)',
                border: '1px solid rgba(255, 0, 0, 0.3)',
                color: '#ff6b6b',
                fontSize: '0.9rem',
                textAlign: 'center',
              }}>
                {subscribeError}
              </div>
            )}
            
            {/* Info: Show if user is logged in */}
            {user && (
              <div style={{
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#51cf66',
                fontSize: '0.9rem',
                textAlign: 'center',
              }}>
                ✨ As a member, you'll earn <strong>50 bonus points</strong> for subscribing!
              </div>
            )}
            
            <div style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                disabled={subscribing}
                style={{
                  flex: 1,
                  minWidth: "250px",
                  padding: "1.25rem 1.5rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }}
              />
              <button
                type="submit"
                disabled={subscribing}
                style={{
                  padding: "1.25rem 3rem",
                  background: "#ffffff",
                  color: "#000000",
                  border: "none",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  cursor: subscribing ? "not-allowed" : "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  whiteSpace: "nowrap",
                  opacity: subscribing ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!subscribing) {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 20px 60px rgba(255, 255, 255, 0.2)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {subscribing ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
              </button>
            </div>
            <p style={{
              fontSize: "0.85rem",
              color: "#999",
              marginTop: "1rem",
            }}>
              {user 
                ? "You'll earn 50 loyalty points for subscribing!" 
                : "Not a member? Sign up to earn loyalty points!"}
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
