'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'

interface Contact {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  status: 'UNREAD' | 'READ' | 'REPLIED'
  createdAt: string
  updatedAt: string
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const apiKey = sessionStorage.getItem('adminApiKey')
      if (!apiKey) return

      const response = await fetch('/api/admin/contacts', {
        headers: { 'x-api-key': apiKey }
      })
      const data = await response.json()
      if (data.success) {
        setContacts(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateContactStatus = async (id: string, status: 'UNREAD' | 'READ' | 'REPLIED') => {
    try {
      const apiKey = sessionStorage.getItem('adminApiKey')
      if (!apiKey) return

      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({ status })
      })

      if (response.ok) {
        await fetchContacts()
        if (selectedContact && selectedContact.id === id) {
          setSelectedContact({ ...selectedContact, status })
        }
      } else {
        alert('Failed to update contact status')
      }
    } catch (error) {
      console.error('Failed to update contact status:', error)
      alert('Failed to update contact status')
    }
  }

  const deleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact message?')) return

    try {
      const apiKey = sessionStorage.getItem('adminApiKey')
      if (!apiKey) return

      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: { 'x-api-key': apiKey }
      })

      if (response.ok) {
        await fetchContacts()
        if (selectedContact && selectedContact.id === id) {
          setShowDetails(false)
          setSelectedContact(null)
        }
      } else {
        alert('Failed to delete contact')
      }
    } catch (error) {
      console.error('Failed to delete contact:', error)
      alert('Failed to delete contact')
    }
  }

  const handleContactClick = async (contact: Contact) => {
    setSelectedContact(contact)
    setShowDetails(true)
    
    // Mark as read if it was unread
    if (contact.status === 'UNREAD') {
      await updateContactStatus(contact.id, 'READ')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UNREAD': return 'bg-red-100 text-red-800'
      case 'READ': return 'bg-yellow-100 text-yellow-800'
      case 'REPLIED': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'UNREAD': return '🔴'
      case 'READ': return '🟡'
      case 'REPLIED': return '✅'
      default: return '⚪'
    }
  }

  const unreadCount = contacts.filter(c => c.status === 'UNREAD').length
  const totalCount = contacts.length

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
            <p className="text-sm text-gray-600">
              {unreadCount} unread of {totalCount} total messages
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading contact messages...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact List */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Messages</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {contacts.length === 0 ? (
                    <div className="px-6 py-8 text-center text-gray-500">
                      No contact messages yet.
                    </div>
                  ) : (
                    contacts.map((contact) => (
                      <div
                        key={contact.id}
                        onClick={() => handleContactClick(contact)}
                        className={`px-6 py-4 cursor-pointer hover:bg-gray-50 ${
                          contact.status === 'UNREAD' ? 'bg-blue-50' : ''
                        } ${selectedContact?.id === contact.id ? 'bg-blue-100' : ''}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{getStatusIcon(contact.status)}</span>
                              <p className={`text-sm font-medium ${
                                contact.status === 'UNREAD' ? 'text-gray-900' : 'text-gray-600'
                              }`}>
                                {contact.name}
                              </p>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(contact.status)}`}>
                                {contact.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{contact.email}</p>
                            {contact.subject && (
                              <p className="text-sm font-medium text-gray-700 mt-1">
                                {contact.subject}
                              </p>
                            )}
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {contact.message}
                            </p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <p className="text-xs text-gray-500">
                              {formatDate(contact.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-1">
              {showDetails && selectedContact ? (
                <div className="bg-white shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Message Details</h3>
                  </div>
                  <div className="px-6 py-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">From</h4>
                      <p className="text-sm text-gray-900">{selectedContact.name}</p>
                      <a 
                        href={`mailto:${selectedContact.email}`}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {selectedContact.email}
                      </a>
                    </div>
                    
                    {selectedContact.subject && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Subject</h4>
                        <p className="text-sm text-gray-900">{selectedContact.subject}</p>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Message</h4>
                      <div className="text-sm text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded-md">
                        {selectedContact.message}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Status</h4>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(selectedContact.status)}`}>
                        {selectedContact.status}
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Received</h4>
                      <p className="text-sm text-gray-900">{formatDate(selectedContact.createdAt)}</p>
                    </div>
                    
                    {/* Actions */}
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Actions</h4>
                      <div className="space-y-2">
                        <a
                          href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject || 'Your message'}`}
                          className="block w-full text-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Reply via Email
                        </a>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => updateContactStatus(selectedContact.id, 'READ')}
                            disabled={selectedContact.status === 'READ'}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                          >
                            Mark Read
                          </button>
                          <button
                            onClick={() => updateContactStatus(selectedContact.id, 'REPLIED')}
                            disabled={selectedContact.status === 'REPLIED'}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                          >
                            Mark Replied
                          </button>
                        </div>
                        
                        <button
                          onClick={() => deleteContact(selectedContact.id)}
                          className="block w-full px-3 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                        >
                          Delete Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white shadow rounded-lg">
                  <div className="px-6 py-8 text-center text-gray-500">
                    Select a message to view details
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}