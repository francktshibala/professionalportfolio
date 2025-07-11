'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
// Custom hook for auth
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const key = sessionStorage.getItem('adminApiKey');
    if (key) {
      setApiKey(key);
      setIsAuthenticated(true);
    }
  }, []);

  return { isAuthenticated, apiKey };
}

import { type Testimonial, type TestimonialFormData } from '@/types/testimonial';

export default function TestimonialsAdminPage() {
  const { isAuthenticated, apiKey } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    image: '',
    featured: false,
    approved: true
  });

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/testimonials', {
        headers: {
          'x-api-key': apiKey
        }
      });
      const data = await response.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTestimonials();
    }
  }, [isAuthenticated, fetchTestimonials]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingTestimonial 
        ? `/api/admin/testimonials/${editingTestimonial.id}`
        : '/api/admin/testimonials';
      
      const method = editingTestimonial ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        await fetchTestimonials();
        setIsFormOpen(false);
        setEditingTestimonial(null);
        setFormData({
          name: '',
          role: '',
          company: '',
          content: '',
          rating: 5,
          image: '',
          featured: false,
          approved: true
        });
      }
    } catch (error) {
      console.error('Failed to save testimonial:', error);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company || '',
      content: testimonial.content,
      rating: testimonial.rating || 5,
      image: testimonial.image || '',
      featured: testimonial.featured,
      approved: testimonial.approved
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE',
        headers: {
          'x-api-key': apiKey
        }
      });

      const data = await response.json();
      if (data.success) {
        await fetchTestimonials();
      }
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Text>Please log in to access testimonials management.</Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Heading as="h1" className="text-3xl font-bold">
            Testimonials Management
          </Heading>
          <Button
            onClick={() => {
              setIsFormOpen(true);
              setEditingTestimonial(null);
              setFormData({
                name: '',
                role: '',
                company: '',
                content: '',
                rating: 5,
                image: '',
                featured: false,
                approved: true
              });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add New Testimonial
          </Button>
        </div>

        {/* Form Modal */}
        {isFormOpen && (
          <Card className="mb-8 p-6">
            <Heading as="h2" className="text-xl font-bold mb-4">
              {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
            </Heading>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role *</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Featured
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="approved"
                    checked={formData.approved}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Approved
                </label>
              </div>
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {editingTestimonial ? 'Update' : 'Create'} Testimonial
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Testimonials List */}
        {loading ? (
          <div className="text-center py-8">
            <Text>Loading testimonials...</Text>
          </div>
        ) : (
          <div className="space-y-4">
            {testimonials.length === 0 ? (
              <Card className="p-6 text-center">
                <Text>No testimonials found. Create your first testimonial above.</Text>
              </Card>
            ) : (
              testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div>
                          <Heading as="h3" className="text-lg font-bold">
                            {testimonial.name}
                          </Heading>
                          <Text className="text-sm text-gray-600">
                            {testimonial.role} {testimonial.company && `at ${testimonial.company}`}
                          </Text>
                        </div>
                        <div className="flex items-center gap-2">
                          {testimonial.featured && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                          {testimonial.approved ? (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Approved
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <blockquote className="text-gray-700 dark:text-gray-300 mb-3">
                        &ldquo;{testimonial.content}&rdquo;
                      </blockquote>
                      <Text className="text-sm text-gray-500">
                        Created: {new Date(testimonial.createdAt).toLocaleDateString()}
                      </Text>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        onClick={() => handleEdit(testimonial)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(testimonial.id)}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}