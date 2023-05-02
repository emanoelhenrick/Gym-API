import { test, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

const makeSut = () => {
  const checkInRepository = new InMemoryCheckInsRepository()
  const gymsRepository = new InMemoryGymsRepository()

  gymsRepository.items.push({
    id: 'gym-01',
    title: 'Javascript Gym',
    description: 'idk',
    latitude: new Decimal(0),
    longitude: new Decimal(0),
    phone: ''
  })

  const checkInUseCase = new CheckInUseCase(checkInRepository, gymsRepository)
  return {
    checkInRepository,
    gymsRepository,
    checkInUseCase
  }
}

describe('Check In Use Case', () => {
  const defaultUser = {
    gymId: 'gym-01',
    userId: 'user-01',
    userLatitude: 0,
    userLongitude: 0
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('Should be able to create a new Check In', async () => {
    const { checkInUseCase } = makeSut()

    const { checkIn } = await checkInUseCase.execute(defaultUser)
    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('Should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    const { checkInUseCase } = makeSut()
    await checkInUseCase.execute(defaultUser)
    await expect(async () => checkInUseCase.execute(defaultUser))
      .rejects
      .toBeInstanceOf(Error)
  })

  test('Should be able to check in twice in different dates', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    const { checkInUseCase } = makeSut()
    await checkInUseCase.execute(defaultUser)

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    const { checkIn } = await checkInUseCase.execute(defaultUser)
    expect(checkIn.id).toEqual(expect.any(String))
  })
})
