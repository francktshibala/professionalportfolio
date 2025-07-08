'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { MotionDiv } from '@/components/ui/MotionComponents';

interface FormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  category: string;
  budget?: string;
  timeline?: string;
  message: string;
  preferredContact: string;
  attachments?: File[];
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  category?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  preferredContact?: string;
  attachments?: string;
  submit?: string;
}

interface ContactCategory {
  id: string;
  label: string;
  description: string;
  icon: string;
}

const contactCategories: ContactCategory[] = [
  {
    id: 'project',
    label: 'New Project',
    description: 'Discuss a new web development project',
    icon: '🚀'
  },
  {
    id: 'consultation',
    label: 'Consultation',
    description: 'Technical consultation or code review',
    icon: '💡'
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    description: 'Partnership or team collaboration',
    icon: '🤝'
  },
  {
    id: 'employment',
    label: 'Job Opportunity',
    description: 'Full-time or contract position',
    icon: '💼'
  },
  {
    id: 'general',
    label: 'General Inquiry',
    description: 'General questions or other topics',
    icon: '📋'
  }
];

const budgetRanges = [
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-15k', label: '$5,000 - $15,000' },
  { value: '15k-30k', label: '$15,000 - $30,000' },
  { value: '30k-50k', label: '$30,000 - $50,000' },
  { value: 'over-50k', label: 'Over $50,000' },
  { value: 'discuss', label: 'Let\'s discuss' }
];

const timelineOptions = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-month', label: 'Within 1 month' },
  { value: '3-months', label: '1-3 months' },
  { value: '6-months', label: '3-6 months' },
  { value: 'flexible', label: 'Flexible timeline' }
];

const contactMethods = [
  { value: 'email', label: 'Email', icon: '📧' },
  { value: 'phone', label: 'Phone', icon: '📞' },
  { value: 'linkedin', label: 'LinkedIn', icon: '💼' },
  { value: 'whatsapp', label: 'WhatsApp', icon: '💬' }
];

