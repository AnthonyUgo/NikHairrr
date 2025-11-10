# NikHairrr Catalog System - Quick Start

## System Overview

✅ **What We Built:**
- CSV-based product catalog with lookup_key integration
- Multi-item cart checkout through Mvmnt Pay using lookup_keys
- Idempotent Stripe sync script for catalog management
- Success page for post-checkout experience

🔄 **Data Flow:**
CSV → productCatalog.ts → Shop Pages → Cart → Mvmnt Pay → Stripe

## Quick Commands

### Sync Catalog to Stripe
```bash
export STRIPE_SECRET_KEY="sk_test_..." # or sk_live_...
node scripts/sync-stripe-catalog.js
```

### Test the Site Locally
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## Key Files

| File | Purpose |
|------|---------|
| `nikhairrr-stripe-products.csv` | Source of truth for products |
| `src/data/productCatalog.ts` | TypeScript catalog module |
| `src/utils/mvmntpay.ts` | Mvmnt Pay integration (lookup_key support) |
| `src/components/CartDrawer.tsx` | Multi-item cart with lookup_key checkout |
| `src/pages/Success.tsx` | Post-checkout success page |
| `scripts/sync-stripe-catalog.js` | Stripe sync tool |
| `CATALOG_MANAGEMENT_GUIDE.md` | Full documentation |

## Adding a New Product (Simple)

1. Add row to CSV:
   ```csv
   "32" Bundle",Bundles,ST/BW,Double Drawn,32,Natural,good,usd,36000,bundle_dd_stbw_32in_usd_v1,True
   ```

2. Add to `src/data/productCatalog.ts`:
   ```ts
   {
     productName: '32" ST/BW Double Drawn Bundle',
     // ... other fields ...
     lookupKey: 'bundle_dd_stbw_32in_usd_v1',
     price: 360,
   },
   ```

3. Sync to Stripe:
   ```bash
   node scripts/sync-stripe-catalog.js
   ```

4. Deploy!

## Current Status

### ✅ Implemented
- [x] CSV catalog with all 36 products
- [x] TypeScript types for catalog
- [x] Product catalog module with helper functions
- [x] Multi-item cart with lookup_key support
- [x] Mvmnt Pay integration using lookup_keys
- [x] ShopBundles page using catalog
- [x] Success page
- [x] Stripe sync script
- [x] Full documentation

### 🚧 TODO (Next Steps)
- [ ] Update ShopClosures page to use catalog (currently uses hardcoded data)
- [ ] Update ShopFrontals page to use catalog (currently uses hardcoded data)
- [ ] Migrate Hafy Bob wig to lookup_key system (currently uses price_id)
- [ ] Add product images mapping to catalog
- [ ] Test complete checkout flow in production
- [ ] Set up webhook handlers for order fulfillment

### ⚠️ Important Notes

**Hafy Bob Wig Exception:**
- Price ID: `price_1SRboLJLcxQ0xaoL3ut8568Y`
- Still uses old price_id system (not lookup_key)
- Leave untouched per requirements
- Can be migrated later if needed

**Mvmnt Pay Configuration:**
- Already set up to accept lookup_key
- No changes needed to Mvmnt Pay itself
- Site sends lookup_key line items
- Mvmnt Pay resolves prices in Stripe

## Testing Checklist

Before deploying to production:

```bash
# 1. Sync catalog to test Stripe
export STRIPE_SECRET_KEY="sk_test_..."
node scripts/sync-stripe-catalog.js

# 2. Start dev server
npm run dev

# 3. Test flow:
#    - Browse products
#    - Add multiple items to cart
#    - Proceed to checkout
#    - Complete payment in test mode
#    - Verify success page
#    - Check cart cleared
```

## Architecture Decisions

### Why Lookup Keys?
- **Price Stability**: Prices can change without code updates
- **Versioning**: Create new prices without breaking old orders
- **Mvmnt Pay Support**: Already supports lookup_key
- **Best Practice**: Stripe recommends lookup_keys for product catalogs

### Why CSV?
- **Audit Trail**: Easy to see all products and prices
- **Non-technical Edits**: Business team can update prices
- **Source Control**: Version controlled with git
- **Simple**: No database required

### Why Multi-Item Checkout?
- **Better UX**: Customers can buy bundles + closures in one order
- **Accurate Shipping**: Single shipping calculation for whole order
- **Atomic Transactions**: All items processed together

## Pricing Examples

| Product | Size | Price | Lookup Key |
|---------|------|-------|------------|
| Bundle | 12" | $120 | `bundle_dd_stbw_12in_usd_v1` |
| Bundle | 14" | $135 | `bundle_dd_stbw_14in_usd_v1` |
| Closure 5x5 | 12" | $156 | `closure_5x5_stbw_12in_usd_v1` |
| Frontal 13x4 | 14" | $225 | `frontal_13x4_stbw_14in_usd_v1` |
| Wigging Service | - | $35 | `svc_3_bundles_plus_closure_wigging_usd_v1` |

## Common Tasks

### Check if Product Exists in Stripe
```bash
stripe prices list --lookup-keys bundle_dd_stbw_12in_usd_v1
```

### View All Products in Stripe
```bash
stripe products list
```

### View All Prices in Stripe
```bash
stripe prices list
```

### Update CSV from Stripe Export
1. Export from Stripe Dashboard
2. Map columns to CSV format
3. Run sync script to validate

## Support

- **Full Docs**: `CATALOG_MANAGEMENT_GUIDE.md`
- **CSV Format**: See attached `nikhairrr-stripe-products.csv`
- **Stripe API**: https://stripe.com/docs/api
- **Mvmnt Pay**: Contact Mvmnt Pay support

---

**Setup Date**: 2025-01-09  
**Status**: Ready for Stripe sync and testing
