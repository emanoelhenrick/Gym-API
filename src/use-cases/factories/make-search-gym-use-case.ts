import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymUseCase } from '../gyms/search-gym'

export function makeSearchGymUseCase () {
  const gymsRepository = new PrismaGymsRepository()
  return new SearchGymUseCase(gymsRepository)
}
