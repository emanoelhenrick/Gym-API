import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../users/authenticate'

export function makeAuthenticateUseCase () {
  const usersRepository = new PrismaUsersRepository()
  return new AuthenticateUseCase(usersRepository)
}
