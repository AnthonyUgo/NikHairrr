# Quick Setup Guide - Membership System

## 🚀 Steps to Activate

### 1. Run Database Migration

In your Supabase SQL Editor, run:

```sql
-- Copy and paste the entire MEMBERSHIP_TIERS_SCHEMA.sql file
```

This will add membership tier support to your existing loyalty system.

### 2. Test the Features

1. **Visit your site** - You should see the purple membership banner at the top
2. **Click "LEARN MORE"** on the banner → Goes to `/membership` page
3. **Review the two tiers:**
   - NikHairrr Baby (Free)
   - NikHairrr Baby Elite ($25/month)
4. **Sign up a new account** - Automatically gets 500 points and 'baby' tier
5. **Check dashboard** - See tier badge and points

### 3. Verify Database Updates

In Supabase, check the `loyalty_points` table:

```sql
SELECT 
  user_id,
  membership_tier,
  total_points,
  tier_started_at,
  subscription_status
FROM loyalty_points;
```

All users should have `membership_tier = 'baby'` and new signups should have 500 points.

## 🎯 What Users See

### Banner (All Pages)
- Purple gradient banner promoting membership
- "Become a NikHairrr Baby and get 500 points upon signup"
- Dismissible with X button
- "LEARN MORE" button

### Navbar
- New "Rewards" link (purple with star icon)
- Goes to membership page

### Membership Page (`/membership`)
- Tier comparison cards
- Benefits listed for each tier
- "How It Works" section
- FAQ section
- Join buttons (triggers signup for non-logged users)

### Member Dashboard
- Tier badge at top (⭐ Baby or 👑 Elite)
- Color-coded based on tier
- Shows points multiplier
- Tier-specific information card

## 🔧 Configuration

### Adjust Points Values
Edit `MEMBERSHIP_TIERS_SCHEMA.sql`:

```sql
-- Change signup bonuses
WHEN 'baby' THEN RETURN 500;         -- Free tier bonus
WHEN 'baby_elite' THEN RETURN 1000;  -- Elite tier bonus

-- Change points multipliers
WHEN 'baby' THEN RETURN 1;           -- 1x points
WHEN 'baby_elite' THEN RETURN 2;     -- 2x points
```

### Customize Tier Benefits
Edit `src/pages/Membership.tsx` - Update the `MEMBERSHIP_TIERS` array.

### Change Banner Message
Edit `src/components/MembershipBanner.tsx` - Update the text in the JSX.

## 💳 Elite Tier Payment (TODO)

Currently, Elite tier selection shows an alert. To enable payments:

1. Create Stripe subscription product ($25/month)
2. In `Membership.tsx`, update `handleJoinTier`:
   ```typescript
   // Replace alert with:
   const stripe = await loadStripe('your_public_key');
   // Create checkout session for subscription
   // On success webhook, call upgrade_to_elite()
   ```
3. Set up Stripe webhook to call database function when subscription succeeds

## 📱 Mobile Responsive

All components are fully responsive:
- Banner adjusts spacing on mobile
- Membership cards stack on small screens
- Navbar items hide text on mobile (icons only)

## ✅ Testing Checklist

- [ ] Banner appears on page load
- [ ] Banner is dismissible
- [ ] Clicking banner links to `/membership`
- [ ] Navbar has "Rewards" link
- [ ] Membership page displays two tiers
- [ ] New signups receive 500 points
- [ ] Dashboard shows tier badge
- [ ] Tier information displays correctly

## 🎨 Customization

### Colors
- **Baby Tier**: `#9333ea` (purple)
- **Elite Tier**: `#eab308` (gold)

Change these in:
- `Membership.tsx` (MEMBERSHIP_TIERS array)
- `MemberDashboard.tsx` (gradient backgrounds)
- `MembershipBanner.tsx` (banner background)

---

**All set!** Your membership system is ready to go. Users can now sign up, earn points, and see their tier status.
