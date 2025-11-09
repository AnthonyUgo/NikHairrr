// src/utils/stripe.ts
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
    if (!key) {
      console.error('Stripe public key not found in environment variables');
      return null;
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export interface CheckoutItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  description?: string;
}

export interface ShippingAddress {
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export const createCheckoutSession = async (
  items: CheckoutItem[],
  customerEmail?: string,
  shippingAddress?: ShippingAddress
) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    
    const response = await fetch(`${apiUrl}/api/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        email: customerEmail,
        shippingAddress,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const redirectToCheckout = async (sessionId: string) => {
  const stripe = await getStripe();
  if (!stripe) {
    throw new Error('Stripe not initialized');
  }

  // Redirect to Stripe Checkout
  window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
};

// Calculate if shipping is free (Houston, TX only)
export const isFreeShipping = (address?: ShippingAddress): boolean => {
  if (!address) return false;
  
  const isHouston = address.city?.toLowerCase().includes('houston');
  const isTexas = address.state?.toLowerCase() === 'texas' || 
                  address.state?.toLowerCase() === 'tx';
  
  return !!(isHouston && isTexas);
};

// Estimate shipping cost (will be calculated server-side)
export const estimateShipping = (items: CheckoutItem[], address?: ShippingAddress): number => {
  if (isFreeShipping(address)) {
    return 0;
  }
  
  // Base shipping rate
  let shipping = 15;
  
  // Add weight-based calculation
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  shipping += Math.ceil(totalItems * 2);
  
  return shipping;
};
