import { db } from '../db'
import { Contact } from '@prisma/client'

export class ContactService {
  static async createContact(data: {
    name: string
    email: string
    subject?: string
    message: string
  }): Promise<Contact> {
    return await db.contact.create({
      data
    })
  }

  static async getAllContacts(options?: {
    replied?: boolean
    limit?: number
    skip?: number
  }): Promise<Contact[]> {
    const { replied, limit, skip } = options || {}
    
    return await db.contact.findMany({
      where: {
        ...(replied !== undefined && { replied })
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit,
      skip
    })
  }

  static async markAsReplied(contactId: string): Promise<void> {
    await db.contact.update({
      where: { id: contactId },
      data: { replied: true }
    })
  }

  static async getContactById(id: string): Promise<Contact | null> {
    return await db.contact.findUnique({
      where: { id }
    })
  }
}