import { prisma } from '@/lib/prisma'
import { type Prisma } from '@prisma/client'
import { type UserRepository } from '../protocols/users-repository'

export class PrismaUsersRepository implements UserRepository {
  async create (data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })
    return user
  }

  async findById (id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return user
  }

  async findByEmail (email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    return user
  }
}
