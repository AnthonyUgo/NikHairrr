// src/components/CartDrawer.tsx
import { useState, useEffect } from "react";
import { FiX, FiTrash2, FiTag, FiStar } from "react-icons/fi";
import { redirectToMvmntPayMultiItem, type MvmntPayLineItem } from "../utils/mvmntpay";
import { validateDiscountCode, calculatePointsDiscount, formatDiscount, type DiscountCode } from "../utils/discounts";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../utils/supabase";

type Product = { 
  id: number; 
  name: string; 
  price: number; 
  size?: string; 
  quantity: number;
  lookupKey?: string; // Stripe lookup key for checkout
  priceId?: string; // Legacy Stripe price_id (for Hafy Bob)
};

export default function CartDrawer({
  cart,
  onClose,
  onUpdateQuantity,
  onUpdateSize,
  onRemoveItem,
}: {
  cart: Product[];
  onClose: () => void;
  onUpdateQuantity: (index: number, newQuantity: number) => void;
  onUpdateSize: (index: number, newSize: string) => void;
  onRemoveItem: (index: number) => void;
}) {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  
  // Discount code state
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  
  // Points state
  const [availablePoints, setAvailablePoints] = useState(0);
  const [pointsToRedeem, setPointsToRedeem] = useState(0);
  
  const subtotal = cart.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const subtotalInCents = Math.round(subtotal * 100);
  
  // Fetch user's points balance
  useEffect(() => {
    if (user) {
      fetchUserPoints();
    }
  }, [user]);
  
  const fetchUserPoints = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('loyalty_points')
        .select('total_points')
        .eq('user_id', user.id)
        .single();
      
      if (!error && data) {
        setAvailablePoints(data.total_points || 0);
      }
    } catch (error) {
      console.error('Error fetching points:', error);
    }
  };
  
  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      setDiscountError("Please enter a discount code");
      return;
    }
    
    setIsValidatingCode(true);
    setDiscountError(null);
    
    const result = await validateDiscountCode(discountCode.trim(), subtotalInCents);
    
    setIsValidatingCode(false);
    
    if (result.valid && result.discount) {
      setAppliedDiscount(result.discount);
      setDiscountError(null);
    } else {
      setDiscountError(result.error || "Invalid code");
      setAppliedDiscount(null);
    }
  };
  
  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode("");
    setDiscountError(null);
  };
  
  const handlePointsChange = (value: number) => {
    const maxPoints = Math.min(availablePoints, subtotalInCents); // Can't use more than subtotal
    setPointsToRedeem(Math.max(0, Math.min(value, maxPoints)));
  };
  
  // Calculate discounts
  const promoDiscountAmount = appliedDiscount 
    ? (appliedDiscount.type === 'percentage' 
        ? Math.round((subtotalInCents * appliedDiscount.value) / 100)
        : Math.round(appliedDiscount.value * 100))
    : 0;
  
  const pointsDiscountAmount = calculatePointsDiscount(pointsToRedeem);
  const totalDiscount = promoDiscountAmount + pointsDiscountAmount;
  const finalTotal = Math.max(0, subtotalInCents - totalDiscount);
  
  const sizes = ["12\"", "14\"", "16\"", "18\"", "20\"", "22\"", "24\"", "26\"", "28\"", "30\""];
  
  // Auto-fill email if user is logged in
  useEffect(() => {
    if (user?.email) {
      setCustomerEmail(user.email);
    }
  }, [user]);

  const handleInitiateCheckout = () => {
    if (cart.length === 0) {
      return;
    }
    
    // If user is logged in, skip the form and go straight to checkout
    if (user) {
      handleCheckout();
    } else {
      // Show customer info form for guest checkout
      setShowCustomerForm(true);
      setFormError(null);
    }
  };

  const handleCheckout = async () => {
    // For logged-in users, use their email
    const emailToUse = user?.email || customerEmail.trim();
    const nameToUse = customerName.trim();
    
    // Validate form (only needed for guest checkout)
    if (!user && !nameToUse) {
      setFormError("Please enter your name");
      return;
    }
    if (!emailToUse) {
      setFormError("Please enter your email");
      return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailToUse)) {
      setFormError("Please enter a valid email address");
      return;
    }

    setIsProcessing(true);
    setCheckoutError(null);
    setFormError(null);

    try {
      // Check if all items have either lookup key or price ID
      const itemsWithoutCheckoutId = cart.filter(item => !item.lookupKey && !item.priceId);
      
      if (itemsWithoutCheckoutId.length > 0) {
        const itemNames = itemsWithoutCheckoutId.map(item => item.name).join(', ');
        setCheckoutError(`These items are not yet available for checkout: ${itemNames}. Please remove them from your cart.`);
        setIsProcessing(false);
        return;
      }

      // Calculate bundle sale discount based on size
      const getBundleSaleDiscount = (item: Product): number => {
        // Only apply to bundles (items with "Bundle" in name and a size)
        if (!item.name.includes("Bundle") || !item.size) {
          return 0;
        }
        
        const sizeNum = parseInt(item.size);
        if (sizeNum >= 12 && sizeNum <= 18) {
          return 1500; // $15 off in cents
        } else if (sizeNum >= 20 && sizeNum <= 26) {
          return 2000; // $20 off in cents
        }
        return 0;
      };

      // Calculate total bundle sale discount across all cart items
      const bundleSaleDiscount = cart.reduce((total, item) => {
        const itemDiscount = getBundleSaleDiscount(item);
        return total + (itemDiscount * item.quantity);
      }, 0);

      // Build line items for Mvmnt Pay
      // Items with priceId use price, items with lookupKey use lookupKey (camelCase)
      const lineItems: MvmntPayLineItem[] = cart.map(item => {
        if (item.priceId) {
          // Price ID format
          return {
            price: item.priceId,
            quantity: item.quantity
          };
        } else if (item.lookupKey) {
          // Lookup key format
          return {
            lookupKey: item.lookupKey,
            quantity: item.quantity
          };
        } else {
          throw new Error(`Item ${item.name} has neither priceId nor lookupKey`);
        }
      });

      // Redirect to MvmntPay checkout with all items, customer info, and discounts
      const cancelUrl = `${window.location.href}${window.location.href.includes('?') ? '&' : '?'}checkout_canceled=true`;
      
      // Combine bundle sale discount with promo discount
      const totalPromoDiscount = promoDiscountAmount + bundleSaleDiscount;
      
      redirectToMvmntPayMultiItem(
        lineItems,
        `${window.location.origin}/success`,
        cancelUrl,  // Return to current page with canceled flag
        {
          customer_name: nameToUse,
          customer_email: emailToUse,
          ...(pointsToRedeem > 0 && { points_used: pointsToRedeem.toString() }),
          ...(appliedDiscount && { discount_code: appliedDiscount.code }),
          ...(bundleSaleDiscount > 0 && { bundle_sale_discount: (bundleSaleDiscount / 100).toFixed(2) })
        },
        pointsDiscountAmount > 0 ? pointsDiscountAmount : undefined,
        appliedDiscount?.code,
        totalPromoDiscount > 0 ? totalPromoDiscount : undefined
      );
      
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutError(
        error instanceof Error 
          ? error.message 
          : 'Failed to process checkout. Please try again.'
      );
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 199,
        }}
      />
      
      {/* Cart drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "min(420px, 100vw)",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.98)",
          backdropFilter: "blur(24px)",
          color: "#e5e5e5",
          padding: 0,
          boxShadow: "-8px 0 32px rgba(0, 0, 0, 0.9)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
          zIndex: 200,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", padding: "2rem 2rem 0 2rem", flexShrink: 0 }}>
        <h3 style={{ 
          color: "#ffffff", 
          fontSize: "1.75rem", 
          fontWeight: 700,
          margin: 0,
          letterSpacing: "0.1em",
        }}>
          YOUR CART
        </h3>
        <button 
          onClick={onClose} 
          style={{ 
            color: "#ffffff", 
            background: "rgba(255, 255, 255, 0.1)", 
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "0",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
            e.currentTarget.style.transform = "rotate(90deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.transform = "rotate(0deg)";
          }}
        >
          <FiX />
        </button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 2rem", marginBottom: "1.5rem", minHeight: 0 }}>
        {cart.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            padding: "3rem 1rem",
            color: "#e5e5e5", 
            opacity: 0.6,
          }}>
            <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Your cart is empty</p>
            <p style={{ fontSize: "0.9rem" }}>Add some luxury hair to get started!</p>
          </div>
        ) : (
          <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
            {cart.map((item, idx) => (
              <li 
                key={idx} 
                style={{ 
                  marginBottom: "1rem", 
                  padding: "1.25rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "0",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.75rem" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: "1.05rem", marginBottom: "0.5rem" }}>{item.name}</div>
                    
                    {/* Size Selector */}
                    {item.size && (
                      <div style={{ marginTop: "0.5rem" }}>
                        <label style={{ fontSize: "0.75rem", opacity: 0.7, display: "block", marginBottom: "0.25rem" }}>
                          Size:
                        </label>
                        <select
                          value={item.size}
                          onChange={(e) => onUpdateSize(idx, e.target.value)}
                          style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            color: "#ffffff",
                            padding: "0.4rem 0.6rem",
                            fontSize: "0.85rem",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          {sizes.map(size => (
                            <option key={size} value={size} style={{ background: "#000000" }}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => onRemoveItem(idx)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#ffffff",
                      cursor: "pointer",
                      opacity: 0.6,
                      transition: "all 0.2s ease",
                      padding: "0.25rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ff4444";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.opacity = "0.6";
                    }}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
                
                {/* Quantity Controls and Price */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>Qty:</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255, 255, 255, 0.1)", borderRadius: "4px", padding: "0.25rem" }}>
                      <button
                        onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#ffffff",
                          cursor: "pointer",
                          fontSize: "1.1rem",
                          padding: "0.25rem 0.5rem",
                          lineHeight: 1,
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#cccccc"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#ffffff"}
                      >
                        −
                      </button>
                      <span style={{ 
                        minWidth: "30px", 
                        textAlign: "center",
                        fontWeight: 600,
                        fontSize: "0.95rem"
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#ffffff",
                          cursor: "pointer",
                          fontSize: "1.1rem",
                          padding: "0.25rem 0.5rem",
                          lineHeight: 1,
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#cccccc"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#ffffff"}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span style={{ 
                    color: "#ffffff", 
                    fontWeight: 700,
                    fontSize: "1.15rem",
                  }}>
                    ${item.price * item.quantity}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{
        padding: "1.5rem",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: "0",
        marginBottom: "1rem",
        marginLeft: "2rem",
        marginRight: "2rem",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <span style={{ color: "#e5e5e5", fontSize: "0.95rem" }}>Subtotal</span>
          <span style={{ color: "#e5e5e5", fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
        </div>
        
        {/* Discount Code Section */}
        <div style={{ 
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          paddingTop: "1rem",
          marginBottom: "1rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <FiTag size={16} color="#ffffff" />
            <span style={{ color: "#ffffff", fontSize: "0.9rem", fontWeight: 600 }}>Promo Code</span>
          </div>
          
          {!appliedDiscount ? (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                placeholder="Enter code"
                disabled={isValidatingCode}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleApplyDiscount()}
              />
              <button
                onClick={handleApplyDiscount}
                disabled={isValidatingCode || !discountCode.trim()}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: isValidatingCode || !discountCode.trim() 
                    ? "rgba(255, 255, 255, 0.1)" 
                    : "rgba(255, 255, 255, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: isValidatingCode || !discountCode.trim() ? "default" : "pointer",
                  transition: "all 0.2s",
                }}
              >
                {isValidatingCode ? "..." : "Apply"}
              </button>
            </div>
          ) : (
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem",
              background: "rgba(76, 175, 80, 0.1)",
              border: "1px solid rgba(76, 175, 80, 0.3)",
            }}>
              <div>
                <div style={{ color: "#4CAF50", fontWeight: 600, fontSize: "0.9rem" }}>
                  {appliedDiscount.code} Applied
                </div>
                <div style={{ color: "#4CAF50", fontSize: "0.8rem", marginTop: "0.25rem" }}>
                  {formatDiscount(appliedDiscount)}
                </div>
              </div>
              <button
                onClick={handleRemoveDiscount}
                style={{
                  padding: "0.5rem",
                  background: "transparent",
                  border: "none",
                  color: "#4CAF50",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                Remove
              </button>
            </div>
          )}
          
          {discountError && (
            <div style={{ color: "#ff4444", fontSize: "0.8rem", marginTop: "0.5rem" }}>
              {discountError}
            </div>
          )}
        </div>
        
        {/* Points Redemption Section */}
        {user && availablePoints > 0 && (
          <div style={{ 
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "1rem",
            marginBottom: "1rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <FiStar size={16} color="#FFD700" />
              <span style={{ color: "#ffffff", fontSize: "0.9rem", fontWeight: 600 }}>
                Use Points
              </span>
              <span style={{ color: "#999", fontSize: "0.8rem" }}>
                (Available: {availablePoints.toLocaleString()})
              </span>
            </div>
            
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input
                type="number"
                value={pointsToRedeem}
                onChange={(e) => handlePointsChange(parseInt(e.target.value) || 0)}
                min="0"
                max={Math.min(availablePoints, subtotalInCents)}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              />
              <button
                onClick={() => handlePointsChange(Math.min(availablePoints, subtotalInCents))}
                style={{
                  padding: "0.75rem 1rem",
                  background: "rgba(255, 215, 0, 0.1)",
                  border: "1px solid rgba(255, 215, 0, 0.3)",
                  color: "#FFD700",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Max
              </button>
            </div>
            
            <div style={{ color: "#999", fontSize: "0.75rem", marginTop: "0.5rem" }}>
              100 points = $1.00 • Using {pointsToRedeem} points = ${(pointsToRedeem / 100).toFixed(2)} off
            </div>
          </div>
        )}
        
        {/* Discount Breakdown */}
        {(promoDiscountAmount > 0 || pointsDiscountAmount > 0) && (
          <div style={{ 
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "1rem",
            marginBottom: "1rem",
          }}>
            {promoDiscountAmount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "#4CAF50", fontSize: "0.9rem" }}>🎉 Promo Discount</span>
                <span style={{ color: "#4CAF50", fontWeight: 600 }}>-${(promoDiscountAmount / 100).toFixed(2)}</span>
              </div>
            )}
            {pointsDiscountAmount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "#FFD700", fontSize: "0.9rem" }}>⭐ Points Redeemed</span>
                <span style={{ color: "#FFD700", fontWeight: 600 }}>-${(pointsDiscountAmount / 100).toFixed(2)}</span>
              </div>
            )}
          </div>
        )}
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <span style={{ color: "#e5e5e5", fontSize: "0.95rem" }}>Shipping</span>
          <span style={{ color: "#999", fontSize: "0.85rem", fontStyle: "italic" }}>Calculated at checkout</span>
        </div>
        <div style={{ 
          fontSize: "0.75rem", 
          color: "#999", 
          marginBottom: "1rem",
          fontStyle: "italic",
          lineHeight: 1.5,
        }}>
          *Free shipping available for Houston area<br />
          *Platform fees & taxes calculated at checkout
        </div>
        <div style={{ 
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          paddingTop: "1rem",
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
        }}>
          <span style={{ color: "#ffffff", fontSize: "1.15rem", fontWeight: 700 }}>
            {totalDiscount > 0 ? "Total After Discounts" : "Subtotal"}
          </span>
          <span style={{ 
            color: "#ffffff", 
            fontSize: "1.5rem", 
            fontWeight: 700,
          }}>
            ${(finalTotal / 100).toFixed(2)}
          </span>
        </div>
        {totalDiscount > 0 && (
          <div style={{ 
            fontSize: "0.8rem", 
            color: "#4CAF50", 
            marginTop: "0.5rem",
            textAlign: "right",
            fontWeight: 600,
          }}>
            You're saving ${(totalDiscount / 100).toFixed(2)}!
          </div>
        )}
        <div style={{ 
          fontSize: "0.7rem", 
          color: "#888", 
          marginTop: "0.75rem",
          textAlign: "center",
        }}>
          Secure checkout powered by MvmntPay
        </div>
      </div>
      
      {checkoutError && (
        <div style={{
          margin: "0 2rem 1rem 2rem",
          padding: "1rem",
          background: "rgba(255, 68, 68, 0.1)",
          border: "1px solid rgba(255, 68, 68, 0.3)",
          color: "#ff4444",
          fontSize: "0.9rem",
          lineHeight: 1.5,
        }}>
          {checkoutError}
        </div>
      )}

      <button
        onClick={handleInitiateCheckout}
        disabled={cart.length === 0}
        style={{ 
          width: "calc(100% - 4rem)", 
          margin: "0 2rem 2rem 2rem",
          padding: "1.25rem 2rem", 
          background: cart.length === 0 ? "rgba(255, 255, 255, 0.1)" : "#ffffff", 
          border: "none", 
          borderRadius: "0", 
          color: cart.length === 0 ? "#666666" : "#000000",
          fontWeight: 600,
          fontSize: "0.95rem",
          cursor: cart.length === 0 ? "not-allowed" : "pointer",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          letterSpacing: "0.12em",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          if (cart.length > 0) {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 15px 35px rgba(255, 255, 255, 0.2)";
          }
        }}
        onMouseLeave={(e) => {
          if (cart.length > 0) {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }
        }}
      >
        {cart.length === 0 ? "Add Items to Checkout" : "Proceed to Checkout"}
      </button>
    </div>
    
    {/* Customer Information Modal */}
    {showCustomerForm && (
      <>
        {/* Modal backdrop */}
        <div
          onClick={() => setShowCustomerForm(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.7)",
            zIndex: 250,
          }}
        />
        
        {/* Modal content */}
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(450px, 90vw)",
            background: "rgba(0, 0, 0, 0.98)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "0",
            padding: "2.5rem",
            zIndex: 251,
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.9)",
          }}
        >
          <h3 style={{
            color: "#ffffff",
            fontSize: "1.5rem",
            fontWeight: 700,
            marginTop: 0,
            marginBottom: "0.5rem",
            letterSpacing: "0.1em",
          }}>
            CUSTOMER INFORMATION
          </h3>
          <p style={{
            color: "#999",
            fontSize: "0.85rem",
            marginBottom: "2rem",
            lineHeight: 1.5,
          }}>
            Please provide your contact information to complete your order
          </p>
          
          {formError && (
            <div style={{
              marginBottom: "1.5rem",
              padding: "0.75rem 1rem",
              background: "rgba(255, 68, 68, 0.1)",
              border: "1px solid rgba(255, 68, 68, 0.3)",
              color: "#ff4444",
              fontSize: "0.85rem",
            }}>
              {formError}
            </div>
          )}
          
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{
              display: "block",
              color: "#e5e5e5",
              fontSize: "0.85rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
              letterSpacing: "0.05em",
            }}>
              FULL NAME *
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your full name"
              style={{
                width: "100%",
                padding: "0.875rem 1rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "0",
                color: "#ffffff",
                fontSize: "0.95rem",
                outline: "none",
                transition: "all 0.2s ease",
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
          </div>
          
          <div style={{ marginBottom: "2rem" }}>
            <label style={{
              display: "block",
              color: "#e5e5e5",
              fontSize: "0.85rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
              letterSpacing: "0.05em",
            }}>
              EMAIL ADDRESS *
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="Enter your email address"
              style={{
                width: "100%",
                padding: "0.875rem 1rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "0",
                color: "#ffffff",
                fontSize: "0.95rem",
                outline: "none",
                transition: "all 0.2s ease",
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
          </div>
          
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() => setShowCustomerForm(false)}
              style={{
                flex: 1,
                padding: "1rem",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "0",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.1em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              }}
            >
              CANCEL
            </button>
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              style={{
                flex: 1,
                padding: "1rem",
                background: isProcessing ? "rgba(255, 255, 255, 0.5)" : "#ffffff",
                border: "none",
                borderRadius: "0",
                color: "#000000",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: isProcessing ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.1em",
              }}
              onMouseEnter={(e) => {
                if (!isProcessing) {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 255, 255, 0.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isProcessing) {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {isProcessing ? "PROCESSING..." : "CONTINUE TO CHECKOUT"}
            </button>
          </div>
        </div>
      </>
    )}
    </>
  );
}
