import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from '../check-ins/get-user-metrics'

export function makeGetUserMetricsUseCase () {
  const checkInsRepository = new PrismaCheckInsRepository()
  return new GetUserMetricsUseCase(checkInsRepository)
}
