import { db } from './db'

export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await db.$connect()
    console.log('✅ Database connection successful')
    
    // Test basic query
    const userCount = await db.user.count()
    console.log(`📊 Database has ${userCount} users`)
    
    await db.$disconnect()
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}

export async function testCRUDOperations(): Promise<boolean> {
  try {
    // Test Create
    const testUser = await db.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User'
      }
    })
    console.log('✅ Create operation successful:', testUser.id)

    // Test Read
    const foundUser = await db.user.findUnique({
      where: { id: testUser.id }
    })
    console.log('✅ Read operation successful:', foundUser?.name)

    // Test Update
    const updatedUser = await db.user.update({
      where: { id: testUser.id },
      data: { name: 'Updated Test User' }
    })
    console.log('✅ Update operation successful:', updatedUser.name)

    // Test Delete
    await db.user.delete({
      where: { id: testUser.id }
    })
    console.log('✅ Delete operation successful')

    return true
  } catch (error) {
    console.error('❌ CRUD operations failed:', error)
    return false
  }
}

export async function runDatabaseTests(): Promise<void> {
  console.log('🧪 Starting database tests...\n')
  
  const connectionTest = await testDatabaseConnection()
  if (!connectionTest) {
    console.log('❌ Database connection test failed. Please check your DATABASE_URL.')
    return
  }
  
  const crudTest = await testCRUDOperations()
  if (!crudTest) {
    console.log('❌ CRUD operations test failed.')
    return
  }
  
  console.log('\n🎉 All database tests passed!')
}