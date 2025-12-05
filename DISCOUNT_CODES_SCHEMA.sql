-- Discount Codes Table for NikHairrr
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS discount_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  type VARCHAR(20) NOT NULL CHECK (type IN ('percentage', 'fixed')),
  value DECIMAL(10,2) NOT NULL,
  min_purchase DECIMAL(10,2) DEFAULT 0,
  max_discount DECIMAL(10,2),
  starts_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast code lookups
CREATE INDEX idx_discount_codes_code ON discount_codes(code);
CREATE INDEX idx_discount_codes_active ON discount_codes(active);

-- RLS Policies (allow public read for active codes)
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

-- Public can read active, non-expired codes
CREATE POLICY "Public can view active discount codes"
  ON discount_codes FOR SELECT
  TO public
  USING (
    active = true 
    AND (starts_at IS NULL OR starts_at <= NOW())
    AND (expires_at IS NULL OR expires_at > NOW())
  );

-- Only authenticated users with admin role can manage codes
CREATE POLICY "Admins can manage discount codes"
  ON discount_codes FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_discount_codes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_discount_codes_timestamp
  BEFORE UPDATE ON discount_codes
  FOR EACH ROW
  EXECUTE FUNCTION update_discount_codes_updated_at();

-- Insert sample discount codes
INSERT INTO discount_codes (code, description, type, value, starts_at, expires_at) VALUES
  ('HOLIDAY10', 'Holiday Sale - 10% off entire order', 'percentage', 10, NOW(), NOW() + INTERVAL '30 days'),
  ('HOLIDAY20', 'Holiday Sale - 20% off entire order', 'percentage', 20, NOW(), NOW() + INTERVAL '30 days'),
  ('WELCOME15', 'Welcome discount - 15% off first order', 'percentage', 15, NOW(), NOW() + INTERVAL '90 days'),
  ('SAVE20', 'Save $20 on orders over $100', 'fixed', 20, NOW(), NOW() + INTERVAL '60 days'),
  ('NEWYEAR2026', 'New Year Sale - 25% off', 'percentage', 25, '2025-12-26', '2026-01-05')
ON CONFLICT (code) DO NOTHING;

-- Track discount code usage
CREATE TABLE IF NOT EXISTS discount_code_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discount_code_id UUID REFERENCES discount_codes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_id VARCHAR(255),
  payment_intent_id VARCHAR(255),
  discount_amount DECIMAL(10,2) NOT NULL,
  order_total DECIMAL(10,2) NOT NULL,
  used_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_discount_usage_code ON discount_code_usage(discount_code_id);
CREATE INDEX idx_discount_usage_user ON discount_code_usage(user_id);
CREATE INDEX idx_discount_usage_order ON discount_code_usage(order_id);

-- RLS for usage tracking
ALTER TABLE discount_code_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own usage"
  ON discount_code_usage FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert usage records"
  ON discount_code_usage FOR INSERT
  TO public
  WITH CHECK (true);

-- Function to increment discount code usage
CREATE OR REPLACE FUNCTION increment_discount_usage(code_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE discount_codes
  SET current_uses = current_uses + 1
  WHERE id = code_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
