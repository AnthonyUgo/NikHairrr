/**
 * MvmntPay Integration Utilities for NikHairrr
 * 
 * This module provides functions to integrate with the MvmntPay payment platform.
 * MvmntPay handles payment processing with transparent platform fees.
 */

const MVMNTPAY_CLIENT_ID = 'nikhairrr';
const MVMNTPAY_BASE_URL = 'https://pay.mvmntech.com';
const MVMNTPAY_API_URL = `${MVMNTPAY_BASE_URL}/api`;

export interface MvmntPayCheckoutOptions {
  priceId: string;
  quantity?: number;
  metadata?: Record<string, string>;
  successUrl?: string;
  cancelUrl?: string;
}

export interface MvmntPayPaymentBreakdown {
  unitAmount: number;
  quantity: number;
  baseAmount: number;
  serviceFee: number;
  serviceFeePercent: number;
  subtotal: number;
  tax: number;
  total: number;
}

export interface MvmntPayPaymentIntent {
  clientSecret: string;
  paymentIntentId: string;
  breakdown: MvmntPayPaymentBreakdown;
}

/**
 * Redirect to MvmntPay checkout page (simplest integration)
 * 
 * @param priceId - Stripe Price ID for the product
 * @param quantity - Number of items (default: 1)
 * @param successUrl - URL to redirect after successful payment
 * @param cancelUrl - URL to redirect when user cancels/goes back
 */
export function redirectToMvmntPay(
  priceId: string,
  quantity: number = 1,
  successUrl?: string,
  cancelUrl?: string
): void {
  // Store URLs in session storage
  if (successUrl) {
    sessionStorage.setItem('mvmntpay_success_url', successUrl);
  }
  if (cancelUrl) {
    sessionStorage.setItem('mvmntpay_cancel_url', cancelUrl);
  }
  
  // Build checkout URL (using 'client' param like Elite Aces)
  const params = new URLSearchParams({
    client: MVMNTPAY_CLIENT_ID,
    price: priceId,
    quantity: quantity.toString(),
  });
  
  // Add shipping requirement to metadata
  const metadata = {
    requires_shipping: 'true',
    client_name: 'NikHairrr'
  };
  params.append('metadata', btoa(JSON.stringify(metadata)));
  
  // Add optional URLs if provided
  if (successUrl) {
    params.append('successUrl', successUrl);
  }
  if (cancelUrl) {
    params.append('cancelUrl', cancelUrl);
  }
  
  const checkoutUrl = `${MVMNTPAY_BASE_URL}/checkout?${params.toString()}`;
  
  // Redirect
  window.location.href = checkoutUrl;
}

/**
 * Create a payment intent via MvmntPay API (for embedded checkout)
 * 
 * @param options - Checkout configuration
 * @returns Payment intent with client secret and breakdown
 */
export async function createMvmntPayment(
  options: MvmntPayCheckoutOptions
): Promise<MvmntPayPaymentIntent> {
  const { priceId, quantity = 1, metadata = {} } = options;
  
  try {
    const response = await fetch(`${MVMNTPAY_API_URL}/createPayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: MVMNTPAY_CLIENT_ID,
        priceId,
        quantity,
        metadata,
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create payment');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('MvmntPay payment creation error:', error);
    throw error;
  }
}

/**
 * Get client information from MvmntPay
 * 
 * @returns Client configuration including logo and fee info
 */
export async function getMvmntPayClient() {
  try {
    const response = await fetch(`${MVMNTPAY_API_URL}/client/${MVMNTPAY_CLIENT_ID}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch client info');
    }
    
    return await response.json();
  } catch (error) {
    console.error('MvmntPay client fetch error:', error);
    throw error;
  }
}

/**
 * Format price breakdown for display
 * 
 * @param breakdown - Payment breakdown from MvmntPay
 * @returns Formatted strings for display
 */
export function formatPaymentBreakdown(breakdown: MvmntPayPaymentBreakdown) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  return {
    subtotal: formatter.format(breakdown.baseAmount / 100),
    platformFee: formatter.format(breakdown.serviceFee / 100),
    platformFeePercent: `${breakdown.serviceFeePercent}%`,
    total: formatter.format(breakdown.total / 100),
  };
}

/**
 * Calculate estimated total with platform fee
 * 
 * @param baseAmount - Base amount in dollars
 * @param feePercent - Platform fee percentage (default: 2.94%)
 * @returns Estimated total in dollars
 */
export function estimateTotal(baseAmount: number, feePercent: number = 2.94): number {
  const platformFee = (baseAmount * feePercent) / 100;
  return baseAmount + platformFee;
}

/**
 * Clear stored checkout data
 */
export function clearCheckoutData(): void {
  sessionStorage.removeItem('mvmntpay_success_url');
  sessionStorage.removeItem('mvmntpay_cancel_url');
}
