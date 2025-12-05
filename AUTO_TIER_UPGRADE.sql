-- Auto-Tier Upgrade Function
-- This function automatically upgrades users to Elite tier when they reach 2,500 points
-- It should be called after any points transaction

CREATE OR REPLACE FUNCTION check_and_upgrade_tier()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if user has reached 2,500 points and is still on Baby tier
  IF NEW.total_points >= 2500 AND NEW.membership_tier = 'baby' THEN
    -- Upgrade to Elite tier
    UPDATE loyalty_points
    SET 
      membership_tier = 'baby_elite',
      tier_started_at = NOW()
    WHERE user_id = NEW.user_id;
    
    -- Award 1,000 bonus points for unlocking Elite
    UPDATE loyalty_points
    SET 
      total_points = total_points + 1000,
      lifetime_points = lifetime_points + 1000
    WHERE user_id = NEW.user_id;
    
    -- Log the bonus points transaction
    INSERT INTO loyalty_transactions (
      user_id,
      points,
      transaction_type,
      source,
      description
    ) VALUES (
      NEW.user_id,
      1000,
      'earn',
      'tier_upgrade',
      'Elite tier unlock bonus - Congratulations! 🎉'
    );
    
    -- Refresh the NEW record to reflect the changes
    SELECT * INTO NEW FROM loyalty_points WHERE user_id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically check for tier upgrades after any points update
DROP TRIGGER IF EXISTS auto_tier_upgrade ON loyalty_points;
CREATE TRIGGER auto_tier_upgrade
  AFTER UPDATE OF total_points ON loyalty_points
  FOR EACH ROW
  WHEN (NEW.total_points <> OLD.total_points)
  EXECUTE FUNCTION check_and_upgrade_tier();

-- Manual function to check and upgrade a specific user (useful for testing)
CREATE OR REPLACE FUNCTION upgrade_user_if_eligible(user_id_param UUID)
RETURNS TABLE (
  upgraded BOOLEAN,
  current_tier membership_tier,
  current_points INTEGER,
  message TEXT
) AS $$
DECLARE
  v_total_points INTEGER;
  v_current_tier membership_tier;
BEGIN
  -- Get current user data
  SELECT total_points, membership_tier 
  INTO v_total_points, v_current_tier
  FROM loyalty_points
  WHERE user_id = user_id_param;
  
  -- Check if eligible for upgrade
  IF v_total_points >= 2500 AND v_current_tier = 'baby' THEN
    -- Upgrade to Elite
    UPDATE loyalty_points
    SET 
      membership_tier = 'baby_elite',
      tier_started_at = NOW(),
      total_points = total_points + 1000,
      lifetime_points = lifetime_points + 1000
    WHERE user_id = user_id_param;
    
    -- Log the transaction
    INSERT INTO loyalty_transactions (
      user_id,
      points,
      transaction_type,
      source,
      description
    ) VALUES (
      user_id_param,
      1000,
      'earn',
      'tier_upgrade',
      'Elite tier unlock bonus - Congratulations! 🎉'
    );
    
    RETURN QUERY SELECT 
      TRUE as upgraded,
      'baby_elite'::membership_tier as current_tier,
      v_total_points + 1000 as current_points,
      'Upgraded to Elite tier! Earned 1,000 bonus points.' as message;
  ELSE
    RETURN QUERY SELECT 
      FALSE as upgraded,
      v_current_tier as current_tier,
      v_total_points as current_points,
      CASE 
        WHEN v_current_tier = 'baby_elite' THEN 'Already Elite tier'
        ELSE format('Need %s more points to unlock Elite', 2500 - v_total_points)
      END as message;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Test the manual upgrade function (replace with actual user_id)
-- SELECT * FROM upgrade_user_if_eligible('YOUR-USER-ID-HERE');

COMMENT ON FUNCTION check_and_upgrade_tier() IS 'Automatically upgrades users to Elite tier when they reach 2,500 points';
COMMENT ON FUNCTION upgrade_user_if_eligible(UUID) IS 'Manually check and upgrade a user to Elite tier if they have enough points';
