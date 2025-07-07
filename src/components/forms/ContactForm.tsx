'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { MotionDiv } from '@/components/ui/MotionComponents';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  submit?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <MotionDiv
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-secondary-600 dark:text-secondary-400 mb-6">
          Thank you for reaching out. I&apos;ll get back to you as soon as possible.
        </p>
        <Button 
          onClick={() => setIsSubmitted(false)}
          variant="secondary"
        >
          Send Another Message
        </Button>
      </MotionDiv>
    );
  }

  return (
    <Card className="p-8 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-sm border-secondary-200 dark:border-secondary-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="name" 
            className="block text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.name 
                ? 'border-red-500 bg-red-50 dark:bg-red-950/20' 
                : 'border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800'
            }`}
            placeholder="Enter your full name"
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={!!errors.name}
            disabled={isSubmitting}
          />
          {errors.name && (
            <MotionDiv
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2"
            >
              <p id="name-error" className="text-sm text-red-600 dark:text-red-400">
                {errors.name}
              </p>
            </MotionDiv>
          )}
        </div>

        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-2"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.email 
                ? 'border-red-500 bg-red-50 dark:bg-red-950/20' 
                : 'border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800'
            }`}
            placeholder="Enter your email address"
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={!!errors.email}
            disabled={isSubmitting}
          />
          {errors.email && (
            <MotionDiv
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2"
            >
              <p id="email-error" className="text-sm text-red-600 dark:text-red-400">
                {errors.email}
              </p>
            </MotionDiv>
          )}
        </div>

        <div>
          <label 
            htmlFor="message" 
            className="block text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-2"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical ${
              errors.message 
                ? 'border-red-500 bg-red-50 dark:bg-red-950/20' 
                : 'border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800'
            }`}
            placeholder="Tell me about your project or idea..."
            aria-describedby={errors.message ? 'message-error' : undefined}
            aria-invalid={!!errors.message}
            disabled={isSubmitting}
          />
          <div className="flex justify-between items-center mt-2">
            {errors.message ? (
              <MotionDiv
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p id="message-error" className="text-sm text-red-600 dark:text-red-400">
                  {errors.message}
                </p>
              </MotionDiv>
            ) : (
              <div />
            )}
            <span className="text-xs text-secondary-500 dark:text-secondary-400">
              {formData.message.length}/1000
            </span>
          </div>
        </div>

        {errors.submit && (
          <MotionDiv
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.submit}
            </p>
          </MotionDiv>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full relative"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Sending Message...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Message
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}