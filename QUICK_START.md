# 🚀 Quick Start - Run These SQL Files

## Step 1: Run Main Loyalty Schema
1. Go to: https://supabase.com/dashboard/project/qkrlaqpucbxjavonbpvr/sql
2. Open file: `SUPABASE_SCHEMA.sql`
3. Copy all contents
4. Paste in SQL Editor
5. Click "Run"
6. ✅ Should see: "NikHairrr loyalty schema created successfully!"

## Step 2: Run Newsletter Schema
1. Stay in SQL Editor
2. Open file: `NEWSLETTER_SCHEMA.sql`
3. Copy all contents
4. Paste in SQL Editor (new query)
5. Click "Run"
6. ✅ Should see: "Newsletter schema created successfully!"

## Step 3: Test the System
1. Start dev server: `npm run dev`
2. Click "Sign In" → Create test account
3. Check Member Dashboard → Should see 100 points
4. Scroll to newsletter → Subscribe
5. Check dashboard again → Should see 150 points (100 + 50 bonus)

---

## 🎁 Point Awards

| Action | Points | Status |
|--------|--------|--------|
| Sign up | 100 | ✅ Auto (trigger) |
| Newsletter (member) | 50 | ✅ Auto (trigger) |
| Newsletter (guest) | 0 | ℹ️ Not a member |
| Purchase $1 | 1 | ⏳ You'll add later |

---

## 📁 Files to Know

- `SUPABASE_SCHEMA.sql` - Main database (run first)
- `NEWSLETTER_SCHEMA.sql` - Newsletter table (run second)
- `INTEGRATION_GUIDE.md` - Full documentation
- `MEMBERSHIP_SETUP_GUIDE.md` - Setup instructions

---

## 🔑 How It Works

**Guest subscribes to newsletter:**
→ Email saved, no points (not a member)
→ Modal says "Create account to earn points"

**Member subscribes to newsletter:**
→ Email saved + user_id linked
→ Trigger awards 50 bonus points automatically
→ Modal says "+50 points added!"
→ Can view in dashboard

**New signup:**
→ Trigger awards 100 welcome points
→ Creates loyalty record
→ Redirects to dashboard

---

## ✅ That's It!

Two SQL files → Complete system ready 🎉
