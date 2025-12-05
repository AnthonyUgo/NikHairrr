# Discount Codes & Points Redemption - Implementation Guide

## ✅ What's Been Implemented

Your cart now supports:
1. **Promotional discount codes** (percentage or fixed amount)
2. **Loyalty points redemption**
3. **Combined discounts** (use both at once!)
4. **Real-time validation** from YOUR database
5. **Automatic calculation** and preview before checkout

---

## 🚀 Setup Steps

### Step 1: Run the Database Schema

1. Open Supabase SQL Editor
2. Run the file: `DISCOUNT_CODES_SCHEMA.sql`
3. This creates:
   - `discount_codes` table
   - `discount_code_usage` tracking table
   - Sample discount codes (HOLIDAY10, HOLIDAY20, etc.)

### Step 2: That's It!

The code is already integrated into your cart. No additional setup needed.

---

## 📝 How to Create Discount Codes

### Option 1: Via Supabase Dashboard

1. Go to Supabase → Table Editor
2. Select `discount_codes` table
3. Click "Insert" → "Insert row"
4. Fill in:
   - **code**: `BLACKFRIDAY` (uppercase)
   - **description**: `Black Friday Sale - 25% off`
   - **type**: `percentage` or `fixed`
   - **value**: `25` (for 25% or $25)
   - **starts_at**: Start date (optional)
   - **expires_at**: End date (optional)
   - **min_purchase**: Minimum order amount (optional)
   - **max_uses**: Usage limit (optional)
   - **active**: `true`

### Option 2: Via SQL

```sql
INSERT INTO discount_codes (code, description, type, value, expires_at)
VALUES ('BLACKFRIDAY', 'Black Friday - 25% off', 'percentage', 25, '2025-12-01');
```

---

## 🎯 Example Discount Codes

### Percentage Discounts
```sql
-- 10% off
INSERT INTO discount_codes (code, description, type, value)
VALUES ('WELCOME10', 'New customer - 10% off', 'percentage', 10);

-- 25% off holiday sale
INSERT INTO discount_codes (code, description, type, value, expires_at)
VALUES ('HOLIDAY25', 'Holiday Sale - 25% off', 'percentage', 25, '2026-01-05');

-- 15% off with minimum purchase
INSERT INTO discount_codes (code, description, type, value, min_purchase)
VALUES ('SAVE15', '15% off orders over $50', 'percentage', 15, 50);
```

### Fixed Amount Discounts
```sql
-- $20 off
INSERT INTO discount_codes (code, description, type, value)
VALUES ('SAVE20', '$20 off any order', 'fixed', 20);

-- $50 off orders over $200
INSERT INTO discount_codes (code, description, type, value, min_purchase)
VALUES ('BIG50', '$50 off orders $200+', 'fixed', 50, 200);
```

---

## 🛒 How It Works

### In the Cart:

1. **Customer enters discount code**
   - Code is validated against YOUR Supabase database
   - Shows error if invalid/expired
   - Shows success with discount amount if valid

2. **Customer selects points to redeem** (if logged in)
   - Can use up to their available balance
   - Max redemption = order subtotal
   - 100 points = $1.00

3. **Preview of savings**
   - Shows promo discount amount
   - Shows points discount amount
   - Shows total savings
   - Shows final price

4. **At checkout**
   - All discount info is passed to MVMNT Pay
   - MVMNT Pay applies the discounts you calculated
   - No coordination needed!

---

## 🔧 Discount Calculation

### Percentage Discount
```
Cart: $100
Code: HOLIDAY20 (20% off)
Discount: $100 × 20% = $20
```

### Fixed Discount
```
Cart: $150
Code: SAVE20 ($20 off)
Discount: $20
```

### Points Redemption
```
Cart: $100
Points: 1500 points
Discount: 1500 ÷ 100 = $15
```

### Combined
```
Cart: $100
Promo: HOLIDAY20 (20% off) = -$20
Points: 1000 points = -$10
Final: $70
```