export function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    category: '',
    budget: '',
    timeline: '',
    message: '',
    preferredContact: 'email',
    attachments: []
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [realTimeValidation, setRealTimeValidation] = useState(false);
  const totalSteps = 3;

  const validateField = (field: keyof FormData, value: string | string[] | File[] | undefined): string | undefined => {
    switch (field) {
      case 'name':
        if (!value || typeof value !== 'string' || !value.trim()) {
          return 'Name is required';
        }
        if (value.trim().length < 2) {
          return 'Name must be at least 2 characters';
        }
        if (value.trim().length > 50) {
          return 'Name must be less than 50 characters';
        }
        break;
      case 'email':
        if (!value || typeof value !== 'string' || !value.trim()) {
          return 'Email is required';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (value && typeof value === 'string' && value.trim()) {
          if (!/^[+]?[(]?[0-9\s\-\(\)]{10,}$/.test(value)) {
            return 'Please enter a valid phone number';
          }
        }
        break;
      case 'company':
        if (value && typeof value === 'string' && value.trim().length > 100) {
          return 'Company name must be less than 100 characters';
        }
        break;
      case 'category':
        if (!value || typeof value !== 'string' || !value.trim()) {
          return 'Please select a category';
        }
        break;
      case 'message':
        if (!value || typeof value !== 'string' || !value.trim()) {
          return 'Message is required';
        }
        if (value.trim().length < 10) {
          return 'Message must be at least 10 characters';
        }
        if (value.trim().length > 2000) {
          return 'Message must be less than 2000 characters';
        }
        break;
      case 'preferredContact':
        if (!value || typeof value !== 'string' || !value.trim()) {
          return 'Please select a preferred contact method';
        }
        break;
    }
    return undefined;
  };

  const validateStep = useCallback((step: number): boolean => {
    const newErrors: FormErrors = {};
    let fieldsToValidate: (keyof FormData)[] = [];

    switch (step) {
      case 1:
        fieldsToValidate = ['name', 'email', 'company', 'phone'];
        break;
      case 2:
        fieldsToValidate = ['category', 'budget', 'timeline'];
        break;
      case 3:
        fieldsToValidate = ['message', 'preferredContact'];
        break;
    }

    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const allFields: (keyof FormData)[] = ['name', 'email', 'company', 'phone', 'category', 'message', 'preferredContact'];

    allFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (realTimeValidation) {
      const timer = setTimeout(() => {
        validateStep(currentStep);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [formData, currentStep, realTimeValidation, validateStep]);

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
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        category: '',
        budget: '',
        timeline: '',
        message: '',
        preferredContact: 'email',
        attachments: []
      });
      setCurrentStep(1);
      trackFormEvent('form_submitted', {
        category: formData.category,
        budget: formData.budget,
        timeline: formData.timeline
      });
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setRealTimeValidation(true);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleStepChange = (step: number) => {
    if (step > currentStep) {
      if (validateStep(currentStep)) {
        setCurrentStep(step);
      }
    } else {
      setCurrentStep(step);
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const trackFormEvent = (eventName: string, properties?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag('event', eventName, {
        event_category: 'Contact Form',
        ...properties
      });
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center">
              <button
                onClick={() => handleStepChange(stepNumber)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-500 text-white shadow-lg'
                    : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </button>
              {i < totalSteps - 1 && (
                <div className={`w-16 h-0.5 mx-2 ${
                  isCompleted ? 'bg-green-500' : 'bg-secondary-200 dark:bg-secondary-700'
                }`} />
              )}
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <span className="text-sm text-secondary-600 dark:text-secondary-400">
          Step {currentStep} of {totalSteps}: {
            currentStep === 1 ? 'Personal Information' :
            currentStep === 2 ? 'Project Details' :
            'Message & Preferences'
          }
        </span>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
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
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
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
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
        )}
      </div>

      <div>
        <label 
          htmlFor="company" 
          className="block text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-2"
        >
          Company/Organization
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company || ''}
          onChange={(e) => handleInputChange('company', e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            errors.company 
              ? 'border-red-500 bg-red-50 dark:bg-red-950/20' 
              : 'border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800'
          }`}
          placeholder="Company name (optional)"
          disabled={isSubmitting}
        />
        {errors.company && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.company}</p>
        )}
      </div>

      <div>
        <label 
          htmlFor="phone" 
          className="block text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-2"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone || ''}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            errors.phone 
              ? 'border-red-500 bg-red-50 dark:bg-red-950/20' 
              : 'border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800'
          }`}
          placeholder="Your phone number (optional)"
          disabled={isSubmitting}
        />
        {errors.phone && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
          What can I help you with? *
        </label>
        <div className="grid gap-3">
          {contactCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleInputChange('category', category.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
                formData.category === category.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/20'
                  : 'border-secondary-200 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <div className="font-semibold text-secondary-900 dark:text-secondary-100">
                    {category.label}
                  </div>
                  <div className="text-sm text-secondary-600 dark:text-secondary-400">
                    {category.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        {errors.category && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.category}</p>
        )}
      </div>

      {(formData.category === 'project' || formData.category === 'consultation') && (
        <div>
          <label 
            htmlFor="budget" 
            className="block text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-2"
          >
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget || ''}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.budget 
                ? 'border-red-500 bg-red-50 dark:bg-red-950/20' 
                : 'border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800'
            }`}
            disabled={isSubmitting}
          >
            <option value="">Select budget range</option>
            {budgetRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          {errors.budget && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.budget}</p>
          )}
        </div>
      )}

      {(formData.category === 'project' || formData.category === 'consultation') && (
        <div>
          <label 
            htmlFor="timeline" 
            className="block text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-2"
          >
            Project Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline || ''}
            onChange={(e) => handleInputChange('timeline', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.timeline 
                ? 'border-red-500 bg-red-50 dark:bg-red-950/20' 
                : 'border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800'
            }`}
            disabled={isSubmitting}
          >
            <option value="">Select timeline</option>
            {timelineOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.timeline && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.timeline}</p>
          )}
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
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
          rows={6}
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical ${
            errors.message 
              ? 'border-red-500 bg-red-50 dark:bg-red-950/20' 
              : 'border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800'
          }`}
          placeholder="Tell me about your project, requirements, or questions..."
          disabled={isSubmitting}
        />
        <div className="flex justify-between items-center mt-2">
          {errors.message && (
            <p className="text-sm text-red-600 dark:text-red-400">{errors.message}</p>
          )}
          <span className="text-xs text-secondary-500 dark:text-secondary-400 ml-auto">
            {formData.message.length}/2000
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
          Preferred Contact Method *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {contactMethods.map((method) => (
            <button
              key={method.value}
              type="button"
              onClick={() => handleInputChange('preferredContact', method.value)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-center hover:shadow-md ${
                formData.preferredContact === method.value
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/20'
                  : 'border-secondary-200 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-600'
              }`}
            >
              <div className="text-2xl mb-2">{method.icon}</div>
              <div className="font-semibold text-secondary-900 dark:text-secondary-100">
                {method.label}
              </div>
            </button>
          ))}
        </div>
        {errors.preferredContact && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.preferredContact}</p>
        )}
      </div>
    </div>
  );

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
        <p className="text-secondary-600 dark:text-secondary-400 mb-4">
          Thank you for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">What happens next?</h4>
          <ul className="text-sm text-secondary-600 dark:text-secondary-400 space-y-1">
            <li>• You&apos;ll receive a confirmation email shortly</li>
            <li>• I&apos;ll review your inquiry and respond within 24 hours</li>
            <li>• We can schedule a call to discuss your project in detail</li>
          </ul>
        </div>
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="secondary"
          >
            Send Another Message
          </Button>
          <Button 
            onClick={() => window.open('https://calendly.com/francisco', '_blank')}
            className="bg-gradient-to-r from-primary-500 to-accent-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Schedule a Call
          </Button>
        </div>
      </MotionDiv>
    );
  }

  return (
    <Card className="p-8 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-sm border-secondary-200 dark:border-secondary-700">
      {renderProgressBar()}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <MotionDiv
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </MotionDiv>

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

        <div className="flex justify-between">
          <Button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1 || isSubmitting}
            variant="secondary"
            className={currentStep === 1 ? 'invisible' : ''}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="ml-auto"
            >
              Next
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="ml-auto relative"
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
          )}
        </div>
      </form>
    </Card>
  );
}

