# NikHairrr Catalog Management & Checkout Integration

## Overview

The NikHairrr site now uses a CSV-based product catalog that integrates with Stripe via lookup keys and processes payments through Mvmnt Pay. This document explains the architecture, workflows, and how to manage the catalog.

## Architecture

### Components

1. **CSV Catalog** (`nikhairrr-stripe-products.csv`)
   - Single source of truth for all products
   - Contains pricing, lookup_keys, and product metadata
   - Maps directly to Stripe Products/Prices

2. **Product Catalog Module** (`src/data/productCatalog.ts`)
   - TypeScript representation of CSV data
   - Provides helper functions to query products by category, size, etc.
   - Used by shop pages to render products

3. **Stripe Sync Script** (`scripts/sync-stripe-catalog.js`)
   - Idempotent script to sync catalog to Stripe
   - Creates Products and Prices with lookup_keys
   - Safe to run multiple times

4. **Mvmnt Pay Integration** (`src/utils/mvmntpay.ts`)
   - Handles checkout redirection with lookup_key line items
   - Supports multi-item cart checkout
   - Manages success/cancel URLs

5. **Cart & Checkout** (`src/components/CartDrawer.tsx`)
   - Supports multiple items with lookup_keys
   - Validates all items have lookup_keys before checkout
   - Sends lookup_key-based line items to Mvmnt Pay

## Product Data Flow

```
CSV File
   ↓
productCatalog.ts (TypeScript catalog)
   ↓
Shop Pages (ShopBundles, ShopClosures, etc.)
   ↓
Cart (with lookup_keys)
   ↓
Mvmnt Pay Checkout (lookup_key line items)
   ↓
Stripe (resolves prices via lookup_key)
   ↓
Success Page
```

## Key Concepts

### Lookup Keys

- **What**: Stable identifiers for Stripe Prices (e.g., `bundle_dd_stbw_12in_usd_v1`)
- **Why**: Enable price changes without breaking code (create new version, deprecate old)
- **Format**: `{category}_{construction}_{texture}_{size}_{currency}_{version}`

### Versioning

When prices change:
1. Create a new Stripe Price with a new lookup_key (increment version: `v1` → `v2`)
2. Mark old Price as inactive
3. Update CSV and `productCatalog.ts` with new lookup_key
4. Old orders continue to reference old prices; new orders use new prices

### Hafy Bob Wig

- The Hafy Bob wig has an existing `price_id` that should NOT be changed
- For now, Hafy Bob continues to use the old price_id system
- Other products use lookup_key system
- Future: migrate Hafy Bob to lookup_key when convenient

## How to Add/Update Products

### Adding a New Product

1. **Add to CSV** (`nikhairrr-stripe-products.csv`)
   ```csv
   product_name,category,texture,construction,size_in,color,product_type,currency,unit_amount_cents,lookup_key,active
   "30" ST/BW Double Drawn Bundle",Bundles,ST/BW,Double Drawn,30,Natural,good,usd,34000,bundle_dd_stbw_30in_usd_v1,True
   ```

2. **Add to productCatalog.ts** (`src/data/productCatalog.ts`)
   ```typescript
   {
     productName: '30" ST/BW Double Drawn Bundle',
     category: 'Bundles',
     texture: 'ST/BW',
     construction: 'Double Drawn',
     sizeIn: 30,
     color: 'Natural',
     productType: 'good',
     currency: 'usd',
     unitAmountCents: 34000,
     lookupKey: 'bundle_dd_stbw_30in_usd_v1',
     active: true,
     price: 340,
     sizeDisplay: '30"'
   },
   ```

3. **Sync to Stripe**
   ```bash
   export STRIPE_SECRET_KEY="sk_live_..."
   node scripts/sync-stripe-catalog.js
   ```

4. **Deploy** - Push changes, product is now available for checkout

### Updating a Price

1. **Create new version in CSV**
   - Old: `bundle_dd_stbw_12in_usd_v1` at $120
   - New: `bundle_dd_stbw_12in_usd_v2` at $135

2. **Mark old version inactive in CSV**
   ```csv
   "12"" ST/BW Double Drawn Bundle",Bundles,ST/BW,Double Drawn,12,Natural,good,usd,12000,bundle_dd_stbw_12in_usd_v1,False
   "12"" ST/BW Double Drawn Bundle",Bundles,ST/BW,Double Drawn,12,Natural,good,usd,13500,bundle_dd_stbw_12in_usd_v2,True
   ```

3. **Update productCatalog.ts** - Change lookup_key and price for active product

4. **Sync to Stripe** - Creates new Price, old Price remains for historical orders

5. **Deploy** - New orders use new price

### Deactivating a Product

1. Set `active: False` in CSV
2. Update `active: false` in `productCatalog.ts`
3. Sync to Stripe
4. Product no longer appears on site

## Stripe Sync Script

### Prerequisites

```bash
npm install stripe  # Already in package.json
export STRIPE_SECRET_KEY="sk_live_..."  # Or sk_test_ for testing
```

### Running the Script

```bash
node scripts/sync-stripe-catalog.js
```

### What It Does

1. Validates catalog data (no duplicates, required fields present)
2. For each product in catalog:
   - Checks if Price with lookup_key exists in Stripe
   - If exists: skips (idempotent)
   - If not: creates Product, then Price with lookup_key
3. Reports results: created, skipped, errors

### Example Output

