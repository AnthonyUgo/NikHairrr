import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FiCheck, FiStar, FiGift, FiTrendingUp, FiZap, FiAward } from "react-icons/fi";
import FooterSignature from "../components/FooterSignature";
import AuthModal from "../components/AuthModal";

type MembershipTier = {
  id: string;
  name: string;
  pointsRequired: number;
  color: string;
  gradient: string;
  icon: React.ReactNode;
  description: string;
  signupBonus: number;
  earnRate: string;
  benefits: string[];
  recommended?: boolean;
};

const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "baby",
    name: "NikHairrr Baby",
    pointsRequired: 0,
    color: "#ffffff",
    gradient: "rgba(255, 255, 255, 0.05)",
    icon: <FiStar size={32} />,
    description: "Start your journey with exclusive perks and rewards",
    signupBonus: 500,
    earnRate: "1 point per $1 spent",
    benefits: [
      "500 points instantly upon signup",
      "Earn 1 point for every $1 spent",
      "Birthday month special offer",
      "Early access to new products",
      "Exclusive member-only sales",
      "Access to members-only content",
    ],
  },
  {
    id: "baby-elite",
    name: "NikHairrr Baby Elite",
    pointsRequired: 2500,
    color: "#ffffff",
    gradient: "rgba(255, 255, 255, 0.1)",
    icon: <FiAward size={32} />,
    description: "Unlock elite status when you reach 2,500 points",
    signupBonus: 1000,
    earnRate: "2 points per $1 spent",
    recommended: true,
    benefits: [
      "1,000 bonus points when unlocked",
      "Earn 2 points for every $1 spent (2x rewards!)",
      "Priority customer service",
      "15% off all products, all the time",
      "Exclusive Elite-only product launches",
      "Quarterly surprise gift box ($75 value)",
      "Birthday month VIP treatment + gift",
      "First access to limited edition items",
      "Private styling consultation (1x per month)",
      "Special discounts on services",
    ],
  },
];

