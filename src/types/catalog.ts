/**
 * Catalog Type Definitions for NikHairrr
 * 
 * These types map to the CSV product catalog structure
 * and enable lookup_key-based checkout through Mvmnt Pay
 */

export type ProductCategory = 'Bundles' | 'Closures' | 'Frontals' | 'Virgin Bulk' | 'Services' | 'Wigs';

export type ProductTexture = 'ST/BW' | 'Virgin' | 'Natural Wave' | 'Straight' | 'Deep Wave' | null;

export type ProductConstruction = 
  | 'Double Drawn' 
  | '5x5 Closure' 
  | '13x4 Frontal' 
  | '13x6 Frontal' 
  | '13x4 Frontal Unit'
  | null;

export type ProductColor = 'Natural' | 'Colored' | 'Jet Black' | 'Browns' | 'Blondes' | 'Reds';

export type ProductType = 'good' | 'service';

/**
 * Represents a product from the CSV catalog
 */
export interface CatalogProduct {
  /** Human-readable product name */
  productName: string;
  
  /** Product category for filtering/display */
  category: ProductCategory;
  
  /** Hair texture (if applicable) */
  texture: ProductTexture;
  
  /** Construction type (if applicable) */
  construction: ProductConstruction;
  
  /** Size in inches (if applicable) */
  sizeIn: number | null;
  
  /** Color (if applicable) */
  color: ProductColor | null;
  
  /** Type: good or service */
  productType: ProductType;
  
  /** Currency code */
  currency: string;
  
  /** Price in cents */
  unitAmountCents: number;
  
  /** Stripe lookup key (used for checkout) */
  lookupKey: string;
  
  /** Whether product is active and available */
  active: boolean;
  
  /** Computed: price in dollars for display */
  price: number;
  
  /** Computed: formatted size string (e.g., '12"') */
  sizeDisplay: string | null;
}

/**
 * Represents a product variant with size selection
 */
export interface ProductVariant {
  /** Size (e.g., '12"', '14"') */
  size: string;
  
  /** Price for this size in dollars */
  price: number;
  
  /** Stripe lookup key for this variant */
  lookupKey: string;
  
  /** Whether this variant is available */
  available: boolean;
}

/**
 * Represents a full product with all its variants
 */
export interface CatalogProductWithVariants {
  /** Unique product ID */
  id: string;
  
  /** Display name */
  name: string;
  
  /** Product category */
  category: ProductCategory;
  
  /** Description */
  description: string;
  
  /** Image path */
  image: string;
  
  /** Base/starting price */
  basePrice: number;
  
  /** Available variants (sizes) */
  variants: ProductVariant[];
  
  /** Additional metadata */
  metadata?: {
    texture?: string;
    construction?: string;
    weight?: string;
    [key: string]: any;
  };
}

/**
 * Cart item with lookup_key for checkout
 */
export interface CartItem {
  /** Product ID */
  id: number | string;
  
  /** Display name */
  name: string;
  
  /** Unit price in dollars */
  price: number;
  
  /** Selected size (if applicable) */
  size?: string;
  
  /** Quantity */
  quantity: number;
  
  /** Stripe lookup key for this specific product+size */
  lookupKey: string;
  
  /** Whether item is available for checkout */
  available?: boolean;
}

/**
 * Checkout line item for Mvmnt Pay
 */
export interface CheckoutLineItem {
  /** Stripe lookup key */
  lookup_key: string;
  
  /** Quantity */
  quantity: number;
}

/**
 * CSV row structure (matches the attached CSV)
 */
export interface CSVProductRow {
  product_name: string;
  category: string;
  texture: string;
  construction: string;
  size_in: string;
  color: string;
  product_type: string;
  currency: string;
  unit_amount_cents: string;
  lookup_key: string;
  active: string;
}
