/**
 * Product Catalog for NikHairrr
 * 
 * This is the canonical product catalog derived from the CSV.
 * Each product maps to a Stripe Price with a lookup_key.
 * 
 * To update:
 * 1. Update the CSV
 * 2. Run the sync script to update Stripe Products/Prices
 * 3. Update this file with new products
 */

import type { CatalogProduct, CatalogProductWithVariants, ProductVariant } from '../types/catalog';

/**
 * Raw catalog data from CSV
 * Prices are in cents, lookup_key is used for checkout
 */
export const CATALOG_PRODUCTS: CatalogProduct[] = [
  // ===== BUNDLES - ST/BW DOUBLE DRAWN =====
  {
    productName: '12" ST/BW Double Drawn Bundle',
    category: 'Bundles',
    texture: 'ST/BW',
    construction: 'Double Drawn',
    sizeIn: 12,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 12000,
    lookupKey: 'bundle_dd_stbw_12in_usd_v1',
    active: true,
    price: 120,
    sizeDisplay: '12"'
  },
  {
    productName: '14" ST/BW Double Drawn Bundle',
    category: 'Bundles',
    texture: 'ST/BW',
    construction: 'Double Drawn',
    sizeIn: 14,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 13500,
    lookupKey: 'bundle_dd_stbw_14in_usd_v1',
    active: true,
    price: 135,
    sizeDisplay: '14"'
  },
  {
    productName: '16" ST/BW Double Drawn Bundle',
    category: 'Bundles',
    texture: 'ST/BW',
    construction: 'Double Drawn',
    sizeIn: 16,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 15500,
    lookupKey: 'bundle_dd_stbw_16in_usd_v1',
    active: true,
    price: 155,
    sizeDisplay: '16"'
  },
  {
    productName: '18" ST/BW Double Drawn Bundle',
    category: 'Bundles',
    texture: 'ST/BW',
    construction: 'Double Drawn',
    sizeIn: 18,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 17500,
    lookupKey: 'bundle_dd_stbw_18in_usd_v1',
    active: true,
    price: 175,
    sizeDisplay: '18"'
  },
  {
    productName: '20" ST/BW Double Drawn Bundle',
    category: 'Bundles',
    texture: 'ST/BW',
    construction: 'Double Drawn',
    sizeIn: 20,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 19500,
    lookupKey: 'bundle_dd_stbw_20in_usd_v1',
    active: true,
    price: 195,
    sizeDisplay: '20"'
  },
  {
    productName: '22" ST/BW Double Drawn Bundle',
    category: 'Bundles',
    texture: 'ST/BW',
    construction: 'Double Drawn',
    sizeIn: 22,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 22500,
    lookupKey: 'bundle_dd_stbw_22in_usd_v1',
    active: true,
    price: 225,
    sizeDisplay: '22"'
  },
  {
    productName: '24" ST/BW Double Drawn Bundle',
    category: 'Bundles',
    texture: 'ST/BW',
    construction: 'Double Drawn',
    sizeIn: 24,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 25500,
    lookupKey: 'bundle_dd_stbw_24in_usd_v1',
    active: true,
    price: 255,
    sizeDisplay: '24"'
  },
  {
    productName: '26" ST/BW Double Drawn Bundle',
    category: 'Bundles',
    texture: 'ST/BW',
    construction: 'Double Drawn',
    sizeIn: 26,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 28500,
    lookupKey: 'bundle_dd_stbw_26in_usd_v1',
    active: true,
    price: 285,
    sizeDisplay: '26"'
  },
  {
    productName: '28" ST/BW Double Drawn Bundle',
    category: 'Bundles',
    texture: 'ST/BW',
    construction: 'Double Drawn',
    sizeIn: 28,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 31000,
    lookupKey: 'bundle_dd_stbw_28in_usd_v1',
    active: true,
    price: 310,
    sizeDisplay: '28"'
  },
  
  // ===== CLOSURES - 5x5 =====
  {
    productName: '5x5 Closure 12" ST/BW',
    category: 'Closures',
    texture: 'ST/BW',
    construction: '5x5 Closure',
    sizeIn: 12,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 15600,
    lookupKey: 'closure_5x5_stbw_12in_usd_v1',
    active: true,
    price: 156,
    sizeDisplay: '12"'
  },
  {
    productName: '5x5 Closure 14" ST/BW',
    category: 'Closures',
    texture: 'ST/BW',
    construction: '5x5 Closure',
    sizeIn: 14,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 17100,
    lookupKey: 'closure_5x5_stbw_14in_usd_v1',
    active: true,
    price: 171,
    sizeDisplay: '14"'
  },
  {
    productName: '5x5 Closure 16" ST/BW',
    category: 'Closures',
    texture: 'ST/BW',
    construction: '5x5 Closure',
    sizeIn: 16,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 18900,
    lookupKey: 'closure_5x5_stbw_16in_usd_v1',
    active: true,
    price: 189,
    sizeDisplay: '16"'
  },
  {
    productName: '5x5 Closure 18" ST/BW',
    category: 'Closures',
    texture: 'ST/BW',
    construction: '5x5 Closure',
    sizeIn: 18,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 21100,
    lookupKey: 'closure_5x5_stbw_18in_usd_v1',
    active: true,
    price: 211,
    sizeDisplay: '18"'
  },
  {
    productName: '5x5 Closure 20" ST/BW',
    category: 'Closures',
    texture: 'ST/BW',
    construction: '5x5 Closure',
    sizeIn: 20,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 22800,
    lookupKey: 'closure_5x5_stbw_20in_usd_v1',
    active: true,
    price: 228,
    sizeDisplay: '20"'
  },
  
  // ===== FRONTALS - 13x4 =====
  {
    productName: '13x4 Frontal 12" ST/BW',
    category: 'Frontals',
    texture: 'ST/BW',
    construction: '13x4 Frontal',
    sizeIn: 12,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 20500,
    lookupKey: 'frontal_13x4_stbw_12in_usd_v1',
    active: true,
    price: 205,
    sizeDisplay: '12"'
  },
  {
    productName: '13x4 Frontal 14" ST/BW',
    category: 'Frontals',
    texture: 'ST/BW',
    construction: '13x4 Frontal',
    sizeIn: 14,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 22500,
    lookupKey: 'frontal_13x4_stbw_14in_usd_v1',
    active: true,
    price: 225,
    sizeDisplay: '14"'
  },
  {
    productName: '13x4 Frontal 16" ST/BW',
    category: 'Frontals',
    texture: 'ST/BW',
    construction: '13x4 Frontal',
    sizeIn: 16,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 25800,
    lookupKey: 'frontal_13x4_stbw_16in_usd_v1',
    active: true,
    price: 258,
    sizeDisplay: '16"'
  },
  {
    productName: '13x4 Frontal 18" ST/BW',
    category: 'Frontals',
    texture: 'ST/BW',
    construction: '13x4 Frontal',
    sizeIn: 18,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 28400,
    lookupKey: 'frontal_13x4_stbw_18in_usd_v1',
    active: true,
    price: 284,
    sizeDisplay: '18"'
  },
  {
    productName: '13x4 Frontal 20" ST/BW',
    category: 'Frontals',
    texture: 'ST/BW',
    construction: '13x4 Frontal',
    sizeIn: 20,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 30800,
    lookupKey: 'frontal_13x4_stbw_20in_usd_v1',
    active: true,
    price: 308,
    sizeDisplay: '20"'
  },
  
  // ===== FRONTALS - 13x6 =====
  {
    productName: '13x6 Frontal 14" ST/BW',
    category: 'Frontals',
    texture: 'ST/BW',
    construction: '13x6 Frontal',
    sizeIn: 14,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 29000,
    lookupKey: 'frontal_13x6_stbw_14in_usd_v1',
    active: true,
    price: 290,
    sizeDisplay: '14"'
  },
  {
    productName: '13x6 Frontal 16" ST/BW',
    category: 'Frontals',
    texture: 'ST/BW',
    construction: '13x6 Frontal',
    sizeIn: 16,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 31000,
    lookupKey: 'frontal_13x6_stbw_16in_usd_v1',
    active: true,
    price: 310,
    sizeDisplay: '16"'
  },
  {
    productName: '13x6 Frontal 18" ST/BW',
    category: 'Frontals',
    texture: 'ST/BW',
    construction: '13x6 Frontal',
    sizeIn: 18,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 32900,
    lookupKey: 'frontal_13x6_stbw_18in_usd_v1',
    active: true,
    price: 329,
    sizeDisplay: '18"'
  },
  {
    productName: '13x6 Frontal 20" ST/BW',
    category: 'Frontals',
    texture: 'ST/BW',
    construction: '13x6 Frontal',
    sizeIn: 20,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 37000,
    lookupKey: 'frontal_13x6_stbw_20in_usd_v1',
    active: true,
    price: 370,
    sizeDisplay: '20"'
  },
  
  // ===== VIRGIN BULK =====
  {
    productName: '18" DD Virgin Bulk (Natural)',
    category: 'Virgin Bulk',
    texture: 'Virgin',
    construction: 'Double Drawn',
    sizeIn: 18,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 8000,
    lookupKey: 'bulk_dd_virgin_natural_18in_usd_v1',
    active: true,
    price: 80,
    sizeDisplay: '18"'
  },
  {
    productName: '20" DD Virgin Bulk (Natural)',
    category: 'Virgin Bulk',
    texture: 'Virgin',
    construction: 'Double Drawn',
    sizeIn: 20,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 8900,
    lookupKey: 'bulk_dd_virgin_natural_20in_usd_v1',
    active: true,
    price: 89,
    sizeDisplay: '20"'
  },
  {
    productName: '22" DD Virgin Bulk (Natural)',
    category: 'Virgin Bulk',
    texture: 'Virgin',
    construction: 'Double Drawn',
    sizeIn: 22,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 9900,
    lookupKey: 'bulk_dd_virgin_natural_22in_usd_v1',
    active: true,
    price: 99,
    sizeDisplay: '22"'
  },
  {
    productName: '24" DD Virgin Bulk (Natural)',
    category: 'Virgin Bulk',
    texture: 'Virgin',
    construction: 'Double Drawn',
    sizeIn: 24,
    color: 'Natural',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 10900,
    lookupKey: 'bulk_dd_virgin_natural_24in_usd_v1',
    active: true,
    price: 109,
    sizeDisplay: '24"'
  },
  {
    productName: '18" DD Virgin Bulk (Colored)',
    category: 'Virgin Bulk',
    texture: 'Virgin',
    construction: 'Double Drawn',
    sizeIn: 18,
    color: 'Colored',
    productType: 'good',
    currency: 'usd',
    unitAmountCents: 9900,
    lookupKey: 'bulk_dd_virgin_colored_18in_usd_v1',
    active: true,
    price: 99,
    sizeDisplay: '18"'
  },
  
  // ===== SERVICES =====
  {
    productName: '3 Bundles + Closure (Wigging)',
    category: 'Services',
    texture: null,
    construction: null,
    sizeIn: null,
    color: null,
    productType: 'service',
    currency: 'usd',
    unitAmountCents: 3500,
    lookupKey: 'svc_3_bundles_plus_closure_wigging_usd_v1',
    active: true,
    price: 35,
    sizeDisplay: null
  },
  {
    productName: 'Extra Bundles (each, Wigging add-on)',
    category: 'Services',
    texture: null,
    construction: null,
    sizeIn: null,
    color: null,
    productType: 'service',
    currency: 'usd',
    unitAmountCents: 1000,
    lookupKey: 'svc_extra_bundles_each_wigging_add-on_usd_v1',
    active: true,
    price: 10,
    sizeDisplay: null
  },
  {
    productName: 'Frontal Customization (bleached knots, light plucking)',
    category: 'Services',
    texture: null,
    construction: null,
    sizeIn: null,
    color: null,
    productType: 'service',
    currency: 'usd',
    unitAmountCents: 2000,
    lookupKey: 'svc_frontal_customization_bleached_knots_light_plucking_usd_v1',
    active: true,
    price: 20,
    sizeDisplay: null
  },
  {
    productName: 'Coloring: Jet Black (per bundle)',
    category: 'Services',
    texture: null,
    construction: null,
    sizeIn: null,
    color: 'Jet Black',
    productType: 'service',
    currency: 'usd',
    unitAmountCents: 3000,
    lookupKey: 'svc_coloring_jet_black_per_bundle_usd_v1',
    active: true,
    price: 30,
    sizeDisplay: null
  },
  {
    productName: 'Coloring: Browns/Brunettes (per bundle)',
    category: 'Services',
    texture: null,
    construction: null,
    sizeIn: null,
    color: 'Browns',
    productType: 'service',
    currency: 'usd',
    unitAmountCents: 3500,
    lookupKey: 'svc_coloring_browns_brunettes_per_bundle_usd_v1',
    active: true,
    price: 35,
    sizeDisplay: null
  },
  {
    productName: 'Coloring: Blondes (per bundle)',
    category: 'Services',
    texture: null,
    construction: null,
    sizeIn: null,
    color: 'Blondes',
    productType: 'service',
    currency: 'usd',
    unitAmountCents: 5000,
    lookupKey: 'svc_coloring_blondes_per_bundle_usd_v1',
    active: true,
    price: 50,
    sizeDisplay: null
  },
  {
    productName: 'Coloring: Reds/Gingers (per bundle)',
    category: 'Services',
    texture: null,
    construction: null,
    sizeIn: null,
    color: 'Reds',
    productType: 'service',
    currency: 'usd',
    unitAmountCents: 5000,
    lookupKey: 'svc_coloring_reds_gingers_per_bundle_usd_v1',
    active: true,
    price: 50,
    sizeDisplay: null
  },
];

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): CatalogProduct[] {
  return CATALOG_PRODUCTS.filter(p => p.category === category && p.active);
}

