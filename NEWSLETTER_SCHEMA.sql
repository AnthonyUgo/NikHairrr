-- Newsletter Subscriber Table
-- Run this in Supabase SQL Editor (after the main schema)

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Optional: link to member account
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  source VARCHAR(50) DEFAULT 'website' -- 'website', 'checkout', etc.
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_user_id ON newsletter_subscribers(user_id);

-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe (insert)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Users can view their own subscription
CREATE POLICY "Users can view own subscription"
  ON newsletter_subscribers
  FOR SELECT
  USING (auth.uid() = user_id OR auth.role() = 'authenticated');

-- Grant permissions
GRANT ALL ON newsletter_subscribers TO anon, authenticated;

-- Function to award points for newsletter signup (if user is logged in)
CREATE OR REPLACE FUNCTION public.handle_newsletter_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- If the subscriber is a logged-in member, award bonus points
  IF NEW.user_id IS NOT NULL THEN
    INSERT INTO public.loyalty_transactions (user_id, points, transaction_type, source, description)
    VALUES (NEW.user_id, 50, 'earned', 'newsletter_signup', 'Bonus points for joining our newsletter!');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to award points on newsletter signup
CREATE TRIGGER on_newsletter_signup
  AFTER INSERT ON newsletter_subscribers
  FOR EACH ROW EXECUTE FUNCTION public.handle_newsletter_signup();

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Newsletter schema created successfully!';
  RAISE NOTICE 'Logged-in members get 50 bonus points for newsletter signup!';
END $$;
