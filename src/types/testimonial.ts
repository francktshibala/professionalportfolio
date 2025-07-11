// Database testimonial type (from Prisma)
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string | null;
  content: string;
  rating?: number | null;
  image?: string | null;
  featured: boolean;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Legacy testimonial type (used in static data)
export interface LegacyTestimonial {
  author: string;
  position: string;
  company?: string;
  quote: string;
  rating?: number;
  image?: string;
}

// API response type
export interface TestimonialResponse {
  success: boolean;
  data: Testimonial[];
  count?: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Type conversion utilities
export const TestimonialConverter = {
  // Convert legacy testimonial to new format
  legacyToNew(legacy: LegacyTestimonial): Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      name: legacy.author,
      role: legacy.position,
      company: legacy.company || null,
      content: legacy.quote,
      rating: legacy.rating || 5,
      image: legacy.image || null,
      featured: false,
      approved: true
    };
  },

  // Convert new testimonial to legacy format (for backward compatibility)
  newToLegacy(testimonial: Testimonial): LegacyTestimonial {
    return {
      author: testimonial.name,
      position: testimonial.role,
      company: testimonial.company || undefined,
      quote: testimonial.content,
      rating: testimonial.rating || 5,
      image: testimonial.image || undefined
    };
  },

  // Convert array of database testimonials to legacy format
  arrayToLegacy(testimonials: Testimonial[]): LegacyTestimonial[] {
    return testimonials.map(this.newToLegacy);
  },

  // Convert array of legacy testimonials to new format
  arrayFromLegacy(legacyTestimonials: LegacyTestimonial[]): Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>[] {
    return legacyTestimonials.map(this.legacyToNew);
  }
};

// Form data type for creating/updating testimonials
export interface TestimonialFormData {
  name: string;
  role: string;
  company?: string;
  content: string;
  rating?: number;
  image?: string;
  featured?: boolean;
  approved?: boolean;
}

// API error type
export interface TestimonialError {
  success: false;
  error: string;
}