export default function Membership() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");

  const handleJoinTier = (tierId: string) => {
    if (tierId === "baby-elite") {
      // Elite tier is locked - just ignore clicks
      return;
    }
    
    if (!user) {
      // Not logged in, show signup modal
      setAuthMode("signup");
      setAuthModalOpen(true);
    } else {
      // Already logged in, go to dashboard
      navigate("/member/dashboard");
    }
  };

  const handleAuthSuccess = () => {
    setAuthModalOpen(false);
    navigate("/member/dashboard");
  };

  return (
    <div
      style={{
        padding: "clamp(5rem, 10vw, 6rem) clamp(1rem, 4vw, 2rem) 2rem",
        minHeight: "100vh",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* Header Section */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "999px",
            padding: "0.5rem 1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <FiGift color="#ffffff" />
          <span style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.9rem" }}>
            LOYALTY PROGRAM
          </span>
        </div>

        <h1
          style={{
            color: "#ffffff",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 700,
            marginBottom: "1rem",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Join the NikHairrr Family
        </h1>
        <p
          style={{
            color: "#e5e5e5",
            fontSize: "1.25rem",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: 1.6,
            opacity: 0.9,
          }}
        >
          Get rewarded for your loyalty with exclusive perks, early access, and special gifts.
          Choose the tier that fits your style!
        </p>
      </div>

      {/* How It Works Section */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          padding: "3rem 2rem",
          marginBottom: "4rem",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "2.5rem",
            textAlign: "center",
          }}
        >
          How It Works
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                width: "80px",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <FiAward size={36} color="#ffffff" />
            </div>
            <h3 style={{ color: "#ffffff", fontSize: "1.25rem", marginBottom: "0.75rem" }}>
              1. Join for Free
            </h3>
            <p style={{ color: "#e5e5e5", opacity: 0.8, lineHeight: 1.6 }}>
              Sign up instantly and get 500 points just for joining the family
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                width: "80px",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <FiTrendingUp size={36} color="#ffffff" />
            </div>
            <h3 style={{ color: "#ffffff", fontSize: "1.25rem", marginBottom: "0.75rem" }}>
              2. Earn Points
            </h3>
            <p style={{ color: "#e5e5e5", opacity: 0.8, lineHeight: 1.6 }}>
              Earn points with every purchase and unlock exclusive rewards
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                width: "80px",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <FiZap size={36} color="#ffffff" />
            </div>
            <h3 style={{ color: "#ffffff", fontSize: "1.25rem", marginBottom: "0.75rem" }}>
              3. Unlock Elite at 2,500
            </h3>
            <p style={{ color: "#e5e5e5", opacity: 0.8, lineHeight: 1.6 }}>
              Reach 2,500 points to auto-unlock Elite tier & start earning 2x rewards
            </p>
          </div>
        </div>
      </div>

      {/* Membership Tiers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
          gap: "2rem",
          marginBottom: "4rem",
        }}
      >
        {MEMBERSHIP_TIERS.map((tier) => (
          <div
            key={tier.id}
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(12px)",
              border: tier.recommended
                ? "2px solid rgba(255, 255, 255, 0.3)"
                : "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "16px",
              overflow: "hidden",
              position: "relative",
              transition: "all 0.3s ease",
              boxShadow: tier.recommended ? "0 0 30px rgba(255, 255, 255, 0.1)" : "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              if (tier.recommended) {
                e.currentTarget.style.boxShadow = "0 0 40px rgba(255, 255, 255, 0.2), 0 20px 60px rgba(255, 255, 255, 0.1)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = tier.recommended ? "0 0 30px rgba(255, 255, 255, 0.1)" : "none";
            }}
          >
            {/* Recommended Badge */}
            {tier.recommended && (
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  padding: "0.5rem 1rem",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                ELITE
              </div>
            )}

            {/* Tier Header */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                padding: "2.5rem 2rem",
                textAlign: "center",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "50%",
                  width: "80px",
                  height: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  color: "#ffffff",
                }}
              >
                {tier.icon}
              </div>
              <h3
                style={{
                  color: "#ffffff",
                  fontSize: "2rem",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                }}
              >
                {tier.name}
              </h3>
              <p style={{ color: "#ffffff", opacity: 0.9, marginBottom: "1.5rem" }}>
                {tier.description}
              </p>
              <div style={{ fontSize: tier.pointsRequired === 0 ? "2rem" : "3rem", fontWeight: 700, color: "#ffffff" }}>
                {tier.pointsRequired === 0 ? "Default Tier" : `${tier.pointsRequired.toLocaleString()} pts`}
              </div>
              <div style={{ color: "#ffffff", opacity: 0.8, fontSize: "1rem" }}>
                {tier.pointsRequired === 0 ? "Active on signup" : "Unlocks automatically"}
              </div>
            </div>

            {/* Tier Details */}
            <div style={{ padding: "2rem" }}>
              {/* Signup Bonus */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.85rem", color: "#999", marginBottom: "0.25rem" }}>
                  SIGNUP BONUS
                </div>
                <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#ffffff" }}>
                  {tier.signupBonus} Points
                </div>
              </div>

              <div
                style={{
                  padding: "1rem",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "8px",
                  marginBottom: "1.5rem",
                }}
              >
                <div style={{ fontSize: "0.85rem", color: "#999", marginBottom: "0.5rem" }}>
                  EARN RATE
                </div>
                <div style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: 600 }}>
                  {tier.earnRate}
                </div>
              </div>

              {/* Benefits List */}
              <div style={{ marginBottom: "2rem" }}>
                <h4
                  style={{
                    color: "#ffffff",
                    fontSize: "1.1rem",
                    marginBottom: "1rem",
                    fontWeight: 600,
                  }}
                >
                  What's Included:
                </h4>
                <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                  {tier.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        marginBottom: "0.75rem",
                        color: "#e5e5e5",
                        fontSize: "0.95rem",
                        lineHeight: 1.5,
                      }}
                    >
                      <FiCheck
                        size={20}
                        style={{
                          color: "#ffffff",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleJoinTier(tier.id)}
                style={{
                  width: "100%",
                  background: tier.pointsRequired === 0 ? "#ffffff" : "rgba(255, 255, 255, 0.05)",
                  color: tier.pointsRequired === 0 ? "#000000" : "#ffffff",
                  border: tier.pointsRequired === 0 ? "none" : "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  padding: "1rem 2rem",
                  fontSize: "1rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  cursor: tier.pointsRequired === 0 ? "pointer" : "default",
                  transition: "all 0.3s ease",
                  opacity: tier.pointsRequired === 0 ? 1 : 0.5,
                }}
                onMouseEnter={(e) => {
                  if (tier.pointsRequired === 0) {
                    e.currentTarget.style.transform = "scale(1.02)";
                    e.currentTarget.style.background = "#f5f5f5";
                  }
                }}
                onMouseLeave={(e) => {
                  if (tier.pointsRequired === 0) {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.background = "#ffffff";
                  }
                }}
              >
                {tier.pointsRequired === 0 
                  ? (user ? "YOUR CURRENT TIER" : "JOIN NOW") 
                  : "UNLOCKS AT 2,500 POINTS"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          padding: "3rem 2rem",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Frequently Asked Questions
        </h2>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "#ffffff", fontSize: "1.25rem", marginBottom: "0.75rem" }}>
              How do I earn points?
            </h3>
            <p style={{ color: "#e5e5e5", opacity: 0.8, lineHeight: 1.6 }}>
              You earn points automatically with every purchase. Baby members earn 1 point per $1
              spent, while Elite members earn 2 points per $1 spent. Points are added to your
              account immediately after your order is confirmed.
            </p>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "#ffffff", fontSize: "1.25rem", marginBottom: "0.75rem" }}>
              How do I redeem my points?
            </h3>
            <p style={{ color: "#e5e5e5", opacity: 0.8, lineHeight: 1.6 }}>
              You can redeem your points at checkout for discounts on your order. 100 points = $1
              off. Simply apply your points in the cart before completing your purchase.
            </p>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "#ffffff", fontSize: "1.25rem", marginBottom: "0.75rem" }}>
              Do points expire?
            </h3>
            <p style={{ color: "#e5e5e5", opacity: 0.8, lineHeight: 1.6 }}>
              Points never expire as long as your account remains active. Make at least one purchase
              per year to keep your account and points active.
            </p>
          </div>

          <div>
            <h3 style={{ color: "#ffffff", fontSize: "1.25rem", marginBottom: "0.75rem" }}>
              How do I unlock Elite tier?
            </h3>
            <p style={{ color: "#e5e5e5", opacity: 0.8, lineHeight: 1.6 }}>
              Elite tier automatically unlocks when you reach 2,500 points! You'll receive a bonus
              1,000 points when you unlock it, and immediately start earning 2x points (2 points per
              $1) on all future purchases.
            </p>
          </div>
        </div>
      </div>

      <FooterSignature />

      {/* Auth Modal */}
      {authModalOpen && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
          onSwitchMode={() => setAuthMode(authMode === "login" ? "signup" : "login")}
        />
      )}
    </div>
  );
}
