/**
 * Stripe Product Price IDs for NikHairrr
 * 
 * To add a new product:
 * 1. Create product in Stripe Dashboard: https://dashboard.stripe.com/products
 * 2. Copy the Price ID (starts with price_)
 * 3. Add it to the appropriate section below
 */

export const PRODUCT_PRICES: Record<string, string> = {
  // ===== BUNDLES - BRAZILIAN BODY WAVE =====
  'brazilian-body-wave-10': 'price_REPLACE_ME',  // $75
  'brazilian-body-wave-12': 'price_REPLACE_ME',  // $85
  'brazilian-body-wave-14': 'price_REPLACE_ME',  // $95
  'brazilian-body-wave-16': 'price_REPLACE_ME',  // $105
  'brazilian-body-wave-18': 'price_REPLACE_ME',  // $115
  'brazilian-body-wave-20': 'price_REPLACE_ME',  // $125
  'brazilian-body-wave-22': 'price_REPLACE_ME',  // $135
  'brazilian-body-wave-24': 'price_REPLACE_ME',  // $145
  'brazilian-body-wave-26': 'price_REPLACE_ME',  // $155
  'brazilian-body-wave-28': 'price_REPLACE_ME',  // $165
  'brazilian-body-wave-30': 'price_REPLACE_ME',  // $175
  
  // ===== BUNDLES - BRAZILIAN STRAIGHT =====
  'brazilian-straight-10': 'price_REPLACE_ME',
  'brazilian-straight-12': 'price_REPLACE_ME',
  'brazilian-straight-14': 'price_REPLACE_ME',
  'brazilian-straight-16': 'price_REPLACE_ME',
  'brazilian-straight-18': 'price_REPLACE_ME',
  'brazilian-straight-20': 'price_REPLACE_ME',
  'brazilian-straight-22': 'price_REPLACE_ME',
  'brazilian-straight-24': 'price_REPLACE_ME',
  'brazilian-straight-26': 'price_REPLACE_ME',
  'brazilian-straight-28': 'price_REPLACE_ME',
  'brazilian-straight-30': 'price_REPLACE_ME',
  
  // ===== BUNDLES - DEEP WAVE =====
  'deep-wave-10': 'price_REPLACE_ME',
  'deep-wave-12': 'price_REPLACE_ME',
  'deep-wave-14': 'price_REPLACE_ME',
  'deep-wave-16': 'price_REPLACE_ME',
  'deep-wave-18': 'price_REPLACE_ME',
  'deep-wave-20': 'price_REPLACE_ME',
  'deep-wave-22': 'price_REPLACE_ME',
  'deep-wave-24': 'price_REPLACE_ME',
  'deep-wave-26': 'price_REPLACE_ME',
  'deep-wave-28': 'price_REPLACE_ME',
  'deep-wave-30': 'price_REPLACE_ME',
  
  // ===== CLOSURES =====
  '4x4-hd-closure': 'price_REPLACE_ME',  // $100
  '5x5-hd-closure': 'price_REPLACE_ME',  // $120
  '6x6-hd-closure': 'price_REPLACE_ME',  // $140
  '7x7-hd-closure': 'price_REPLACE_ME',  // $160
  
  // ===== FRONTALS =====
  '13x4-hd-frontal': 'price_REPLACE_ME',  // $150
  '13x6-hd-frontal': 'price_REPLACE_ME',  // $180
  
  // ===== WIGS =====
  'hafy-bob-wig': 'price_1SRboLJLcxQ0xaoL3ut8568Y',  // Hafy Bob Wig
  'full-wig-short': 'price_REPLACE_ME',   // 10-14 inches - $300
  'full-wig-medium': 'price_REPLACE_ME',  // 16-20 inches - $400
  'full-wig-long': 'price_REPLACE_ME',    // 22-30 inches - $500
  
  // ===== BUNDLE DEALS =====
  '3-bundle-deal-14-16-18': 'price_REPLACE_ME',  // $250
  '3-bundle-closure-deal': 'price_REPLACE_ME',   // $350
  '3-bundle-frontal-deal': 'price_REPLACE_ME',   // $400
};

/**
 * Get Stripe Price ID for a product
 * @param productType - The product type (e.g., 'brazilian-body-wave', 'closure')
 * @param size - Optional size (e.g., '14', '16')
 * @returns Stripe Price ID or null if not found
 */
export function getPriceId(productType: string, size?: string): string | null {
  const key = size ? `${productType}-${size}` : productType;
  const priceId = PRODUCT_PRICES[key];
  
  if (!priceId || priceId === 'price_REPLACE_ME') {
    console.error(`Price ID not configured for: ${key}`);
    return null;
  }
  
  return priceId;
}

/**
 * Check if a product has a configured price
 */
export function hasPriceId(productType: string, size?: string): boolean {
  const priceId = getPriceId(productType, size);
  return priceId !== null;
}

/**
 * Get all configured price IDs (for testing/debugging)
 */
export function getAllPriceIds(): Record<string, string> {
  return Object.fromEntries(
    Object.entries(PRODUCT_PRICES).filter(([_, value]) => value !== 'price_REPLACE_ME')
  );
}
