-- Fix for double-counting welcome bonus
-- Run this in Supabase SQL Editor to fix the trigger

-- Drop and recreate the handle_new_user function with correct logic
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create loyalty_points record with 0 points; welcome bonus will be inserted as a transaction
  INSERT INTO public.loyalty_points (user_id, total_points, lifetime_points)
  VALUES (NEW.id, 0, 0);

  -- Create welcome bonus transaction (now 500 points = $10)
  INSERT INTO public.loyalty_transactions (user_id, points, transaction_type, source, description)
  VALUES (NEW.id, 500, 'earned', 'signup_bonus', 'Welcome bonus for joining NikHairrr!');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fix existing users who have 200 points (only run if needed)
-- This resets everyone's points to match their transactions
UPDATE loyalty_points lp
SET 
  total_points = (
    SELECT COALESCE(SUM(points), 0) 
    FROM loyalty_transactions lt 
    WHERE lt.user_id = lp.user_id
  ),
  lifetime_points = (
    SELECT COALESCE(SUM(CASE WHEN points > 0 THEN points ELSE 0 END), 0)
    FROM loyalty_transactions lt 
    WHERE lt.user_id = lp.user_id
  );

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Welcome bonus bug fixed!';
  RAISE NOTICE 'All existing users points have been corrected to match their transaction history.';
END $$;
