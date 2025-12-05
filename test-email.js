// Test script to manually trigger email sending
// Run this to test your email integration

// To run: node test-email.js

const SUPABASE_URL = 'https://qkrlaqpucbxjavonbpvr.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE'; // Get from Supabase Dashboard -> Settings -> API

async function testWelcomeEmail() {
  console.log('🧪 Testing Welcome Email...\n');
  
  const response = await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      to: 'your-test-email@gmail.com', // CHANGE THIS to your email
      templateType: 'welcome',
      data: {
        userName: 'Test User',
        points: 500
      }
    })
  });

  const result = await response.json();
  console.log('Response:', result);
  
  if (result.success) {
    console.log('✅ Welcome email sent successfully!');
    console.log('📧 Check your inbox at: your-test-email@gmail.com\n');
  } else {
    console.log('❌ Failed to send email');
    console.log('Error:', result.error, '\n');
  }
}

async function testEliteUnlockEmail() {
  console.log('🧪 Testing Elite Unlock Email...\n');
  
  const response = await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      to: 'your-test-email@gmail.com', // CHANGE THIS to your email
      templateType: 'elite-unlock',
      data: {
        userName: 'Test User',
        totalPoints: 3500,
        bonusPoints: 1000
      }
    })
  });

  const result = await response.json();
  console.log('Response:', result);
  
  if (result.success) {
    console.log('✅ Elite unlock email sent successfully!');
    console.log('📧 Check your inbox at: your-test-email@gmail.com\n');
  } else {
    console.log('❌ Failed to send email');
    console.log('Error:', result.error, '\n');
  }
}

async function testOrderConfirmationEmail() {
  console.log('🧪 Testing Order Confirmation Email...\n');
  
  const response = await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      to: 'your-test-email@gmail.com', // CHANGE THIS to your email
      templateType: 'order-confirmation',
      data: {
        userName: 'Test User',
        orderNumber: 'TEST-12345',
        orderTotal: '299.00',
        pointsEarned: 299,
        items: [
          {
            name: '26" Brazilian Body Wave Bundle',
            quantity: 2,
            price: '120.00',
            total: '240.00'
          },
          {
            name: 'Closure (4x4)',
            quantity: 1,
            price: '59.00',
            total: '59.00'
          }
        ]
      }
    })
  });

  const result = await response.json();
  console.log('Response:', result);
  
  if (result.success) {
    console.log('✅ Order confirmation email sent successfully!');
    console.log('📧 Check your inbox at: your-test-email@gmail.com\n');
  } else {
    console.log('❌ Failed to send email');
    console.log('Error:', result.error, '\n');
  }
}

// Run all tests
async function runAllTests() {
  console.log('═══════════════════════════════════════════\n');
  console.log('📧 NikHairrr Email Integration Test Suite\n');
  console.log('═══════════════════════════════════════════\n');
  
  await testWelcomeEmail();
  await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
  
  await testEliteUnlockEmail();
  await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
  
  await testOrderConfirmationEmail();
  
  console.log('═══════════════════════════════════════════');
  console.log('✅ All tests complete!');
  console.log('Check your email inbox for 3 test emails.');
  console.log('═══════════════════════════════════════════\n');
}

// Run the tests
runAllTests().catch(console.error);
