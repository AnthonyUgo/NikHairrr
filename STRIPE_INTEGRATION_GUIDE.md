# Stripe Integration Guide for NikHairrr

## Dynamic Checkout Setup (No Individual Products in Stripe)

You **DO NOT** need to create each individual item in Stripe. Here's the recommended approach:

### Approach: Dynamic Line Items (Recommended)

Use Stripe Checkout with dynamic line items. This allows you to pass product details at checkout time without pre-creating products in Stripe.

## Implementation Steps

### 1. Install Stripe Dependencies

```bash
npm install @stripe/stripe-js stripe
```

### 2. Backend Setup (Node.js/Express Example)

Create an API endpoint to generate Stripe Checkout sessions:

```javascript
// server.js or api/checkout.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-checkout-session', async (req, res) => {
  const { items, shippingAddress } = req.body;

  // Calculate shipping based on Houston or other locations
  const isHouston = shippingAddress?.city?.toLowerCase() === 'houston' && 
                    shippingAddress?.state?.toLowerCase() === 'texas';
  
  const shippingCost = isHouston ? 0 : calculateShipping(items, shippingAddress);

  // Transform cart items to Stripe line items
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: `${item.name} - ${item.size || 'Standard'}`,
        description: item.description || '',
      },
      unit_amount: Math.round(item.price * 100), // Stripe uses cents
    },
    quantity: item.quantity,
  }));

  // Add shipping as a line item if not Houston
  if (shippingCost > 0) {
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Shipping',
        },
        unit_amount: Math.round(shippingCost * 100),
      },
      quantity: 1,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/shop`,
      shipping_address_collection: {
        allowed_countries: ['US'], // Expand as needed
      },
      customer_email: req.body.email || undefined,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function calculateShipping(items, address) {
  // Your shipping calculation logic
  const baseShipping = 15;
  const weightFactor = items.reduce((sum, item) => sum + item.quantity, 0) * 2;
  return baseShipping + weightFactor;
}
```

### 3. Frontend Integration

Update `CartDrawer.tsx` to handle checkout:

```typescript
// Add to CartDrawer.tsx
const handleCheckout = async () => {
  try {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);
    
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart,
        // You may want to collect shipping address first
      }),
    });

    const { sessionId } = await response.json();
    
    const result = await stripe!.redirectToCheckout({ sessionId });
    
    if (result.error) {
      alert(result.error.message);
    }
  } catch (error) {
    console.error('Checkout error:', error);
  }
};

// Replace the checkout button onClick with handleCheckout
```

## MVMNT Pay Integration

For MVMNT Pay + gas fees:

### Option 1: Payment Intent with Custom Fee
```javascript
// Add gas fee to line items
const gasFee = calculateGasFee(totalAmount);

lineItems.push({
  price_data: {
    currency: 'usd',
    product_data: {
      name: 'Processing Fee (MVMNT Pay)',
    },
    unit_amount: Math.round(gasFee * 100),
  },
  quantity: 1,
});
```

### Option 2: Use Stripe Connect with MVMNT Pay
If MVMNT Pay supports Stripe Connect, you can:
1. Create a connected account for MVMNT Pay
2. Use `application_fee_amount` to route fees
3. This keeps transactions transparent

## Environment Variables

Create `.env` file:

```env
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_PUBLIC_KEY=pk_test_your_public_key

# App URLs
CLIENT_URL=http://localhost:5173

# MVMNT Pay (if applicable)
MVMNT_API_KEY=your_mvmnt_key
```

## Shipping Calculation Logic

```javascript
function calculateShipping(items, address) {
  // Free for Houston, TX
  if (address.city?.toLowerCase() === 'houston' && 
      address.state?.toLowerCase() === 'texas') {
    return 0;
  }

  // Base shipping rate
  let shippingCost = 15;

  // Add weight-based fees
  const totalWeight = items.reduce((sum, item) => {
    // Estimate: bundles ~100g, wigs ~400g, etc.
    const weightMap = {
      bundle: 100,
      wig: 400,
      closure: 150,
      frontal: 200,
    };
    const itemType = item.name.toLowerCase();
    const weight = Object.keys(weightMap).find(key => itemType.includes(key));
    return sum + (weightMap[weight] || 100) * item.quantity;
  }, 0);

  // Add $1 per 100g
  shippingCost += Math.ceil(totalWeight / 100);

  return shippingCost;
}
```

## Testing

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires 3D Secure: `4000 0025 0000 3155`

## Advantages of Dynamic Line Items

1. ✅ **No pre-creation needed** - Add products anytime
2. ✅ **Flexible pricing** - Size-based pricing handled dynamically
3. ✅ **Easy updates** - Change prices without Stripe dashboard
4. ✅ **Custom descriptions** - Include size, texture info
5. ✅ **Dynamic shipping** - Calculate at checkout time

## Next Steps for Bulk Hair & Services

For Bulk Hair and Services, you'll follow the same pattern:
1. Create pages similar to ShopClosures/ShopFrontals
2. Pass items to cart with proper pricing
3. Let Stripe handle payment via dynamic line items

No need to create products in Stripe - everything is handled dynamically! 🎉
