# SendGrid Email Setup Guide

## 📧 SendGrid Configuration for NikHairrr

### Step 1: Get Your SendGrid API Key

1. Go to [SendGrid](https://sendgrid.com) and sign up/login
2. Navigate to **Settings** → **API Keys**
3. Click **Create API Key**
4. Name it "NikHairrr Production"
5. Select **Full Access** (or at minimum: Mail Send)
6. Copy the API key (you'll only see it once!)

### Step 2: Verify Your Sender Email

1. Go to **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender**
3. Fill in your business details:
   - **From Name**: NikHairrr
   - **From Email**: noreply@nikhairrr.com (or your preferred email)
   - **Reply To**: support@nikhairrr.com
4. Check your email and verify the sender

### Step 3: Add Environment Variables

Add to your `.env` file:
```bash
# SendGrid Configuration
SENDGRID_API_KEY=SG.your_actual_api_key_here
SENDGRID_FROM_EMAIL=noreply@nikhairrr.com
SENDGRID_FROM_NAME=NikHairrr
```

Add to Supabase Project Settings → Edge Functions → Secrets:
```
SENDGRID_API_KEY=SG.your_actual_api_key_here
```

### Step 4: Create Supabase Edge Function

Run these commands in your terminal:

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Initialize Supabase (if not already done)
supabase init

# Create the email function
supabase functions new send-email
```

### Step 5: Email Templates Created

I've created the following email templates in the `email-templates/` directory:

1. **Welcome Email** - Sent on signup with 500 bonus points
2. **Elite Tier Unlock** - Sent when user reaches 2,500 points
3. **Order Confirmation** - Sent after successful purchase
4. **Newsletter Subscription** - Sent with 50 bonus points

### Step 6: Deploy to Supabase

```bash
# Deploy the email function
supabase functions deploy send-email

# Set the secret
supabase secrets set SENDGRID_API_KEY=your_api_key_here
```

### Step 7: Test Email Sending

Use the test script:
```bash
node scripts/test-email.js
```

## 📋 Email Triggers

### Automatic Emails:
- ✅ **Welcome Email**: On user signup (Database trigger)
- ✅ **Elite Unlock**: When user reaches 2,500 points (Database trigger)
- ✅ **Newsletter Bonus**: On newsletter signup
- ✅ **Order Confirmation**: After Stripe checkout success

### Email Template Variables:

**Welcome Email:**
- `{{userName}}` - User's full name
- `{{points}}` - Signup bonus points (500)

**Elite Unlock Email:**
- `{{userName}}` - User's full name
- `{{totalPoints}}` - Current point balance
- `{{bonusPoints}}` - Elite unlock bonus (1,000)

**Order Confirmation:**
- `{{userName}}` - User's full name
- `{{orderNumber}}` - Stripe session ID
- `{{orderTotal}}` - Total amount
- `{{pointsEarned}}` - Points earned from purchase
- `{{items}}` - Array of purchased items

## 🔒 Security Notes

- Never commit your SendGrid API key to git
- Use environment variables only
- API key should have minimal required permissions
- Use separate API keys for development/production

## 📊 Monitoring

- Check SendGrid Dashboard for email delivery stats
- Monitor bounce rates and spam reports
- Review activity logs in Supabase Edge Functions

## 🛠️ Troubleshooting

**Emails not sending?**
1. Verify API key is correct
2. Check sender email is verified
3. Review Supabase Edge Function logs
4. Check SendGrid activity feed

**Emails going to spam?**
1. Set up SPF/DKIM records (in SendGrid Sender Authentication)
2. Use authenticated domain instead of single sender
3. Avoid spam trigger words in subject lines
