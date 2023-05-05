import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'
import { describe, expect, test } from 'vitest'

const makeSut = async () => {
  const checkInRepository = new InMemoryCheckInsRepository()
  const FetchUserCheckInsHistory = new FetchUserCheckInsHistoryUseCase(checkInRepository)
  return {
    checkInRepository,
    FetchUserCheckInsHistory
  }
}

describe('Fetch User Check-in History Use Case', () => {
  // const defaultUser = {
  //   gymId: 'gym-01',
  //   userId: 'user-01',
  //   userLatitude: -8.4108186,
  //   userLongitude: -37.0507571
  // }

  test('Should be able to fetch check-in history', async () => {
    const { FetchUserCheckInsHistory, checkInRepository } = await makeSut()

    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    })

    const { checkIns } = await FetchUserCheckInsHistory.execute({ userId: 'user-01', page: 1 })
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' })
    ])
  })

  test('Should be able to fetch paginated check-in history', async () => {
    const { FetchUserCheckInsHistory, checkInRepository } = await makeSut()

    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01'
      })
    }

    const { checkIns } = await FetchUserCheckInsHistory.execute({ userId: 'user-01', page: 2 })
    console.log(checkIns)

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' })
    ])
  })
})
