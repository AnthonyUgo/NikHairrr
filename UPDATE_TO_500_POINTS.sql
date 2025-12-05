-- Update existing schema to use 500 points welcome bonus
-- Run this in Supabase SQL Editor

-- Update the handle_new_user function to give 500 points instead of 100
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create loyalty record with zero; welcome bonus is added via a transaction below
  INSERT INTO public.loyalty_points (user_id, total_points, lifetime_points)
  VALUES (NEW.id, 0, 0);

  -- Create welcome bonus transaction (500 points = $10)
  INSERT INTO public.loyalty_transactions (user_id, points, transaction_type, source, description)
  VALUES (NEW.id, 500, 'earned', 'signup_bonus', 'Welcome bonus for joining NikHairrr!');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fix existing users' points to match their actual transactions
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
  ),
  updated_at = NOW();

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Schema updated successfully!';
  RAISE NOTICE 'New users will receive 500 welcome points.';
  RAISE NOTICE 'Existing users points corrected to match transaction history.';
END $$;
