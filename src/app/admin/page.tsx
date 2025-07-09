'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'

interface DashboardStats {
  projects: number
  posts: number
  skills: number
  contacts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiKey = sessionStorage.getItem('adminApiKey')
        if (!apiKey) return

        const [projectsRes, postsRes, skillsRes, contactsRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/posts'),
          fetch('/api/skills'),
          fetch('/api/admin/contacts', { headers: { 'x-api-key': apiKey } })
        ])

        const [projects, posts, skills, contacts] = await Promise.all([
          projectsRes.json(),
          postsRes.json(),
          skillsRes.json(),
          contactsRes.json()
        ])

        setStats({
          projects: projects.data?.length || 0,
          posts: posts.data?.length || 0,
          skills: skills.data?.length || 0,
          contacts: contacts.data?.length || 0
        })
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    { name: 'Projects', value: stats?.projects || 0, icon: '🚀', color: 'bg-blue-500' },
    { name: 'Blog Posts', value: stats?.posts || 0, icon: '📝', color: 'bg-green-500' },
    { name: 'Skills', value: stats?.skills || 0, icon: '⚡', color: 'bg-purple-500' },
    { name: 'Contacts', value: stats?.contacts || 0, icon: '📧', color: 'bg-orange-500' }
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-600">
            Welcome to your admin dashboard. Here's an overview of your content.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 ${stat.color} rounded-md flex items-center justify-center`}>
                      <span className="text-white text-lg">{stat.icon}</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {loading ? '...' : stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <a
                href="/admin/projects"
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🚀</span>
                  <span className="text-sm font-medium text-gray-900">Manage Projects</span>
                </div>
              </a>
              
              <a
                href="/admin/posts"
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📝</span>
                  <span className="text-sm font-medium text-gray-900">Manage Blog Posts</span>
                </div>
              </a>
              
              <a
                href="/admin/contacts"
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📧</span>
                  <span className="text-sm font-medium text-gray-900">View Contacts</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                <span className="text-gray-600">API endpoints operational</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                <span className="text-gray-600">Database connected</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                <span className="text-gray-600">Authentication working</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}