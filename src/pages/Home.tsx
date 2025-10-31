// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      {/* Hero Section */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(5rem, 8vw, 2rem) clamp(1rem, 5vw, 2rem) clamp(1rem, 5vw, 2rem)",
        position: "relative",
      }}>
        {/* Background gradient */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)",
          pointerEvents: "none",
        }} />

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
                Premium hair extensions crafted for those who refuse to compromise on quality.
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
            }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#666", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
                  QUALITY
                </div>
                <div style={{ fontSize: "1rem", color: "#ffffff", fontWeight: 600 }}>
                  100% Premium
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#666", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
                  SHIPPING
                </div>
                <div style={{ fontSize: "1rem", color: "#ffffff", fontWeight: 600 }}>
                  Free Worldwide
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

      {/* Quality Section */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
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
            Every bundle is ethically sourced and meticulously crafted to deliver 
            the natural movement and shine you see in editorial shoots. Professional-grade 
            quality that transforms your look instantly.
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
                VIRGIN HAIR
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
                365
              </div>
              <div style={{
                fontSize: "0.9rem",
                color: "#e5e5e5",
                letterSpacing: "0.1em",
                opacity: 0.7,
              }}>
                DAY WARRANTY
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

      {/* CTA Section */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
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
            READY TO<br/>ELEVATE YOUR LOOK?
          </h2>
          <p style={{
            fontSize: "1.25rem",
            color: "#e5e5e5",
            lineHeight: 1.8,
            marginBottom: "3rem",
            opacity: 0.8,
          }}>
            Experience the difference that premium quality makes.
          </p>
          <button
            onClick={() => navigate('/shop')}
            style={{
              padding: "1.5rem 4rem",
              background: "#ffffff",
              color: "#000000",
              border: "none",
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 20px 60px rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            EXPLORE COLLECTION
          </button>
        </div>
      </section>
    </div>
  );
}
