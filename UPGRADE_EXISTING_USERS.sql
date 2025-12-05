-- Add 400 bonus points to existing users to upgrade them to 500 total
-- Run this in Supabase SQL Editor

-- Add a one-time upgrade bonus transaction for existing users
-- This gives existing users the difference (400 points) to reach 500
INSERT INTO public.loyalty_transactions (user_id, points, transaction_type, source, description)
SELECT 
  user_id,
  400,
  'earned',
  'upgrade_bonus',
  'Loyalty program upgrade bonus - thank you for being an early member!'
FROM public.loyalty_points
WHERE total_points < 500 -- Only users who haven't already received full bonus
  AND user_id IN (
    SELECT user_id 
    FROM public.loyalty_transactions 
    WHERE source = 'signup_bonus' 
    GROUP BY user_id 
    HAVING SUM(points) = 100 -- Only users who got the old 100-point welcome
  );

-- Success message
DO $$
DECLARE
  updated_count integer;
BEGIN
  SELECT COUNT(*) INTO updated_count
  FROM public.loyalty_points
  WHERE total_points >= 500;
  
  RAISE NOTICE 'Upgrade complete!';
  RAISE NOTICE '% users now have 500+ points', updated_count;
END $$;
