-- Reviews Schema and Initial Data
-- Run this in Supabase SQL Editor

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  product TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read approved reviews
CREATE POLICY "Anyone can read approved reviews"
ON reviews FOR SELECT
USING (status = 'approved');

-- Policy: Authenticated users can insert reviews (will be pending by default)
CREATE POLICY "Authenticated users can submit reviews"
ON reviews FOR INSERT
TO authenticated
WITH CHECK (true);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_reviews_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reviews_updated_at
BEFORE UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_reviews_updated_at();

-- Insert the new reviews
INSERT INTO reviews (name, text, product, rating, verified, featured, status) VALUES
(
  'Seun',
  'Just picked it up — went to the office and got back. Omo, you''re really Ms. Talk & Do! My wig is here for real. Thank you so much babe. Love the express service.',
  'Custom Wig',
  5,
  true,
  true,
  'approved'
),
(
  'Faith',
  'I received the hair today. Oh my… it''s so lush! I can''t wait for the install. And I''m so glad I went with jet black — perfect choice. 🙌🏾❤️',
  'Jet Black Bundle',
  5,
  true,
  true,
  'approved'
),
(
  'Salmat',
  'Yes, I saw it. So far, I really love the hair texture. I''ll take it to a professional to help me cut it. Thank you so much for your help.',
  'Hair Bundle',
  5,
  true,
  true,
  'approved'
);

-- Verify the reviews were inserted
SELECT id, name, LEFT(text, 50) as preview, product, rating, featured, created_at 
FROM reviews 
ORDER BY created_at DESC;
