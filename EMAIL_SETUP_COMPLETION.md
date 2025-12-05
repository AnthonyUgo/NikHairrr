# 📧 Email Setup Completion Guide

## ✅ What's Already Done

1. ✅ SendGrid sender verified (noreply@nikhairrr.com)
2. ✅ SendGrid domain authenticated (nikhairrr.com)
3. ✅ SendGrid API key created and added to Supabase
4. ✅ Email templates created (welcome, elite-unlock, order-confirmation)
5. ✅ Edge Function deployed to Supabase

## 🎯 What's Left: Connect Database to Email Function

You have **2 options** to trigger emails automatically:

---

## **Option 1: Database Webhooks (RECOMMENDED - Easiest)**

### Step 1: Create Webhook for Welcome Emails

1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/qkrlaqpucbxjavonbpvr/database/hooks
2. Click **Create a new Hook**
3. Configure:
   - **Name**: `send-welcome-email`
   - **Table**: `auth.users`
   - **Events**: Check `Insert`
   - **Type**: `HTTP Request`
   - **Method**: `POST`
   - **URL**: `https://qkrlaqpucbxjavonbpvr.supabase.co/functions/v1/send-email`
   - **HTTP Headers**:
     ```
     Content-Type: application/json
     Authorization: Bearer YOUR_SERVICE_ROLE_KEY
     ```
   - **HTTP Parameters** (Body):
     ```json
     {
       "to": "{{ record.email }}",
       "templateType": "welcome",
       "data": {
         "userName": "{{ record.raw_user_meta_data.full_name }}",
         "points": 500
       }
     }
     ```
4. Click **Create Hook**

### Step 2: Create Webhook for Elite Unlock Emails

1. Still in Database Hooks, click **Create a new Hook**
2. Configure:
   - **Name**: `send-elite-unlock-email`
   - **Table**: `loyalty_points`
   - **Events**: Check `Update`
   - **Type**: `HTTP Request`
   - **Method**: `POST`
   - **URL**: `https://qkrlaqpucbxjavonbpvr.supabase.co/functions/v1/send-email`
   - **HTTP Headers**:
     ```
     Content-Type: application/json
     Authorization: Bearer YOUR_SERVICE_ROLE_KEY
     ```
   - **Condition** (SQL Filter):
     ```sql
     OLD.membership_tier = 'baby' AND NEW.membership_tier = 'baby_elite'
     ```
   - **HTTP Parameters** (Body):
     ```json
     {
       "to": "{{ user.email }}",
       "templateType": "elite-unlock",
       "data": {
         "userName": "{{ user.raw_user_meta_data.full_name }}",
         "totalPoints": "{{ record.total_points }}",
         "bonusPoints": 1000
       }
     }
     ```
3. Click **Create Hook**

**To get your Service Role Key:**
- Go to: https://supabase.com/dashboard/project/qkrlaqpucbxjavonbpvr/settings/api
- Copy the **service_role** key (NOT the anon public key)

---

## **Option 2: SQL Triggers (Advanced)**

If webhooks don't work, run the SQL file I created:

1. Go to: https://supabase.com/dashboard/project/qkrlaqpucbxjavonbpvr/sql
2. Open the file: `EMAIL_INTEGRATION_SETUP.sql`
3. Replace `YOUR_SERVICE_ROLE_KEY_HERE` with your actual service role key
4. Run the SQL

---

## 🧪 Testing Your Email Setup

### Test 1: Welcome Email
1. Create a new test account on your site
2. Check that you receive the welcome email at the signup email address
3. Verify it shows 500 points

### Test 2: Elite Unlock Email
Run this SQL to manually trigger elite upgrade for a test user:

```sql
-- Get your test user's ID first
SELECT id, email FROM auth.users WHERE email = 'your-test-email@example.com';

-- Manually upgrade them (this will trigger the email)
SELECT * FROM upgrade_user_if_eligible('USER_ID_HERE');
```

Check email for the elite unlock message.

### Test 3: Order Confirmation Email
This will be triggered from your checkout code when someone completes a purchase. The code should call:

```javascript
await supabase.functions.invoke('send-email', {
  body: {
    to: customerEmail,
    templateType: 'order-confirmation',
    data: {
      userName: customerName,
      orderNumber: orderId,
      orderTotal: total,
      pointsEarned: points,
      items: orderItems
    }
  }
})
```

---

## 📊 Monitor Email Delivery

**In SendGrid:**
- Dashboard: https://app.sendgrid.com/
- Check Activity Feed to see sent emails
- Monitor delivery rates, opens, bounces

**In Supabase:**
- Edge Functions Logs: https://supabase.com/dashboard/project/qkrlaqpucbxjavonbpvr/functions
- Database Hooks: https://supabase.com/dashboard/project/qkrlaqpucbxjavonbpvr/database/hooks

---

## ✅ Complete Setup Checklist

- [x] SendGrid account created
- [x] Sender verified
- [x] Domain authenticated  
- [x] API key added to Supabase
- [x] Edge Function deployed
- [ ] **Database webhooks created (DO THIS NOW)**
- [ ] Test welcome email
- [ ] Test elite unlock email
- [ ] Set up order confirmation in checkout code

---

## 🎉 You're Almost Done!

Just create those 2 database webhooks and you're fully automated! Every new signup and elite unlock will automatically send beautiful branded emails from noreply@nikhairrr.com.