```
🚀 Starting Stripe catalog sync...

📦 Found 36 products in catalog

✅ Created product: 12" ST/BW Double Drawn Bundle (prod_...)
✅ Created price: bundle_dd_stbw_12in_usd_v1 ($120) -> price_...
⏭️  Skipping bundle_dd_stbw_14in_usd_v1 - already exists
...

✨ Sync complete!
   Created: 28
   Skipped: 8
   Errors:  0
```

## Checkout Flow

### 1. Customer adds items to cart

- Each item includes `lookupKey` from catalog
- Cart stored in localStorage with lookup_keys

### 2. Customer clicks "Proceed to Checkout"

- `CartDrawer` validates all items have lookup_keys
- Builds array of `{ lookup_key, quantity }` line items
- Calls `redirectToMvmntPayMultiItem(lineItems, successUrl, cancelUrl)`

### 3. Mvmnt Pay processes checkout

- Receives lookup_key line items
- Resolves Prices in Stripe via lookup_key
- Customer enters payment and shipping info
- Redirects to success URL with `session_id`

### 4. Success page

- Displays order confirmation
- Clears cart from localStorage
- Shows order ID and next steps

## Environment Configuration

### Development

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Staging

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Production

```env
VITE_STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

## Mvmnt Pay Configuration

Mvmnt Pay is configured with:
- **Client ID**: `nikhairrr`
- **Base URL**: `https://pay.mvmntech.com`
- **Checkout Mode**: lookup_key-based (preferred)

### Mvmnt Pay Parameters

When redirecting to Mvmnt Pay, we send:

```javascript
{
  client: 'nikhairrr',
  line_items: JSON.stringify([
    { lookup_key: 'bundle_dd_stbw_12in_usd_v1', quantity: 2 },
    { lookup_key: 'closure_5x5_stbw_14in_usd_v1', quantity: 1 }
  ]),
  metadata: base64({
    requires_shipping: 'true',
    client_name: 'NikHairrr'
  }),
  successUrl: 'https://nikhairrr.com/success',
  cancelUrl: 'https://nikhairrr.com/shop'
}
```

Mvmnt Pay handles:
- Payment processing
- Platform fee calculation (2.94%)
- Shipping cost calculation
- Tax calculation
- Order fulfillment webhooks

## File Structure

```
/
├── nikhairrr-stripe-products.csv       # Source of truth
├── scripts/
│   └── sync-stripe-catalog.js          # Stripe sync script
├── src/
│   ├── types/
│   │   └── catalog.ts                  # TypeScript types
│   ├── data/
│   │   └── productCatalog.ts           # Catalog module
│   ├── utils/
│   │   ├── mvmntpay.ts                 # Mvmnt Pay integration
│   │   └── productPrices.ts            # Legacy (deprecated)
│   ├── components/
│   │   └── CartDrawer.tsx              # Cart & checkout
│   ├── pages/
│   │   ├── ShopBundles.tsx             # Bundles catalog page
│   │   ├── ShopClosures.tsx            # Closures catalog page
│   │   ├── ShopFrontals.tsx            # Frontals catalog page
│   │   ├── ShopWigs.tsx                # Wigs catalog page
│   │   └── Success.tsx                 # Success page
│   └── App.tsx                         # Routes
└── package.json
```

## Testing Checklist

### Before Deploying to Production

- [ ] Run Stripe sync script in test mode
- [ ] Verify all products appear in Stripe Dashboard
- [ ] Test adding each product category to cart
- [ ] Test multi-item checkout
- [ ] Verify lookup_keys are sent correctly to Mvmnt Pay
- [ ] Complete a test purchase end-to-end
- [ ] Verify success page shows order details
- [ ] Verify cart clears after successful purchase
- [ ] Test price change versioning (create v2, mark v1 inactive)
- [ ] Verify old orders still reference correct prices

### Regression Testing

After any catalog changes:
1. Verify existing products still checkout correctly
2. Verify Hafy Bob wig (price_id) still works
3. Check that inactive products don't appear on site
4. Confirm success URL redirects properly

## Troubleshooting

### "Product not configured for checkout"

**Cause**: Item in cart doesn't have a `lookupKey`

**Fix**: Ensure product in `productCatalog.ts` has correct `lookupKey` field

### Stripe sync fails with "Duplicate lookup_key"

**Cause**: Multiple products in catalog have the same lookup_key

**Fix**: Ensure each product has unique lookup_key (use versioning if updating)

### Mvmnt Pay returns error

**Cause**: lookup_key doesn't exist in Stripe

**Fix**: Run `node scripts/sync-stripe-catalog.js` to create missing Prices

### Price doesn't update on site

**Cause**: Browser cached old catalog or old Price still active

**Fix**: 
1. Verify new lookup_key in `productCatalog.ts`
2. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+F5)
3. Check Stripe Dashboard for correct active Price

## Support

For questions or issues:
- Technical: Check this document first
- Stripe Issues: dashboard.stripe.com/support
- Mvmnt Pay Issues: Contact Mvmnt Pay support

## Migration Notes

### From Old System to Lookup Key System

**Old system** (ShopWigs only):
- Used `price_id` from `productPrices.ts`
- Single-item checkout only
- Hafy Bob wig: `price_1SRboLJLcxQ0xaoL3ut8568Y`

**New system** (All products):
- Uses `lookup_key` from `productCatalog.ts`
- Multi-item cart checkout
- Versioned pricing

**Hafy Bob handling**:
- Kept existing `price_id` for backwards compatibility
- Can be migrated to lookup_key in future update
- For now, operates alongside new system

---

**Last Updated**: 2025-01-09  
**Version**: 1.0
