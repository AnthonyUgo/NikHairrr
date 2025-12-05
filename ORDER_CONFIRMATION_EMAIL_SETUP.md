# 📧 Order Confirmation Email Integration

## Overview

Order confirmation emails need to be sent when a Stripe payment succeeds. This requires setting up a Stripe webhook.

## Setup Steps

### 1. Create Stripe Webhook Handler

You'll need to add this webhook handler to your backend API (the one handling `/api/create-checkout-session`).

**Example webhook endpoint** (Node.js/Express):

```javascript
// /api/stripe-webhook
import { supabase } from './supabase-admin'; // Use service role key

app.post('/api/stripe-webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Get customer email and details
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || 'Customer';
    const orderTotal = (session.amount_total / 100).toFixed(2); // Convert cents to dollars
    const orderId = session.id;
    
    // Calculate points earned (1 point per dollar)
    const pointsEarned = Math.floor(session.amount_total / 100);
    
    // Get line items (if you need detailed order info)
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const items = lineItems.data.map(item => ({
      name: item.description,
      quantity: item.quantity,
      price: (item.amount_total / 100 / item.quantity).toFixed(2),
      total: (item.amount_total / 100).toFixed(2)
    }));
    
    // Send order confirmation email via Supabase Edge Function
    try {
      await supabase.functions.invoke('send-email', {
        body: {
          to: customerEmail,
          templateType: 'order-confirmation',
          data: {
            userName: customerName,
            orderNumber: orderId,
            orderTotal: orderTotal,
            pointsEarned: pointsEarned,
            items: items
          }
        }
      });
      
      console.log(`✅ Order confirmation email sent to ${customerEmail}`);
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Don't fail the webhook - email is not critical
    }
    
    // Award loyalty points to user (if logged in)
    if (session.client_reference_id) {
      const userId = session.client_reference_id;
      
      try {
        await supabase
          .from('loyalty_transactions')
          .insert({
            user_id: userId,
            points: pointsEarned,
            transaction_type: 'earned',
            source: 'purchase',
            order_id: orderId,
            description: `Purchase reward - Order #${orderId.substring(0, 8)}`
          });
        
        console.log(`✅ Awarded ${pointsEarned} points to user ${userId}`);
      } catch (pointsError) {
        console.error('Failed to award points:', pointsError);
      }
    }
  }

  res.json({ received: true });
});
```

### 2. Configure Stripe Webhook

1. Go to Stripe Dashboard: https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. Enter your webhook URL: `https://your-api.com/api/stripe-webhook`
4. Select events to listen for:
   - `checkout.session.completed`
5. Copy the **Signing secret** (starts with `whsec_`)
6. Add to your environment variables: `STRIPE_WEBHOOK_SECRET`

### 3. Update Checkout Session Creation

When creating the checkout session, pass the user ID so you can award points:

```javascript
// In your /api/create-checkout-session endpoint
const session = await stripe.checkout.sessions.create({
  // ... other parameters
  client_reference_id: userId, // User's Supabase user ID
  customer_email: userEmail,
  // ...
});
```

### 4. Frontend Integration

In your CartDrawer or checkout component, pass user info:

```typescript
const handleCheckout = async () => {
  const { user } = await supabase.auth.getUser();
  
  const sessionId = await createCheckoutSession(
    cartItems,
    user?.email, // Customer email
    shippingAddress
  );
  
  // In createCheckoutSession function, include:
  // userId: user?.id
};
```

## Email Flow

```
User completes purchase
  ↓
Stripe processes payment
  ↓
Stripe webhook triggers
  ↓
Backend receives checkout.session.completed event
  ↓
Backend calls send-email Edge Function
  ↓
SendGrid sends order confirmation email
  ↓
User receives beautiful receipt with order details
  
(In parallel)
  ↓
Backend awards loyalty points
  ↓
Auto-tier-upgrade trigger checks if user reached Elite (2,500 points)
  ↓
If yes: Elite unlock email sent automatically
```

## Testing

### Test in Stripe Dashboard

1. Use Stripe test mode
2. Create test checkout with card: `4242 4242 4242 4242`
3. Complete checkout
4. Check webhook logs in Stripe Dashboard
5. Verify email was sent
6. Check Supabase loyalty_transactions table for points

### Test Webhook Locally

Use Stripe CLI:

```bash
stripe listen --forward-to localhost:3001/api/stripe-webhook
stripe trigger checkout.session.completed
```

## Important Notes

- ✅ Order confirmation emails are sent AFTER payment succeeds (webhook)
- ✅ Points are awarded automatically via webhook
- ✅ Elite unlock email triggers automatically when points reach 2,500
- ⚠️ Make sure to use Supabase **service role key** in backend webhook handler
- ⚠️ Webhook endpoint must be publicly accessible (not localhost in production)
- ⚠️ Always verify webhook signature for security

## Required Environment Variables

**Backend API:**
```env
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=https://qkrlaqpucbxjavonbpvr.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ... (from Supabase dashboard)
```

**Frontend (.env):**
```env
VITE_STRIPE_PUBLIC_KEY=pk_...
VITE_API_URL=https://your-api.com
```

## Summary

The order confirmation email system is ready, you just need to:

1. Set up the Stripe webhook handler in your backend
2. Configure the webhook in Stripe Dashboard
3. Test with a sample purchase

The email templates and Edge Function are already deployed and working! 🎉
