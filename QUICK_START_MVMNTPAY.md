# NikHairrr + MvmntPay Quick Start Checklist

## ✅ Complete These Steps in Order

### 1. Database Setup (5 minutes)
- [ ] Go to https://supabase.com/dashboard/project/ugfxsopdgoibeosmeegw
- [ ] Click "SQL Editor" → "New query"
- [ ] Copy and paste contents of `setup-nikhairrr-mvmntpay.sql`
- [ ] Click "Run"
- [ ] Verify: You should see 1 row returned with id='nikhairrr'

**What this does:** Registers NikHairrr as a client in the MvmntPay system

---

### 2. Create Stripe Products (15-30 minutes)
- [ ] Go to https://dashboard.stripe.com/products
- [ ] For each product you want to sell:
  - [ ] Click "Add product"
  - [ ] Enter product name (e.g., "Brazilian Body Wave 14in")
  - [ ] Enter price (e.g., $95.00)
  - [ ] Click "Save product"
  - [ ] **COPY THE PRICE ID** (starts with `price_`)
  - [ ] Paste into `src/utils/productPrices.ts`

**Priority products to create first:**
1. Brazilian Body Wave 14" - $95
2. Brazilian Body Wave 16" - $105
3. Brazilian Body Wave 18" - $115
4. 5x5 HD Closure - $120
5. 13x4 HD Frontal - $150

**Example:**
```typescript
// In src/utils/productPrices.ts
'brazilian-body-wave-14': 'price_1ABCdefGHI123xyz',  // Replace with actual
```

---

### 3. Update Environment Variables (2 minutes)
- [ ] Open `.env` file in NikHairrr project
- [ ] Update to this:

```bash
# NikHairrr Stripe Keys (LIVE)
VITE_STRIPE_PUBLIC_KEY=pk_live_51SRa7PJLcxQ0xaoLNpiIqs3R7z5DJcMqnIF7t46WoNI2GIKM5Kw54t5Stnv3HmhPLJPBBwlaJGVTZQyT6r4ZilbU00Q2LJmoFI

# MvmntPay Integration
VITE_MVMNTPAY_CLIENT_ID=nikhairrr
VITE_MVMNTPAY_API_URL=https://pay.mvmntech.com/api

# URLs
VITE_SUCCESS_URL=https://nikhairrr.com/success
VITE_CANCEL_URL=https://nikhairrr.com/shop
VITE_API_URL=https://pay.mvmntech.com/api
```

---

### 4. Test Integration (10 minutes)
- [ ] Run dev server: `npm run dev`
- [ ] Add a test product to cart (one you created in Stripe)
- [ ] Click checkout
- [ ] Should redirect to: `pay.mvmntech.com/checkout?clientId=nikhairrr&priceId=price_xxx`
- [ ] Use Stripe test card: `4242 4242 4242 4242`
- [ ] Complete checkout
- [ ] Verify redirect to success page
- [ ] Check payment in Stripe Dashboard

**Test cards:**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

---

### 5. Verify Transaction (5 minutes)
- [ ] Go to https://pay.mvmntech.com/admin
- [ ] Sign in with your MvmntPay admin account
- [ ] Click "Transactions" tab
- [ ] Find your test transaction
- [ ] Verify:
  - Client: NikHairrr
  - Amount: Correct
  - Status: Succeeded
  - Platform fee: 2.94% calculated correctly

---

### 6. Go Live! (5 minutes)
- [ ] Update CartDrawer component to use MvmntPay checkout
- [ ] Add Success page for post-payment redirect
- [ ] Test on mobile device
- [ ] Deploy to production
- [ ] Make real test purchase
- [ ] Verify money in your Stripe account

---

### 7. Security (IMPORTANT - 10 minutes)
⚠️ **Your Stripe keys were exposed in chat. Rotate them:**

- [ ] Go to https://dashboard.stripe.com/apikeys
- [ ] Click "..." next to Secret key → "Roll key"
- [ ] Copy new secret key
- [ ] Update in MvmntPay database:
  ```sql
  UPDATE clients 
  SET stripe_secret_key = 'sk_live_NEW_KEY_HERE'
  WHERE id = 'nikhairrr';
  ```
- [ ] Also roll publishable key for safety
- [ ] Update `.env` with new publishable key

---

## 🎯 Minimum Viable Setup (Fast Track - 20 minutes)

If you want to get working ASAP, do this:

1. ✅ Run SQL setup (Step 1)
2. ✅ Create just ONE product in Stripe (e.g., "Brazilian Body Wave 14in - $95")
3. ✅ Add its price ID to productPrices.ts
4. ✅ Update .env
5. ✅ Test checkout with that one product
6. ✅ Create more products later as needed

---

## 📝 Implementation Code Examples

### Option A: Simple Redirect (Recommended to start)

Update `src/components/CartDrawer.tsx`:

```typescript
import { redirectToMvmntPay } from '../utils/mvmntpay';
import { getPriceId } from '../utils/productPrices';

// In your checkout button handler:
const handleCheckout = () => {
  if (cart.length === 0) {
    alert('Your cart is empty');
    return;
  }
  
  // For now, handle first item only
  const item = cart[0];
  
  // Get price ID for this product
  const priceId = getPriceId('brazilian-body-wave', item.size);
  
  if (!priceId) {
    alert('This product is not yet available for purchase');
    return;
  }
  
  // Redirect to MvmntPay
  redirectToMvmntPay(priceId, item.quantity, 'https://nikhairrr.com/success');
};
```

### Option B: Show Fee Before Checkout (Better UX)

```typescript
import { estimateTotal } from '../utils/mvmntpay';

// Calculate total with platform fee
const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
const total = estimateTotal(subtotal);
const platformFee = total - subtotal;

// Display in your cart:
<div className="cart-summary">
  <div>Subtotal: ${subtotal.toFixed(2)}</div>
  <div>Platform Fee (2.94%): ${platformFee.toFixed(2)}</div>
  <div>Total: ${total.toFixed(2)}</div>
</div>
```

---

## 🐛 Common Issues & Fixes

### "Client not found"
→ Run the SQL setup script in Supabase

### "Price not found"
→ Create the product in Stripe and add price ID to productPrices.ts

### "This product is not yet available"
→ Check if priceId is 'price_REPLACE_ME' - replace with real price ID

### Redirect to wrong URL after payment
→ Update VITE_SUCCESS_URL in .env

### Platform fee calculation wrong
→ MvmntPay calculates it automatically - shows in breakdown

---

## 💡 Pro Tips

1. **Start with 3-5 best-selling products** - don't create everything at once
2. **Test on mobile first** - most hair customers shop on phones
3. **Create bundle deals** in Stripe for popular combinations
4. **Use descriptive product names** in Stripe (include texture + length)
5. **Monitor admin dashboard** for failed payments

---

## 📞 Support

- **MvmntPay Admin:** https://pay.mvmntech.com/admin
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Supabase Dashboard:** https://supabase.com/dashboard/project/ugfxsopdgoibeosmeegw

---

## ✨ You're Ready!

Once you complete Steps 1-4, you'll have a working checkout. The rest can be done incrementally.

**Total time:** 30-45 minutes for basic setup

Good luck! 🚀
