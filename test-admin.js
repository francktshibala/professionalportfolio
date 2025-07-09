// Test script to verify admin functionality
const API_KEY = 'admin123_secure_key_change_in_production'
const BASE_URL = 'http://localhost:3000'

async function testEndpoint(path, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })
    
    const data = await response.json()
    console.log(`✓ ${path}:`, response.status, data.success ? 'SUCCESS' : 'FAILED')
    return data
  } catch (error) {
    console.log(`✗ ${path}:`, error.message)
    return null
  }
}

async function testAdminAPI() {
  console.log('Testing Admin API Endpoints...\n')
  
  // Test public endpoints (no auth required)
  await testEndpoint('/api/projects')
  await testEndpoint('/api/posts')
  await testEndpoint('/api/skills')
  
  // Test admin endpoints (auth required)
  await testEndpoint('/api/admin/contacts')
  
  console.log('\nAdmin API Test Complete!')
}

if (typeof window === 'undefined') {
  // Node.js environment
  const fetch = require('node-fetch')
  testAdminAPI()
} else {
  // Browser environment
  window.testAdminAPI = testAdminAPI
}