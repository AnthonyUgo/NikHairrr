-- NikHairrr Membership & Loyalty Points Schema
-- Run this in Supabase SQL Editor

-- Create loyalty_points table
CREATE TABLE IF NOT EXISTS loyalty_points (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  total_points INTEGER DEFAULT 0 NOT NULL,
  lifetime_points INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create loyalty_transactions table for tracking point history
CREATE TABLE IF NOT EXISTS loyalty_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  points INTEGER NOT NULL,
  transaction_type VARCHAR(50) NOT NULL, -- 'earned', 'redeemed', 'bonus'
  source VARCHAR(100) NOT NULL, -- 'purchase', 'signup_bonus', 'referral', 'redemption'
  order_id VARCHAR(255), -- Optional: link to Stripe order
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_loyalty_points_user_id ON loyalty_points(user_id);
CREATE INDEX IF NOT EXISTS idx_loyalty_transactions_user_id ON loyalty_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_loyalty_transactions_created_at ON loyalty_transactions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE loyalty_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for loyalty_points
-- Users can read their own points
CREATE POLICY "Users can view own loyalty points"
  ON loyalty_points
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own points (for new signups)
CREATE POLICY "Users can insert own loyalty points"
  ON loyalty_points
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own points
CREATE POLICY "Users can update own loyalty points"
  ON loyalty_points
  FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for loyalty_transactions
-- Users can view their own transaction history
CREATE POLICY "Users can view own transactions"
  ON loyalty_transactions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own transactions
CREATE POLICY "Users can insert own transactions"
  ON loyalty_transactions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to automatically create loyalty_points record for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create loyalty record with zero; welcome bonus is added via a transaction below
  INSERT INTO public.loyalty_points (user_id, total_points, lifetime_points)
  VALUES (NEW.id, 0, 0);

  -- Create welcome bonus transaction (500 points = $10 according to new rules)
  INSERT INTO public.loyalty_transactions (user_id, points, transaction_type, source, description)
  VALUES (NEW.id, 500, 'earned', 'signup_bonus', 'Welcome bonus for joining NikHairrr!');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create loyalty points when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update loyalty points total
CREATE OR REPLACE FUNCTION public.update_loyalty_points_total()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.loyalty_points
  SET 
    total_points = total_points + NEW.points,
    lifetime_points = lifetime_points + CASE WHEN NEW.points > 0 THEN NEW.points ELSE 0 END,
    updated_at = NOW()
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically update total when transaction is added
CREATE TRIGGER on_loyalty_transaction_created
  AFTER INSERT ON loyalty_transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_loyalty_points_total();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON loyalty_points TO anon, authenticated;
GRANT ALL ON loyalty_transactions TO anon, authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'NikHairrr loyalty schema created successfully!';
  RAISE NOTICE 'New users will automatically receive 100 welcome points.';
  RAISE NOTICE 'Points are earned at $1 = 1 point on purchases.';
END $$;
