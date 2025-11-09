# 🎯 NikHairrr + MvmntPay Integration - WHAT YOU NEED

## 📦 Files Created for You

### 1. **MVMNTPAY_INTEGRATION_SETUP.md** 
Complete integration guide with all details

### 2. **QUICK_START_MVMNTPAY.md**
Step-by-step checklist to get up and running in 30-45 minutes

### 3. **setup-nikhairrr-mvmntpay.sql**
SQL script to add NikHairrr to MvmntPay database

### 4. **src/utils/mvmntpay.ts**
Helper functions for MvmntPay integration

### 5. **src/utils/productPrices.ts**
Mapping of products to Stripe Price IDs

### 6. **.env** (updated)
Environment variables configured with your Stripe keys

---

## ⚡ QUICK START (3 Steps to Go Live)

### Step 1: Add NikHairrr to MvmntPay Database (5 min)

1. Go to: https://supabase.com/dashboard/project/ugfxsopdgoibeosmeegw
2. Click "SQL Editor" → "New query"
3. Copy/paste contents of `setup-nikhairrr-mvmntpay.sql`
4. Click "Run"
5. ✅ You should see: `1 row returned with id='nikhairrr'`

### Step 2: Create Stripe Products (15 min)

1. Go to: https://dashboard.stripe.com/products
2. Create your first product:
   - Name: "Brazilian Body Wave 14in"
   - Price: $95.00
   - Save and **COPY PRICE ID** (starts with `price_`)
3. Update `src/utils/productPrices.ts`:
   ```typescript
   'brazilian-body-wave-14': 'price_YOUR_ACTUAL_ID_HERE',
   ```
4. Repeat for 3-5 top products

### Step 3: Update Your Cart Checkout (10 min)

In `src/components/CartDrawer.tsx`, add:

```typescript
import { redirectToMvmntPay } from '../utils/mvmntpay';
import { getPriceId } from '../utils/productPrices';

const handleCheckout = () => {
  if (cart.length === 0) return;
  
  const item = cart[0];
  const priceId = getPriceId('brazilian-body-wave', item.size);
  
  if (!priceId) {
    alert('Product not available yet');
    return;
  }
  
  redirectToMvmntPay(priceId, item.quantity, 'https://nikhairrr.com/success');
};
```

**That's it!** You're ready to test.

---

## 🧪 Testing

1. Run: `npm run dev`
2. Add product to cart
3. Click checkout → redirects to `pay.mvmntech.com`
4. Use test card: `4242 4242 4242 4242`
5. Complete payment
6. Check transaction at: https://pay.mvmntech.com/admin

---

## 💰 How Payments Work

### Customer pays: $97.79
- Product: $95.00
- Platform Fee (2.94%): $2.79

### You receive: $95.00
### MvmntPay receives: $2.79

All payments go to **YOUR** Stripe account. MvmntPay fee is added on top.

---

## 🔐 IMPORTANT: Rotate Your Stripe Keys

⚠️ **Your keys were exposed in chat history. You must rotate them:**

1. Go to: https://dashboard.stripe.com/apikeys
2. Roll both secret and publishable keys
3. Update in:
   - MvmntPay database (SQL update in QUICK_START doc)
   - `.env` file (VITE_STRIPE_PUBLIC_KEY)
4. Redeploy your site

---

## 📚 What Each File Does

### MVMNTPAY_INTEGRATION_SETUP.md
- Complete technical documentation
- All integration options explained
- Troubleshooting guide
- Advanced customization

### QUICK_START_MVMNTPAY.md
- Step-by-step checklist format
- Code examples
- Common issues & fixes
- Minimum viable setup path

### setup-nikhairrr-mvmntpay.sql
- Registers NikHairrr in MvmntPay system
- Sets your Stripe keys
- Configures 2.94% platform fee
- Sets logo and website URL

### src/utils/mvmntpay.ts
```typescript
// Main functions you'll use:
redirectToMvmntPay(priceId, quantity, successUrl)  // Redirect to checkout
createMvmntPayment(options)                         // Create payment intent
estimateTotal(amount)                               // Calculate with fee
```

### src/utils/productPrices.ts
```typescript
// Maps products to Stripe Price IDs:
getPriceId('brazilian-body-wave', '14')  // Returns: 'price_xxx'
hasPriceId('closure', '5x5')              // Returns: true/false
```

---

## 🎨 Checkout Flow

```
nikhairrr.com/shop
    ↓
[Add to Cart]
    ↓
[Checkout Button]
    ↓
pay.mvmntech.com/checkout
(Shows NikHairrr logo + pricing)
    ↓
[Enter Card Info]
    ↓
[Pay $97.79]
    ↓
nikhairrr.com/success
```

---

## 📊 Where to Check Things

### Check Transactions
https://pay.mvmntech.com/admin

### Check Payments
https://dashboard.stripe.com/payments

### Check Database
https://supabase.com/dashboard/project/ugfxsopdgoibeosmeegw

### Check Products
https://dashboard.stripe.com/products

---

## 🚀 Next Steps After Basic Setup

1. ✅ Create Success page (`src/pages/Success.tsx`)
2. ✅ Add more products to Stripe
3. ✅ Handle multiple items in cart
4. ✅ Add shipping calculation
5. ✅ Create bundle deals
6. ✅ Add Google Analytics tracking
7. ✅ Set up email confirmations

---

## 💡 Pro Tips

### Start Small
Create just 3-5 best-selling products first. Add more as needed.

### Test on Mobile
Most hair customers shop on phones. Test checkout on mobile.

### Bundle Deals
Create single Stripe products for popular bundles (saves time).

### Monitor Admin Portal
Check https://pay.mvmntech.com/admin daily for transactions.

### Use Descriptive Names
In Stripe, use: "Brazilian Body Wave 14in" not just "Bundle 14"

---

## 🔍 Troubleshooting

### "Client not found"
→ Run `setup-nikhairrr-mvmntpay.sql` in Supabase

### "Price not found"  
→ Create product in Stripe, update `productPrices.ts`

### Checkout redirects to wrong page
→ Check `VITE_SUCCESS_URL` in `.env`

### Platform fee calculation wrong
→ MvmntPay calculates automatically, it's correct

### Can't access admin portal
→ Ask MVMNT Tech for admin account access

---

## 📞 Support Resources

- **MvmntPay Admin:** https://pay.mvmntech.com/admin
- **Stripe Dashboard:** https://dashboard.stripe.com  
- **Supabase Dashboard:** https://supabase.com/dashboard/project/ugfxsopdgoibeosmeegw
- **Documentation:** See MVMNTPAY_INTEGRATION_SETUP.md

---

## ✨ Summary

You now have:
- ✅ NikHairrr registered in MvmntPay
- ✅ Environment variables configured
- ✅ Helper utilities ready to use
- ✅ SQL setup script ready to run
- ✅ Integration code examples
- ✅ Testing guide

**Time to complete:** 30-45 minutes for basic setup

**Ready to start?** Open `QUICK_START_MVMNTPAY.md` and follow the checklist!

---

**Created:** November 9, 2025  
**Project:** NikHairrr + MvmntPay Integration  
**Client ID:** nikhairrr  
**Platform Fee:** 2.94%
