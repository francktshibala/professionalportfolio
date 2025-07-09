'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'

interface Skill {
  id: string
  name: string
  category: 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'DEVOPS' | 'MOBILE' | 'DESIGN' | 'OTHER'
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
  description?: string
  icon?: string
  color?: string
  order: number
  featured: boolean
  createdAt: string
  updatedAt: string
}

interface SkillFormData {
  name: string
  category: 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'DEVOPS' | 'MOBILE' | 'DESIGN' | 'OTHER'
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
  description: string
  icon: string
  color: string
  order: number
  featured: boolean
}

const categories = [
  { value: 'FRONTEND', label: 'Frontend' },
  { value: 'BACKEND', label: 'Backend' },
  { value: 'DATABASE', label: 'Database' },
  { value: 'DEVOPS', label: 'DevOps' },
  { value: 'MOBILE', label: 'Mobile' },
  { value: 'DESIGN', label: 'Design' },
  { value: 'OTHER', label: 'Other' }
]

const levels = [
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'ADVANCED', label: 'Advanced' },
  { value: 'EXPERT', label: 'Expert' }
]

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [formData, setFormData] = useState<SkillFormData>({
    name: '',
    category: 'FRONTEND',
    level: 'INTERMEDIATE',
    description: '',
    icon: '',
    color: '#3B82F6',
    order: 0,
    featured: false
  })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills')
      const data = await response.json()
      if (data.success) {
        setSkills(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const apiKey = sessionStorage.getItem('adminApiKey')
    if (!apiKey) return

    try {
      const url = editingSkill ? `/api/skills/${editingSkill.id}` : '/api/skills'
      const method = editingSkill ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        await fetchSkills()
        setShowForm(false)
        setEditingSkill(null)
        resetForm()
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Failed to save skill:', error)
      alert('Failed to save skill')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return

    const apiKey = sessionStorage.getItem('adminApiKey')
    if (!apiKey) return

    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
        headers: { 'x-api-key': apiKey }
      })

      if (response.ok) {
        await fetchSkills()
      } else {
        alert('Failed to delete skill')
      }
    } catch (error) {
      console.error('Failed to delete skill:', error)
      alert('Failed to delete skill')
    }
  }

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      description: skill.description || '',
      icon: skill.icon || '',
      color: skill.color || '#3B82F6',
      order: skill.order,
      featured: skill.featured
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'FRONTEND',
      level: 'INTERMEDIATE',
      description: '',
      icon: '',
      color: '#3B82F6',
      order: 0,
      featured: false
    })
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'BEGINNER': return 'bg-gray-100 text-gray-800'
      case 'INTERMEDIATE': return 'bg-blue-100 text-blue-800'
      case 'ADVANCED': return 'bg-green-100 text-green-800'
      case 'EXPERT': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'FRONTEND': return 'bg-blue-100 text-blue-800'
      case 'BACKEND': return 'bg-green-100 text-green-800'
      case 'DATABASE': return 'bg-yellow-100 text-yellow-800'
      case 'DEVOPS': return 'bg-red-100 text-red-800'
      case 'MOBILE': return 'bg-indigo-100 text-indigo-800'
      case 'DESIGN': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Skills Management</h1>
          <button
            onClick={() => {
              setShowForm(true)
              setEditingSkill(null)
              resetForm()
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add New Skill
          </button>
        </div>

        {/* Skills by Category */}
        {loading ? (
          <div className="text-center py-8">Loading skills...</div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium mr-3 ${getCategoryColor(category)}`}>
                      {category}
                    </span>
                    ({categorySkills.length} skills)
                  </h3>
                </div>
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Skill
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Level
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {categorySkills.sort((a, b) => a.order - b.order).map((skill) => (
                        <tr key={skill.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {skill.icon && (
                                <span className="mr-3 text-2xl">{skill.icon}</span>
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-900 flex items-center">
                                  {skill.name}
                                  {skill.featured && (
                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                      Featured
                                    </span>
                                  )}
                                </div>
                                {skill.description && (
                                  <div className="text-sm text-gray-500">{skill.description}</div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getLevelColor(skill.level)}`}>
                              {skill.level}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {skill.order}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleEdit(skill)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(skill.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skill Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Skill Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="e.g., React, Node.js, Python"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'DEVOPS' | 'MOBILE' | 'DESIGN' | 'OTHER' })}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      >
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Level</label>
                      <select
                        value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT' })}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      >
                        {levels.map(level => (
                          <option key={level.value} value={level.value}>{level.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Brief description of your experience with this skill"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Icon (emoji)</label>
                      <input
                        type="text"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="⚛️"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Color</label>
                      <input
                        type="color"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 h-10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Order</label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="featured"
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                      Featured Skill
                    </label>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false)
                        setEditingSkill(null)
                        resetForm()
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      {editingSkill ? 'Update' : 'Create'} Skill
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}