---

## 📊 What Gets Passed to MVMNT Pay

When customer checks out, your code sends:

```javascript
{
  line_items: [...products...],
  points_discount: 1500,        // Points discount in cents
  discount_code: "HOLIDAY20",   // Code name (for tracking)
  promo_discount: 2000,         // Promo discount in cents (YOU calculated this)
  metadata: {
    points_used: "1500",
    customer_email: "...",
    ...
  }
}
```

**MVMNT Pay just applies whatever amounts you send!**

---

## 🎨 Cart UI Features

### Discount Code Section
- Input field for code entry
- "Apply" button
- Real-time validation
- Success/error messages
- "Remove" button to clear code

### Points Section (logged-in users only)
- Shows available points balance
- Number input for points to redeem
- "Max" button to use maximum points
- Conversion rate display (100 pts = $1)

### Discount Preview
- 🎉 Promo discount amount (green)
- ⭐ Points discount amount (gold)
- Total savings message
- Updated final total

---

## 🔒 Validation Rules

Codes are automatically validated for:
- ✅ Code exists and is active
- ✅ Start date has passed (if set)
- ✅ Expiration date not reached (if set)
- ✅ Usage limit not exceeded (if set)
- ✅ Minimum purchase requirement met (if set)

Points are validated for:
- ✅ User has enough points
- ✅ Points don't exceed order total
- ✅ User is logged in

---

## 📈 Tracking & Analytics

### View Discount Usage
```sql
SELECT 
  dc.code,
  dc.description,
  dc.current_uses,
  COUNT(dcu.id) as total_redemptions,
  SUM(dcu.discount_amount) as total_discounted
FROM discount_codes dc
LEFT JOIN discount_code_usage dcu ON dc.id = dcu.discount_code_id
GROUP BY dc.id
ORDER BY total_redemptions DESC;
```

### Most Popular Codes
```sql
SELECT code, current_uses, description
FROM discount_codes
WHERE active = true
ORDER BY current_uses DESC
LIMIT 10;
```

---

## 🎯 Best Practices

### Code Naming
- Use clear, memorable codes: `HOLIDAY25`, not `XYZ123`
- Keep it short: 6-15 characters
- All UPPERCASE for consistency

### Expiration
- Always set expiration dates for limited-time offers
- Leave null for permanent codes

### Usage Limits
- Set `max_uses` for limited quantity promotions
- Leave null for unlimited use

### Minimum Purchase
- Set `min_purchase` to encourage larger orders
- Example: $50 minimum for 20% off codes

---

## 🚨 Important Notes

1. **You control all discount codes** - No need to coordinate with MVMNT Pay
2. **You calculate the discount** - MVMNT Pay just applies your calculation
3. **Codes are in YOUR database** - Full control over creation/expiration
4. **Real-time validation** - Customers see instant feedback
5. **Points are separate** - Managed through your membership system

---

## 🔄 After Payment Success

You'll need to:
1. Deduct points from user's balance (if they redeemed any)
2. Record the discount usage (for tracking)
3. Send confirmation email with savings breakdown

This will be handled via webhook from MVMNT Pay (coming soon).

---

## 🎉 Sample Promotional Codes Included

The schema comes with these test codes:
- `HOLIDAY10` - 10% off (30 days)
- `HOLIDAY20` - 20% off (30 days)  
- `WELCOME15` - 15% off (90 days)
- `SAVE20` - $20 off (60 days)
- `NEWYEAR2026` - 25% off (Dec 26 - Jan 5)

**Test them out!**

---

## 📞 Need Help?

Check the files:
- `src/utils/discounts.ts` - Validation logic
- `src/components/CartDrawer.tsx` - UI implementation
- `src/utils/mvmntpay.ts` - Checkout integration

---

**You now have full control over discounts without touching Stripe or coordinating with MVMNT Pay! 🎊**
