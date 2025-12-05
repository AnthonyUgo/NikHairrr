-- Email Triggers for SendGrid Integration
-- Run this in Supabase SQL Editor after deploying the send-email Edge Function

-- Enable the pg_net extension for making HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Function to send welcome email when user signs up
CREATE OR REPLACE FUNCTION public.send_welcome_email()
RETURNS TRIGGER AS $$
DECLARE
  user_name TEXT;
  function_url TEXT;
  service_role_key TEXT;
BEGIN
  -- Get user's full name from metadata
  user_name := COALESCE(NEW.raw_user_meta_data->>'full_name', 'Member');
  
  -- Construct the Edge Function URL
  function_url := current_setting('app.settings.supabase_url', true) || '/functions/v1/send-email';
  service_role_key := current_setting('app.settings.service_role_key', true);
  
  -- Make async HTTP request to send email
  PERFORM net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || service_role_key
    ),
    body := jsonb_build_object(
      'to', NEW.email,
      'templateType', 'welcome',
      'data', jsonb_build_object(
        'userName', user_name,
        'points', 500
      )
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to send welcome email on signup
DROP TRIGGER IF EXISTS on_user_signup_send_email ON auth.users;
CREATE TRIGGER on_user_signup_send_email
  AFTER INSERT ON auth.users
  FOR EACH ROW
  WHEN (NEW.email IS NOT NULL)
  EXECUTE FUNCTION public.send_welcome_email();


-- Function to send elite unlock email when user reaches 2,500 points
CREATE OR REPLACE FUNCTION public.send_elite_unlock_email()
RETURNS TRIGGER AS $$
DECLARE
  user_email TEXT;
  user_name TEXT;
  function_url TEXT;
  service_role_key TEXT;
BEGIN
  -- Only trigger when crossing into elite tier (2,500+ points)
  IF OLD.tier_id = 'baby' AND NEW.tier_id = 'baby-elite' THEN
    -- Get user email and name
    SELECT 
      u.email,
      COALESCE(u.raw_user_meta_data->>'full_name', 'Member')
    INTO user_email, user_name
    FROM auth.users u
    WHERE u.id = NEW.user_id;
    
    -- Construct the Edge Function URL
    function_url := current_setting('app.settings.supabase_url', true) || '/functions/v1/send-email';
    service_role_key := current_setting('app.settings.service_role_key', true);
    
    -- Make async HTTP request to send email
    PERFORM net.http_post(
      url := function_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || service_role_key
      ),
      body := jsonb_build_object(
        'to', user_email,
        'templateType', 'elite-unlock',
        'data', jsonb_build_object(
          'userName', user_name,
          'totalPoints', NEW.total_points,
          'bonusPoints', 1000
        )
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to send elite unlock email
DROP TRIGGER IF EXISTS on_elite_unlock_send_email ON loyalty_points;
CREATE TRIGGER on_elite_unlock_send_email
  AFTER UPDATE ON loyalty_points
  FOR EACH ROW
  EXECUTE FUNCTION public.send_elite_unlock_email();


-- Set configuration for Edge Function URL (REPLACE WITH YOUR VALUES)
-- Get these from Supabase Dashboard -> Settings -> API
-- Example:
-- ALTER DATABASE postgres SET app.settings.supabase_url = 'https://qkrlaqpucbxjavonbpvr.supabase.co';
-- ALTER DATABASE postgres SET app.settings.service_role_key = 'your-service-role-key-here';

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Email triggers created successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '⚠️  IMPORTANT: You must set these configuration values:';
  RAISE NOTICE '';
  RAISE NOTICE 'Run the following commands (replace with your actual values):';
  RAISE NOTICE '';
  RAISE NOTICE 'ALTER DATABASE postgres SET app.settings.supabase_url = ''https://qkrlaqpucbxjavonbpvr.supabase.co'';';
  RAISE NOTICE 'ALTER DATABASE postgres SET app.settings.service_role_key = ''your-service-role-key'';';
  RAISE NOTICE '';
  RAISE NOTICE '📧 Emails will be sent automatically when:';
  RAISE NOTICE '  - New user signs up → Welcome email (500 points)';
  RAISE NOTICE '  - User reaches 2,500 points → Elite unlock email (1,000 bonus)';
END $$;
