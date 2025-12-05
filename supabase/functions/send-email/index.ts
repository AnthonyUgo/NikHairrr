// Supabase Edge Function for Sending Emails via SendGrid
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')
const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send'

interface EmailRequest {
  to: string
  templateType: 'welcome' | 'elite-unlock' | 'order-confirmation'
  data: {
    userName?: string
    points?: number
    totalPoints?: number
    bonusPoints?: number
    orderNumber?: string
    orderTotal?: string
    pointsEarned?: number
    items?: Array<{
      name: string
      quantity: number
      price: string
      total: string
    }>
  }
}

const templates = {
  'welcome': {
    subject: '🎉 Welcome to NikHairrr - Your 500 Points Are Waiting!',
    templatePath: '../../../email-templates/welcome-email.html'
  },
  'elite-unlock': {
    subject: '👑 Congratulations! You Unlocked Elite Tier Status',
    templatePath: '../../../email-templates/elite-unlock-email.html'
  },
  'order-confirmation': {
    subject: '✓ Order Confirmed - NikHairrr',
    templatePath: '../../../email-templates/order-confirmation-email.html'
  }
}

function replaceTemplateVariables(html: string, data: Record<string, any>): string {
  let result = html
  
  // Replace simple variables
  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'string' || typeof data[key] === 'number') {
      const regex = new RegExp(`{{${key}}}`, 'g')
      result = result.replace(regex, String(data[key]))
    }
  })
  
  // Handle items array for order confirmation
  if (data.items && Array.isArray(data.items)) {
    const itemsRegex = /{{#if items}}([\s\S]*?){{\/if}}/g
    const itemsMatch = result.match(itemsRegex)
    
    if (itemsMatch) {
      const itemsTemplate = itemsMatch[0]
        .replace('{{#if items}}', '')
        .replace('{{/if}}', '')
      
      const eachRegex = /{{#each items}}([\s\S]*?){{\/each}}/g
      const eachMatch = itemsTemplate.match(eachRegex)
      
      if (eachMatch) {
        const singleItemTemplate = eachMatch[0]
          .replace('{{#each items}}', '')
          .replace('{{/each}}', '')
        
        const itemsHtml = data.items.map((item: any) => {
          let itemHtml = singleItemTemplate
          Object.keys(item).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g')
            itemHtml = itemHtml.replace(regex, String(item[key]))
          })
          return itemHtml
        }).join('')
        
        result = result.replace(/{{#if items}}[\s\S]*?{{\/if}}/g, itemsHtml)
      }
    }
  } else {
    // Remove items section if no items provided
    result = result.replace(/{{#if items}}[\s\S]*?{{\/if}}/g, '')
  }
  
  return result
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const { to, templateType, data }: EmailRequest = await req.json()

    if (!SENDGRID_API_KEY) {
      throw new Error('SendGrid API key not configured')
    }

    // Get template
    const template = templates[templateType]
    if (!template) {
      throw new Error(`Invalid template type: ${templateType}`)
    }

    // Load HTML template
    const htmlPath = new URL(template.templatePath, import.meta.url).pathname
    let htmlContent: string
    
    try {
      htmlContent = await Deno.readTextFile(htmlPath)
    } catch (error) {
      // Fallback: use inline simple template
      console.error('Template file not found, using fallback')
      htmlContent = `
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px; background: #000; color: #fff;">
            <h1>NikHairrr</h1>
            <p>Hello {{userName}},</p>
            <p>Thank you for being part of the NikHairrr family!</p>
          </body>
        </html>
      `
    }

    // Replace template variables
    const processedHtml = replaceTemplateVariables(htmlContent, data)

    // Send email via SendGrid
    const response = await fetch(SENDGRID_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: to }],
          subject: template.subject,
        }],
        from: {
          email: 'noreply@nikhairrr.com',
          name: 'NikHairrr'
        },
        content: [{
          type: 'text/html',
          value: processedHtml
        }]
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`SendGrid API error: ${errorText}`)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
})
