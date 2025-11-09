// EXAMPLE: Update CartDrawer.tsx to use MvmntPay
// Location: /Users/MadeMuvs/Documents/GitHub 2/NikHairrr/src/components/CartDrawer.tsx

// Add these imports at the top:
import { redirectToMvmntPay, estimateTotal } from '../utils/mvmntpay';
import { getPriceId } from '../utils/productPrices';

// Replace the handleCheckout function with this:

const handleCheckout = async () => {
  if (cart.length === 0) {
    alert('Your cart is empty');
    return;
  }

  setIsProcessing(true);
  setCheckoutError(null);

  try {
    // For now, handle single item checkout
    // TODO: Implement multi-item support later
    const item = cart[0];
    
    // Get Stripe Price ID for this product
    // You'll need to map your product IDs to price IDs
    // Example: if item.id is for "Brazilian Body Wave" and size is "14"
    const priceId = getPriceId('brazilian-body-wave', item.size?.replace('"', ''));
    
    if (!priceId) {
      setCheckoutError('This product is not yet available for purchase. Please contact support.');
      setIsProcessing(false);
      return;
    }
    
    // Optional: Show platform fee before redirecting
    const platformFee = estimateTotal(item.price * item.quantity) - (item.price * item.quantity);
    const confirmCheckout = window.confirm(
      `Total: $${(item.price * item.quantity + platformFee).toFixed(2)}\n` +
      `(Includes $${platformFee.toFixed(2)} platform fee)\n\n` +
      `Continue to checkout?`
    );
    
    if (!confirmCheckout) {
      setIsProcessing(false);
      return;
    }
    
    // Redirect to MvmntPay checkout
    redirectToMvmntPay(
      priceId,
      item.quantity,
      `${window.location.origin}/success`
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

// Update the total display to show platform fee:

const subtotal = cart.reduce((sum, p) => sum + (p.price * p.quantity), 0);
const total = estimateTotal(subtotal);
const platformFee = total - subtotal;

// In your JSX, update the totals section:
<div style={{ 
  borderTop: "1px solid rgba(255, 255, 255, 0.1)", 
  paddingTop: "1.5rem",
  marginTop: "auto",
  padding: "1.5rem 2rem"
}}>
  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
    <span style={{ color: "#b0b0b0" }}>Subtotal</span>
    <span style={{ fontSize: "1.125rem" }}>${subtotal.toFixed(2)}</span>
  </div>
  
  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
    <span style={{ color: "#b0b0b0", fontSize: "0.875rem" }}>
      Platform Fee (2.94%)
    </span>
    <span style={{ fontSize: "0.875rem", color: "#b0b0b0" }}>
      ${platformFee.toFixed(2)}
    </span>
  </div>
  
  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
    <span style={{ fontSize: "1.25rem", fontWeight: 700 }}>Total</span>
    <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>${total.toFixed(2)}</span>
  </div>
  
  {checkoutError && (
    <div style={{
      background: "rgba(239, 68, 68, 0.1)",
      border: "1px solid rgba(239, 68, 68, 0.3)",
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "1rem",
      color: "#f87171"
    }}>
      {checkoutError}
    </div>
  )}
  
  <button
    onClick={handleCheckout}
    disabled={isProcessing || cart.length === 0}
    style={{
      width: "100%",
      padding: "1rem",
      background: isProcessing || cart.length === 0 
        ? "rgba(255, 255, 255, 0.1)" 
        : "linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)",
      color: isProcessing || cart.length === 0 ? "#666" : "#000",
      border: "none",
      borderRadius: "12px",
      fontSize: "1.125rem",
      fontWeight: 700,
      cursor: isProcessing || cart.length === 0 ? "not-allowed" : "pointer",
      letterSpacing: "0.05em",
      transition: "all 0.3s ease",
    }}
  >
    {isProcessing ? "PROCESSING..." : "CHECKOUT"}
  </button>
  
  <p style={{
    textAlign: "center",
    fontSize: "0.75rem",
    color: "#888",
    marginTop: "1rem"
  }}>
    Secure checkout powered by MvmntPay & Stripe
  </p>
</div>


// ========================================
// ALTERNATIVE: Handle multiple items
// ========================================

// If you want to handle multiple items, you have options:

// Option 1: Process items sequentially
const handleMultiItemCheckout = async () => {
  // Show warning about multiple items
  alert('Processing first item only. Multiple items coming soon!');
  // Then process first item as shown above
};

// Option 2: Create a bundle price
// Create a single Stripe price for common bundles like:
// - "3 Bundle Deal 14/16/18" - $275
// Then map cart items to bundle price ID

// Option 3: Let user select one item at a time
// Add "Checkout This Item" button on each cart item

// ========================================
// MAPPING PRODUCT IDS TO PRICE IDS
// ========================================

// You need to figure out how your product IDs map to the Stripe Price IDs
// 
// Example mapping based on your product structure:
// 
// If your product has:
//   - id: 1
//   - name: "Brazilian Body Wave"
//   - size: "14\""
// 
// Then you'd call:
//   getPriceId('brazilian-body-wave', '14')
// 
// You might need a helper like:

function getProductType(productId: number): string {
  const productMap: Record<number, string> = {
    1: 'brazilian-body-wave',
    2: 'brazilian-straight',
    3: 'deep-wave',
    10: '4x4-hd-closure',
    11: '5x5-hd-closure',
    20: '13x4-hd-frontal',
    // ... add all your product IDs
  };
  return productMap[productId] || '';
}

// Then in handleCheckout:
const productType = getProductType(item.id);
const priceId = getPriceId(productType, item.size?.replace('"', ''));
