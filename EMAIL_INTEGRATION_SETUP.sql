-- Email Integration Setup for NikHairrr
-- This creates webhooks/triggers to call the send-email Edge Function

-- IMPORTANT: Before running this, make sure you have:
-- 1. Deployed the send-email Edge Function
-- 2. Added SENDGRID_API_KEY to Supabase Edge Function secrets
-- 3. Have your Supabase URL and service role key ready

-- Enable HTTP extension for making requests to Edge Functions
CREATE EXTENSION IF NOT EXISTS http WITH SCHEMA extensions;

-- Function to send welcome email when user signs up
CREATE OR REPLACE FUNCTION public.send_welcome_email()
RETURNS TRIGGER AS $$
DECLARE
  user_name TEXT;
  request_id BIGINT;
BEGIN
  -- Get user's full name from metadata
  user_name := COALESCE(NEW.raw_user_meta_data->>'full_name', 'Member');
  
  -- Call the send-email Edge Function
  SELECT extensions.http_post(
    url := 'https://qkrlaqpucbxjavonbpvr.supabase.co/functions/v1/send-email',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer SERVICE_ROLE_KEY_HERE"}'::jsonb,
    body := json_build_object(
      'to', NEW.email,
      'templateType', 'welcome',
      'data', json_build_object(
        'userName', user_name,
        'points', 500
      )
    )::text
  ) INTO request_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to send welcome email on signup
DROP TRIGGER IF EXISTS on_user_signup_send_email ON auth.users;
CREATE TRIGGER on_user_signup_send_email
  AFTER INSERT ON auth.users
  FOR EACH ROW
  WHEN (NEW.email IS NOT NULL AND NEW.email_confirmed_at IS NOT NULL)
  EXECUTE FUNCTION public.send_welcome_email();


-- Function to send elite unlock email when user reaches Elite tier (2,500 points)
CREATE OR REPLACE FUNCTION public.send_elite_unlock_email()
RETURNS TRIGGER AS $$
DECLARE
  user_email TEXT;
  user_name TEXT;
  request_id BIGINT;
BEGIN
  -- Trigger when user crosses 2,500 points threshold
  -- This indicates they've reached Elite tier
  IF OLD.total_points < 2500 AND NEW.total_points >= 2500 THEN
    -- Get user email and name
    SELECT 
      u.email,
      COALESCE(u.raw_user_meta_data->>'full_name', 'Member')
    INTO user_email, user_name
    FROM auth.users u
    WHERE u.id = NEW.user_id;
    
    -- Call the send-email Edge Function
    SELECT extensions.http_post(
      url := 'https://qkrlaqpucbxjavonbpvr.supabase.co/functions/v1/send-email',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer SERVICE_ROLE_KEY_HERE"}'::jsonb,
      body := json_build_object(
        'to', user_email,
        'templateType', 'elite-unlock',
        'data', json_build_object(
          'userName', user_name,
          'totalPoints', NEW.total_points,
          'bonusPoints', 1000
        )
      )::text
    ) INTO request_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to send elite unlock email when points reach 2,500
DROP TRIGGER IF EXISTS on_elite_unlock_send_email ON loyalty_points;
CREATE TRIGGER on_elite_unlock_send_email
  AFTER UPDATE OF total_points ON loyalty_points
  FOR EACH ROW
  WHEN (OLD.total_points < 2500 AND NEW.total_points >= 2500)
  EXECUTE FUNCTION public.send_elite_unlock_email();


-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Email trigger functions created successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '📧 Emails will now automatically send when:';
  RAISE NOTICE '  ✓ New user signs up → Welcome email with 500 points';
  RAISE NOTICE '  ✓ User reaches Elite tier → Congratulations email with 1,000 bonus points';
  RAISE NOTICE '';
  RAISE NOTICE '🧪 Test by creating a new user account or upgrading an existing user to Elite!';
END $$;
