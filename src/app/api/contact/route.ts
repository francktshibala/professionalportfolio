import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactService } from '@/lib/services/contact';

let resend: Resend | null = null;

if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  category: string;
  budget?: string;
  timeline?: string;
  message: string;
  preferredContact: string;
}

const RATE_LIMIT_MAP = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // 3 requests per minute

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const requests = RATE_LIMIT_MAP.get(key) || [];
  
  // Remove old requests outside the window
  const validRequests = requests.filter(
    (timestamp: number) => now - timestamp < RATE_LIMIT_WINDOW
  );
  
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  
  validRequests.push(now);
  RATE_LIMIT_MAP.set(key, validRequests);
  return false;
}

function validateContactForm(data: unknown): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data || typeof data !== 'object') {
    errors.push('Invalid form data');
    return { isValid: false, errors };
  }
  
  const formData = data as Record<string, unknown>;
  
  if (!formData.name || typeof formData.name !== 'string' || formData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!formData.email || typeof formData.email !== 'string') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Invalid email format');
    }
  }
  
  if (formData.phone && typeof formData.phone === 'string' && formData.phone.trim()) {
    const phoneRegex = /^[+]?[(]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.push('Invalid phone number format');
    }
  }
  
  if (!formData.category || typeof formData.category !== 'string') {
    errors.push('Category is required');
  }
  
  if (!formData.message || typeof formData.message !== 'string' || formData.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  } else if (formData.message.trim().length > 2000) {
    errors.push('Message must be less than 2000 characters');
  }
  
  if (!formData.preferredContact || typeof formData.preferredContact !== 'string') {
    errors.push('Preferred contact method is required');
  }
  
  return { isValid: errors.length === 0, errors };
}

function containsSpam(data: ContactFormData): boolean {
  const spamKeywords = [
    'viagra', 'casino', 'lottery', 'winner', 'urgent', 'nigerian prince',
    'bitcoin', 'cryptocurrency', 'investment opportunity', 'million dollars'
  ];
  
  const content = `${data.name} ${data.email} ${data.company || ''} ${data.message}`.toLowerCase();
  return spamKeywords.some(keyword => content.includes(keyword));
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Validate form data
    const { isValid, errors } = validateContactForm(body);
    if (!isValid) {
      return NextResponse.json(
        { message: 'Validation failed', errors },
        { status: 400 }
      );
    }

    const formData: ContactFormData = {
      name: body.name.trim(),
      email: body.email.trim(),
      company: body.company?.trim(),
      phone: body.phone?.trim(),
      category: body.category.trim(),
      budget: body.budget?.trim(),
      timeline: body.timeline?.trim(),
      message: body.message.trim(),
      preferredContact: body.preferredContact.trim()
    };

    // Basic spam detection
    if (containsSpam(formData)) {
      return NextResponse.json(
        { message: 'Message flagged as spam' },
        { status: 400 }
      );
    }

    // Save contact to database
    try {
      await ContactService.createContact({
        name: formData.name,
        email: formData.email,
        subject: formData.category,
        message: `Category: ${formData.category}\n${formData.company ? `Company: ${formData.company}\n` : ''}${formData.phone ? `Phone: ${formData.phone}\n` : ''}${formData.budget ? `Budget: ${formData.budget}\n` : ''}${formData.timeline ? `Timeline: ${formData.timeline}\n` : ''}Preferred Contact: ${formData.preferredContact}\n\nMessage: ${formData.message}`
      });
    } catch (dbError) {
      console.error('Failed to save contact to database:', dbError);
    }

    // Check if Resend API key is configured
    if (!resend) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { message: 'Message saved successfully! Email service is not configured, but your message has been recorded.' },
        { status: 200 }
      );
    }

    // Send email using Resend
    try {
      await resend.emails.send({
        from: 'Contact Form <onboarding@resend.dev>', // You'll need to configure this with your domain
        to: ['francisco@example.com'], // Replace with your actual email
        subject: `New ${formData.category} inquiry from ${formData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007acc; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #555; margin-top: 0;">Contact Details</h3>
              <p><strong>Name:</strong> ${formData.name}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
              ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
              <p><strong>Preferred Contact:</strong> ${formData.preferredContact}</p>
            </div>
            
            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #555; margin-top: 0;">Project Details</h3>
              <p><strong>Category:</strong> ${formData.category}</p>
              ${formData.budget ? `<p><strong>Budget:</strong> ${formData.budget}</p>` : ''}
              ${formData.timeline ? `<p><strong>Timeline:</strong> ${formData.timeline}</p>` : ''}
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
              <h3 style="color: #555; margin-top: 0;">Message</h3>
              <p style="line-height: 1.6; white-space: pre-wrap;">${formData.message}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #e3f2fd; border-radius: 8px;">
              <p style="margin: 0; font-size: 14px; color: #666;">
                This message was sent from your portfolio contact form.
                <br><strong>Preferred contact method:</strong> ${formData.preferredContact}
              </p>
            </div>
          </div>
        `,
      });

      return NextResponse.json(
        { message: 'Message sent successfully!' },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      return NextResponse.json(
        { message: 'Failed to send email. Please try contacting directly.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}