import { test, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

const makeSut = () => {
  const checkInRepository = new InMemoryCheckInsRepository()
  const checkInUseCase = new CheckInUseCase(checkInRepository)
  return {
    checkInRepository,
    checkInUseCase
  }
}

describe('Check In Use Case', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('Should be able to create a new Check In', async () => {
    const { checkInUseCase } = makeSut()
    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('Should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    const { checkInUseCase } = makeSut()
    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })
    await expect(async () => checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    }))
      .rejects
      .toBeInstanceOf(Error)
  })

  test('Should be able to check in twice in different dates', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    const { checkInUseCase } = makeSut()
    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
})
