import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../users/register'

export function makeRegisterUseCase () {
  const usersRepository = new PrismaUsersRepository()
  return new RegisterUseCase(usersRepository)
}
