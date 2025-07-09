'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'

interface AnalyticsData {
  totalViews: number
  totalLikes: number
  popularProjects: Array<{
    id: string
    title: string
    views: number
    likes: number
  }>
  popularPosts: Array<{
    id: string
    title: string
    views: number
    likes: number
  }>
  recentActivity: Array<{
    type: 'view' | 'like' | 'contact'
    item: string
    timestamp: string
  }>
}

interface Stats {
  projects: { total: number; published: number; draft: number }
  posts: { total: number; published: number; draft: number }
  skills: { total: number; featured: number }
  contacts: { total: number; unread: number; replied: number }
}

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')

  useEffect(() => {
    fetchAnalytics()
    fetchStats()
  }, [timeRange]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics?range=${timeRange}`)
      const data = await response.json()
      if (data.success) {
        setAnalytics(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    }
  }

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

      const [projectsData, postsData, skillsData, contactsData] = await Promise.all([
        projectsRes.json(),
        postsRes.json(),
        skillsRes.json(),
        contactsRes.json()
      ])

      const projects = projectsData.data || []
      const posts = postsData.data || []
      const skills = skillsData.data || []
      const contacts = contactsData.data || []

      setStats({
        projects: {
          total: projects.length,
          published: projects.filter((p: { status: string }) => p.status === 'ACTIVE').length,
          draft: projects.filter((p: { status: string }) => p.status === 'DRAFT').length
        },
        posts: {
          total: posts.length,
          published: posts.filter((p: { published: boolean }) => p.published).length,
          draft: posts.filter((p: { published: boolean }) => !p.published).length
        },
        skills: {
          total: skills.length,
          featured: skills.filter((s: { featured: boolean }) => s.featured).length
        },
        contacts: {
          total: contacts.length,
          unread: contacts.filter((c: { status: string }) => c.status === 'UNREAD').length,
          replied: contacts.filter((c: { status: string }) => c.status === 'REPLIED').length
        }
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'all', label: 'All time' }
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading analytics...</div>
        ) : (
          <div className="space-y-6">
            {/* Overview Stats */}
            {stats && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                          <span className="text-white text-lg">🚀</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Projects</dt>
                          <dd className="text-lg font-medium text-gray-900">{stats.projects.total}</dd>
                          <dd className="text-sm text-gray-500">
                            {stats.projects.published} published, {stats.projects.draft} draft
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                          <span className="text-white text-lg">📝</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Blog Posts</dt>
                          <dd className="text-lg font-medium text-gray-900">{stats.posts.total}</dd>
                          <dd className="text-sm text-gray-500">
                            {stats.posts.published} published, {stats.posts.draft} draft
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                          <span className="text-white text-lg">⚡</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Skills</dt>
                          <dd className="text-lg font-medium text-gray-900">{stats.skills.total}</dd>
                          <dd className="text-sm text-gray-500">
                            {stats.skills.featured} featured
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                          <span className="text-white text-lg">📧</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Contacts</dt>
                          <dd className="text-lg font-medium text-gray-900">{stats.contacts.total}</dd>
                          <dd className="text-sm text-gray-500">
                            {stats.contacts.unread} unread, {stats.contacts.replied} replied
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Engagement Metrics */}
            {analytics && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Total Engagement</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{analytics.totalViews}</div>
                        <div className="text-sm text-gray-500">Total Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{analytics.totalLikes}</div>
                        <div className="text-sm text-gray-500">Total Likes</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Engagement Rate</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {analytics.totalViews > 0 ? Math.round((analytics.totalLikes / analytics.totalViews) * 100) : 0}%
                        </div>
                        <div className="text-sm text-gray-500">Like Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {stats ? Math.round((stats.contacts.total / Math.max(analytics.totalViews, 1)) * 100) : 0}%
                        </div>
                        <div className="text-sm text-gray-500">Contact Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Popular Content */}
            {analytics && (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Popular Projects
                    </h3>
                    <div className="space-y-3">
                      {analytics.popularProjects.length > 0 ? (
                        analytics.popularProjects.slice(0, 5).map((project) => (
                          <div key={project.id} className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {project.title}
                              </p>
                            </div>
                            <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                              <span className="text-sm text-gray-500">👁 {project.views}</span>
                              <span className="text-sm text-gray-500">❤ {project.likes}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No project data available</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Popular Blog Posts
                    </h3>
                    <div className="space-y-3">
                      {analytics.popularPosts.length > 0 ? (
                        analytics.popularPosts.slice(0, 5).map((post) => (
                          <div key={post.id} className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {post.title}
                              </p>
                            </div>
                            <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                              <span className="text-sm text-gray-500">👁 {post.views}</span>
                              <span className="text-sm text-gray-500">❤ {post.likes}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No blog post data available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Analytics Actions</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <button
                    onClick={() => window.open('https://analytics.google.com', '_blank')}
                    className="relative group bg-white p-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">📊</span>
                      <span className="text-sm font-medium text-gray-900">Google Analytics</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => window.open('/api/analytics?format=json', '_blank')}
                    className="relative group bg-white p-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">📄</span>
                      <span className="text-sm font-medium text-gray-900">Export Data</span>
                    </div>
                  </button>
                  
                  <a
                    href="/admin/contacts"
                    className="relative group bg-white p-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">📧</span>
                      <span className="text-sm font-medium text-gray-900">View Contacts</span>
                    </div>
                  </a>
                  
                  <a
                    href="/admin"
                    className="relative group bg-white p-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🏠</span>
                      <span className="text-sm font-medium text-gray-900">Dashboard</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}