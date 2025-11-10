#!/usr/bin/env node
/**
 * Stripe Product & Price Sync Script for NikHairrr
 * 
 * This script ensures all products in the catalog have corresponding
 * Stripe Products and Prices with lookup_keys set correctly.
 * 
 * Features:
 * - Idempotent: Safe to run multiple times
 * - Only creates missing products/prices
 * - Uses lookup_key to avoid duplicates
 * - Validates all catalog items
 * 
 * Usage:
 *   node scripts/sync-stripe-catalog.js
 * 
 * Prerequisites:
 *   - Set STRIPE_SECRET_KEY environment variable
 *   - npm install stripe (already in package.json)
 */

import Stripe from 'stripe';
import { CATALOG_PRODUCTS } from '../src/data/productCatalog.js';

// Initialize Stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || process.env.VITE_STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error('❌ Error: STRIPE_SECRET_KEY environment variable not set');
  console.error('Set it with: export STRIPE_SECRET_KEY="sk_..."');
  process.exit(1);
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-11-20.acacia', // Latest API version
});

/**
 * Find existing Stripe Price by lookup_key
 */
async function findPriceByLookupKey(lookupKey) {
  try {
    const prices = await stripe.prices.search({
      query: `lookup_key:'${lookupKey}'`,
      limit: 1,
    });
    return prices.data.length > 0 ? prices.data[0] : null;
  } catch (error) {
    console.error(`Error searching for lookup_key ${lookupKey}:`, error.message);
    return null;
  }
}

/**
 * Create a Stripe Product
 */
async function createProduct(catalogProduct) {
  try {
    const product = await stripe.products.create({
      name: catalogProduct.productName,
      description: `${catalogProduct.category} - ${catalogProduct.texture || ''} ${catalogProduct.construction || ''}`.trim(),
      metadata: {
        category: catalogProduct.category,
        texture: catalogProduct.texture || '',
        construction: catalogProduct.construction || '',
        size: catalogProduct.sizeIn ? catalogProduct.sizeIn.toString() : '',
        color: catalogProduct.color || '',
        source: 'nikhairrr_catalog',
      },
      active: catalogProduct.active,
    });
    
    console.log(`✅ Created product: ${product.name} (${product.id})`);
    return product;
  } catch (error) {
    console.error(`❌ Failed to create product ${catalogProduct.productName}:`, error.message);
    throw error;
  }
}

/**
 * Create a Stripe Price with lookup_key
 */
async function createPrice(product, catalogProduct) {
  try {
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: catalogProduct.unitAmountCents,
      currency: catalogProduct.currency,
      lookup_key: catalogProduct.lookupKey,
      metadata: {
        size: catalogProduct.sizeIn ? catalogProduct.sizeIn.toString() : '',
        category: catalogProduct.category,
      },
      active: catalogProduct.active,
    });
    
    console.log(`✅ Created price: ${catalogProduct.lookupKey} ($${catalogProduct.price}) -> ${price.id}`);
    return price;
  } catch (error) {
    console.error(`❌ Failed to create price for ${catalogProduct.productName}:`, error.message);
    throw error;
  }
}

/**
 * Sync a single catalog product to Stripe
 */
async function syncProduct(catalogProduct) {
  // Check if price already exists
  const existingPrice = await findPriceByLookupKey(catalogProduct.lookupKey);
  
  if (existingPrice) {
    console.log(`⏭️  Skipping ${catalogProduct.lookupKey} - already exists (${existingPrice.id})`);
    return { skipped: true, price: existingPrice };
  }
  
  // Create product
  const product = await createProduct(catalogProduct);
  
  // Create price with lookup_key
  const price = await createPrice(product, catalogProduct);
  
  return { created: true, product, price };
}

/**
 * Main sync function
 */
async function syncCatalog() {
  console.log('🚀 Starting Stripe catalog sync...\n');
  console.log(`📦 Found ${CATALOG_PRODUCTS.length} products in catalog\n`);
  
  const results = {
    created: 0,
    skipped: 0,
    errors: 0,
  };
  
  for (const catalogProduct of CATALOG_PRODUCTS) {
    try {
      const result = await syncProduct(catalogProduct);
      
      if (result.created) {
        results.created++;
      } else if (result.skipped) {
        results.skipped++;
      }
      
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`❌ Error syncing ${catalogProduct.productName}:`, error.message);
      results.errors++;
    }
  }
  
  console.log('\n✨ Sync complete!');
  console.log(`   Created: ${results.created}`);
  console.log(`   Skipped: ${results.skipped}`);
  console.log(`   Errors:  ${results.errors}`);
  
  if (results.errors > 0) {
    console.log('\n⚠️  Some products failed to sync. Check errors above.');
    process.exit(1);
  }
}

/**
 * Validate catalog data
 */
function validateCatalog() {
  console.log('🔍 Validating catalog data...\n');
  
  const errors = [];
  const lookupKeys = new Set();
  
  for (const product of CATALOG_PRODUCTS) {
    // Check for duplicate lookup_keys
    if (lookupKeys.has(product.lookupKey)) {
      errors.push(`Duplicate lookup_key: ${product.lookupKey}`);
    }
    lookupKeys.add(product.lookupKey);
    
    // Check required fields
    if (!product.productName) {
      errors.push(`Missing productName for ${product.lookupKey}`);
    }
    if (!product.category) {
      errors.push(`Missing category for ${product.lookupKey}`);
    }
    if (!product.unitAmountCents || product.unitAmountCents <= 0) {
      errors.push(`Invalid unit_amount_cents for ${product.lookupKey}`);
    }
    if (!product.currency) {
      errors.push(`Missing currency for ${product.lookupKey}`);
    }
  }
  
  if (errors.length > 0) {
    console.error('❌ Catalog validation failed:\n');
    errors.forEach(error => console.error(`   - ${error}`));
    process.exit(1);
  }
  
  console.log('✅ Catalog validation passed\n');
}

// Run the sync
(async () => {
  try {
    validateCatalog();
    await syncCatalog();
  } catch (error) {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  }
})();
