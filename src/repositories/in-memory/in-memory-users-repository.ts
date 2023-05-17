import { type Prisma, type User } from '@prisma/client'
import { type UserRepository } from '../protocols/users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = []

  async create (data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: 'MEMBER',
      created_at: new Date()
    }
    this.items.push(user)
    return user
  }

  async findByEmail (email: string) {
    const user = this.items.find(item => item.email === email)
    if (!user) return null
    return user
  }

  async findById (id: string) {
    const user = this.items.find(item => item.id === id)
    if (!user) return null
    return user
  }
}
