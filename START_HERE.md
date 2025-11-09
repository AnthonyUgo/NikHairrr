# 🎯 WHAT YOU NEED TO DO - Simple Version

## ✅ Your Setup is 90% Done!

I've created all the files you need. Here's what's left to do:

---

## 🚀 3 Steps to Go Live (30 minutes)

### STEP 1: Add NikHairrr to Database (5 minutes)

1. Open browser: https://supabase.com/dashboard/project/ugfxsopdgoibeosmeegw
2. Click "SQL Editor" 
3. Click "New query"
4. Open file: `setup-nikhairrr-mvmntpay.sql`
5. Copy ALL the text
6. Paste into Supabase SQL Editor
7. Click "Run" button (bottom right)
8. ✅ Success if you see: "1 row returned"

**What this does:** Registers NikHairrr in MvmntPay system with your Stripe keys.

---

### STEP 2: Create Products in Stripe (15 minutes)

1. Open: https://dashboard.stripe.com/products
2. Click "Add product"
3. Fill in:
   - **Name:** Brazilian Body Wave 14in
   - **Price:** 95.00
   - **Currency:** USD
4. Click "Save product"
5. **IMPORTANT:** Copy the Price ID (looks like: `price_1ABCdef123xyz`)
6. Open: `src/utils/productPrices.ts`
7. Find this line:
   ```typescript
   'brazilian-body-wave-14': 'price_REPLACE_ME',
   ```
8. Replace `price_REPLACE_ME` with your actual price ID:
   ```typescript
   'brazilian-body-wave-14': 'price_1ABCdef123xyz',
   ```

**Repeat for your top 3-5 products.** You can add more later!

**Quick list to create:**
- Brazilian Body Wave 14" - $95
- Brazilian Body Wave 16" - $105
- Brazilian Body Wave 18" - $115
- 5x5 HD Closure - $120
- 13x4 HD Frontal - $150

---

### STEP 3: Test It! (10 minutes)

1. Open Terminal
2. Navigate to project:
   ```bash
   cd "/Users/MadeMuvs/Documents/GitHub 2/NikHairrr"
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```
4. Open site in browser
5. Add a product to cart (one you created in Stripe)
6. For now, to test, temporarily update `CartDrawer.tsx`:
   
   Add at the top:
   ```typescript
   import { redirectToMvmntPay } from '../utils/mvmntpay';
   import { getPriceId } from '../utils/productPrices';
   ```
   
   Add a test button:
   ```typescript
   <button onClick={() => {
     const priceId = getPriceId('brazilian-body-wave', '14');
     if (priceId) {
       redirectToMvmntPay(priceId, 1, 'https://nikhairrr.com/success');
     }
   }}>
     Test MvmntPay Checkout
   </button>
   ```

7. Click the test button
8. Should redirect to: `pay.mvmntech.com/checkout`
9. Use test card: `4242 4242 4242 4242`
10. Complete checkout
11. ✅ Success!

---

## 📋 What I Created For You

### Files Created:

1. **SETUP_SUMMARY.md** ← Read this first
2. **QUICK_START_MVMNTPAY.md** ← Step-by-step checklist
3. **MVMNTPAY_INTEGRATION_SETUP.md** ← Complete documentation
4. **setup-nikhairrr-mvmntpay.sql** ← Database setup script
5. **src/utils/mvmntpay.ts** ← Helper functions
6. **src/utils/productPrices.ts** ← Product-to-price mapping
7. **EXAMPLE_CARTDRAWER_UPDATE.tsx** ← Code examples
8. **.env** ← Updated with your keys

### What's Already Done:

✅ Stripe keys configured in .env  
✅ Helper utilities created  
✅ Database SQL script ready  
✅ Integration code written  
✅ Documentation complete  

### What You Need To Do:

⬜ Run SQL script in Supabase (Step 1)  
⬜ Create 3-5 products in Stripe (Step 2)  
⬜ Update productPrices.ts with price IDs  
⬜ Test checkout flow  
⬜ Integrate into CartDrawer fully  
⬜ Create Success page  

---

## 💰 How Money Flows

```
Customer pays: $97.79
    ↓
├─ Your product: $95.00 → Your Stripe account ✅
└─ Platform fee: $2.79 → MvmntPay
```

**You get:** $95.00  
**MvmntPay gets:** $2.79  
**Customer pays:** $97.79 total

---

## 🔑 Important URLs

**Add NikHairrr to Database:**  
https://supabase.com/dashboard/project/ugfxsopdgoibeosmeegw

**Create Stripe Products:**  
https://dashboard.stripe.com/products

**View Transactions:**  
https://pay.mvmntech.com/admin

**Check Payments:**  
https://dashboard.stripe.com/payments

---

## ⚠️ SECURITY WARNING

**Your Stripe keys were exposed in our chat.** After setup, rotate them:

1. Go to: https://dashboard.stripe.com/apikeys
2. Click "..." next to Secret Key → "Roll key"
3. Copy new secret key
4. Update in Supabase:
   ```sql
   UPDATE clients 
   SET stripe_secret_key = 'sk_live_NEW_KEY_HERE'
   WHERE id = 'nikhairrr';
   ```
5. Also roll publishable key
6. Update `.env` with new publishable key

---

## 📞 Need Help?

Check these docs in order:

1. **SETUP_SUMMARY.md** - Overview of everything
2. **QUICK_START_MVMNTPAY.md** - Detailed checklist
3. **MVMNTPAY_INTEGRATION_SETUP.md** - Complete guide
4. **EXAMPLE_CARTDRAWER_UPDATE.tsx** - Code examples

---

## 🎯 Quick Reference

### To redirect to checkout:
```typescript
import { redirectToMvmntPay } from './utils/mvmntpay';
import { getPriceId } from './utils/productPrices';

const priceId = getPriceId('brazilian-body-wave', '14');
redirectToMvmntPay(priceId, 1, 'https://nikhairrr.com/success');
```

### To show platform fee:
```typescript
import { estimateTotal } from './utils/mvmntpay';

const subtotal = 95.00;
const total = estimateTotal(subtotal);  // Returns: 97.79
const fee = total - subtotal;            // Returns: 2.79
```

### Your Client ID:
```
nikhairrr
```

### Your Platform Fee:
```
2.94%
```

---

## ✨ You're Ready!

Everything is set up. Just follow the 3 steps above and you'll be accepting payments in 30 minutes.

**Start here:** Run the SQL script (Step 1)

---

**Questions?** Check the documentation files or contact MVMNT Tech support.

**Created:** November 9, 2025  
**Project:** NikHairrr.com  
**Payment System:** MvmntPay
