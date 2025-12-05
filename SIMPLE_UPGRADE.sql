-- Simple upgrade: Add 400 points to ALL existing users who have less than 500 points
-- Run this in Supabase SQL Editor

-- Step 1: Check current state (optional - just to see what we have)
SELECT 
  u.email,
  lp.total_points,
  lp.lifetime_points
FROM auth.users u
JOIN loyalty_points lp ON u.id = lp.user_id
ORDER BY lp.created_at;

-- Step 2: Add 400 bonus points to everyone with less than 500 points
INSERT INTO public.loyalty_transactions (user_id, points, transaction_type, source, description)
SELECT 
  lp.user_id,
  400,
  'earned',
  'upgrade_bonus',
  'Loyalty program upgrade bonus - thank you for being an early member!'
FROM public.loyalty_points lp
WHERE lp.total_points < 500;

-- Step 3: Verify the upgrade worked
SELECT 
  u.email,
  lp.total_points as current_points,
  (SELECT COUNT(*) FROM loyalty_transactions WHERE user_id = lp.user_id) as transaction_count
FROM auth.users u
JOIN loyalty_points lp ON u.id = lp.user_id;
