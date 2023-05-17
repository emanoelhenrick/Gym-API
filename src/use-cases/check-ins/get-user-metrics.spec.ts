import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { describe, expect, test } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'

const makeSut = async () => {
  const checkInRepository = new InMemoryCheckInsRepository()
  const getUserMetrics = new GetUserMetricsUseCase(checkInRepository)
  return {
    checkInRepository,
    getUserMetrics
  }
}

describe('Get User Metrics Use Case', () => {
  test('Should be able to get check-ins count from metrics', async () => {
    const { getUserMetrics, checkInRepository } = await makeSut()

    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    })

    const { checkInsCount } = await getUserMetrics.execute({ userId: 'user-01' })
    expect(checkInsCount).toEqual(2)
  })
})
