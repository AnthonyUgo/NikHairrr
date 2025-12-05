// Discount validation and calculation utilities
import { supabase } from './supabase';

export interface DiscountCode {
  id: string;
  code: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  min_purchase?: number;
  max_discount?: number;
  starts_at?: string;
  expires_at?: string;
  max_uses?: number;
  current_uses: number;
  active: boolean;
}

export interface DiscountValidationResult {
  valid: boolean;
  discount?: DiscountCode;
  error?: string;
  calculatedDiscount?: number; // in cents
}

/**
 * Validate a discount code against the database
 */
export async function validateDiscountCode(
  code: string,
  subtotal: number // in cents
): Promise<DiscountValidationResult> {
  if (!code || !code.trim()) {
    return { valid: false, error: 'Please enter a discount code' };
  }

  try {
    const { data: discount, error } = await supabase
      .from('discount_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('active', true)
      .single();

    if (error || !discount) {
      return { valid: false, error: 'Invalid discount code' };
    }

    // Check if code has started
    if (discount.starts_at && new Date(discount.starts_at) > new Date()) {
      return { valid: false, error: 'This discount code is not yet active' };
    }

    // Check if code has expired
    if (discount.expires_at && new Date(discount.expires_at) < new Date()) {
      return { valid: false, error: 'This discount code has expired' };
    }

    // Check usage limits
    if (discount.max_uses && discount.current_uses >= discount.max_uses) {
      return { valid: false, error: 'This discount code has reached its usage limit' };
    }

    // Check minimum purchase
    const minPurchaseCents = discount.min_purchase ? discount.min_purchase * 100 : 0;
    if (subtotal < minPurchaseCents) {
      const minAmount = (minPurchaseCents / 100).toFixed(2);
      return { 
        valid: false, 
        error: `Minimum purchase of $${minAmount} required for this code` 
      };
    }

    // Calculate discount amount
    const calculatedDiscount = calculateDiscountAmount(discount, subtotal);

    return {
      valid: true,
      discount,
      calculatedDiscount
    };
  } catch (error) {
    console.error('Error validating discount code:', error);
    return { valid: false, error: 'Failed to validate discount code' };
  }
}

/**
 * Calculate the discount amount in cents
 */
export function calculateDiscountAmount(
  discount: DiscountCode,
  subtotal: number // in cents
): number {
  let discountAmount = 0;

  if (discount.type === 'percentage') {
    // Percentage discount
    discountAmount = Math.round((subtotal * discount.value) / 100);
  } else if (discount.type === 'fixed') {
    // Fixed dollar amount (convert to cents)
    discountAmount = Math.round(discount.value * 100);
  }

  // Apply max discount cap if set
  if (discount.max_discount) {
    const maxDiscountCents = Math.round(discount.max_discount * 100);
    discountAmount = Math.min(discountAmount, maxDiscountCents);
  }

  // Don't exceed the subtotal
  discountAmount = Math.min(discountAmount, subtotal);

  return discountAmount;
}

/**
 * Calculate points discount (100 points = $1.00)
 */
export function calculatePointsDiscount(points: number): number {
  // 100 points = 100 cents = $1.00
  return Math.round(points);
}

/**
 * Format discount for display
 */
export function formatDiscount(discount: DiscountCode): string {
  if (discount.type === 'percentage') {
    return `${discount.value}% off`;
  } else {
    return `$${discount.value.toFixed(2)} off`;
  }
}

/**
 * Track discount code usage (call after successful payment)
 */
export async function recordDiscountUsage(
  discountCodeId: string,
  userId: string | null,
  orderId: string,
  paymentIntentId: string,
  discountAmount: number, // in cents
  orderTotal: number // in cents
): Promise<void> {
  try {
    // Record usage
    await supabase.from('discount_code_usage').insert({
      discount_code_id: discountCodeId,
      user_id: userId,
      order_id: orderId,
      payment_intent_id: paymentIntentId,
      discount_amount: discountAmount / 100, // convert to dollars
      order_total: orderTotal / 100 // convert to dollars
    });

    // Increment usage count
    await supabase.rpc('increment_discount_usage', {
      code_id: discountCodeId
    });
  } catch (error) {
    console.error('Error recording discount usage:', error);
  }
}
