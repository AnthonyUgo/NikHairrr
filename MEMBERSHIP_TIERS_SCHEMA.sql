-- Enhanced Membership Tiers Schema for NikHairrr
-- Adds membership tiers (Baby and Baby Elite) to existing loyalty system

-- Create membership_tiers enum
CREATE TYPE membership_tier AS ENUM ('baby', 'baby_elite');

-- Add tier column to loyalty_points table
ALTER TABLE loyalty_points
ADD COLUMN IF NOT EXISTS membership_tier membership_tier DEFAULT 'baby',
ADD COLUMN IF NOT EXISTS tier_started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS stripe_subscription_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS subscription_status VARCHAR(50) DEFAULT 'active';

-- Update existing users to 'baby' tier if null
UPDATE loyalty_points 
SET membership_tier = 'baby' 
WHERE membership_tier IS NULL;

-- Function to get points multiplier based on tier
CREATE OR REPLACE FUNCTION get_points_multiplier(tier membership_tier)
RETURNS INTEGER AS $$
BEGIN
  CASE tier
    WHEN 'baby' THEN RETURN 1;
    WHEN 'baby_elite' THEN RETURN 2;
    ELSE RETURN 1;
  END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to get signup bonus based on tier
CREATE OR REPLACE FUNCTION get_signup_bonus(tier membership_tier)
RETURNS INTEGER AS $$
BEGIN
  CASE tier
    WHEN 'baby' THEN RETURN 500;
    WHEN 'baby_elite' THEN RETURN 1000;
    ELSE RETURN 500;
  END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Update the handle_new_user function to support tiers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  signup_bonus INTEGER;
BEGIN
  -- Create loyalty record with 'baby' tier by default
  INSERT INTO public.loyalty_points (user_id, total_points, lifetime_points, membership_tier)
  VALUES (NEW.id, 0, 0, 'baby');

  -- Get signup bonus for 'baby' tier (500 points)
  signup_bonus := get_signup_bonus('baby');

  -- Create welcome bonus transaction
  INSERT INTO public.loyalty_transactions (user_id, points, transaction_type, source, description)
  VALUES (NEW.id, signup_bonus, 'earned', 'signup_bonus', 'Welcome to NikHairrr! Here are your ' || signup_bonus || ' bonus points!');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to upgrade user to Elite tier
CREATE OR REPLACE FUNCTION upgrade_to_elite(
  p_user_id UUID,
  p_stripe_subscription_id VARCHAR(255)
)
RETURNS VOID AS $$
DECLARE
  elite_bonus INTEGER := 500; -- Additional 500 points (1000 total - 500 already received)
BEGIN
  -- Update tier
  UPDATE loyalty_points
  SET 
    membership_tier = 'baby_elite',
    tier_started_at = NOW(),
    stripe_subscription_id = p_stripe_subscription_id,
    subscription_status = 'active',
    updated_at = NOW()
  WHERE user_id = p_user_id;

  -- Add elite upgrade bonus (extra 500 points to make it 1000 total)
  INSERT INTO loyalty_transactions (user_id, points, transaction_type, source, description)
  VALUES (p_user_id, elite_bonus, 'earned', 'tier_upgrade', 'Elite tier upgrade bonus! Welcome to the VIP club!');
END;
$$ LANGUAGE plpgsql;

-- Function to downgrade from Elite (if subscription cancelled)
CREATE OR REPLACE FUNCTION downgrade_from_elite(p_user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE loyalty_points
  SET 
    membership_tier = 'baby',
    tier_started_at = NOW(),
    subscription_status = 'inactive',
    updated_at = NOW()
  WHERE user_id = p_user_id;

  -- Log the downgrade
  INSERT INTO loyalty_transactions (user_id, points, transaction_type, source, description)
  VALUES (p_user_id, 0, 'tier_change', 'tier_downgrade', 'Downgraded to Baby tier');
END;
$$ LANGUAGE plpgsql;

-- Create view for member benefits
CREATE OR REPLACE VIEW member_benefits AS
SELECT 
  lp.user_id,
  lp.membership_tier,
  lp.total_points,
  lp.lifetime_points,
  CASE lp.membership_tier
    WHEN 'baby' THEN 1
    WHEN 'baby_elite' THEN 2
  END as points_multiplier,
  CASE lp.membership_tier
    WHEN 'baby' THEN FALSE
    WHEN 'baby_elite' THEN TRUE
  END as free_shipping_all_orders,
  CASE lp.membership_tier
    WHEN 'baby' THEN 0
    WHEN 'baby_elite' THEN 15
  END as discount_percentage,
  lp.tier_started_at,
  lp.subscription_status
FROM loyalty_points lp;

-- Grant permissions on new functions and view
GRANT EXECUTE ON FUNCTION get_points_multiplier(membership_tier) TO authenticated;
GRANT EXECUTE ON FUNCTION get_signup_bonus(membership_tier) TO authenticated;
GRANT SELECT ON member_benefits TO authenticated;

-- Create index for membership tier queries
CREATE INDEX IF NOT EXISTS idx_loyalty_points_tier ON loyalty_points(membership_tier);

COMMENT ON COLUMN loyalty_points.membership_tier IS 'Membership tier: baby (free) or baby_elite ($25/month)';
COMMENT ON COLUMN loyalty_points.tier_started_at IS 'When user joined or last changed their tier';
COMMENT ON COLUMN loyalty_points.stripe_subscription_id IS 'Stripe subscription ID for Elite members';
COMMENT ON COLUMN loyalty_points.subscription_status IS 'Status of subscription: active, inactive, cancelled, past_due';

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Membership tiers schema created successfully!';
  RAISE NOTICE 'Baby tier: Free, 500 points signup, 1 point per $1';
  RAISE NOTICE 'Baby Elite tier: $25/month, 1000 points signup, 2 points per $1';
END $$;