/**
 * Get product by lookup key
 */
export function getProductByLookupKey(lookupKey: string): CatalogProduct | undefined {
  return CATALOG_PRODUCTS.find(p => p.lookupKey === lookupKey);
}

/**
 * Build product variants grouped by construction type
 * Example: All "ST/BW Double Drawn Bundle" sizes become variants
 */
export function buildProductVariants(
  category: string,
  construction: string | null
): CatalogProductWithVariants[] {
  const products = CATALOG_PRODUCTS.filter(
    p => p.category === category && 
         p.construction === construction &&
         p.active
  );
  
  if (products.length === 0) return [];
  
  // Group by base product (everything except size)
  const grouped = new Map<string, CatalogProduct[]>();
  
  products.forEach(product => {
    const key = `${product.texture}_${product.construction}`;
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(product);
  });
  
  // Convert to CatalogProductWithVariants
  const result: CatalogProductWithVariants[] = [];
  let id = 1;
  
  grouped.forEach((variants) => {
    const baseProduct = variants[0];
    const variantList: ProductVariant[] = variants.map(v => ({
      size: v.sizeDisplay || '',
      price: v.price,
      lookupKey: v.lookupKey,
      available: v.active
    }));
    
    result.push({
      id: `${category.toLowerCase()}_${id}`,
      name: baseProduct.construction || baseProduct.productName,
      category: category as any,
      description: `${baseProduct.texture || ''} ${baseProduct.construction || ''}\nTotal weight 100g per bundle\nDouble drawn quality`.trim(),
      image: '/bundles-1.jpeg', // Default image, should be customized
      basePrice: variants[0].price,
      variants: variantList,
      metadata: {
        texture: baseProduct.texture || undefined,
        construction: baseProduct.construction || undefined
      }
    });
    
    id++;
  });
  
  return result;
}

/**
 * Get services by type (coloring or wigging)
 */
export function getServicesByType(type: 'coloring' | 'wigging'): CatalogProduct[] {
  return CATALOG_PRODUCTS.filter(p => {
    if (p.category !== 'Services') return false;
    if (type === 'coloring') {
      return p.productName.toLowerCase().includes('coloring');
    }
    if (type === 'wigging') {
      return p.productName.toLowerCase().includes('wigging') || 
             p.productName.toLowerCase().includes('frontal customization');
    }
    return false;
  });
}
