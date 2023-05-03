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
    latitude: new Decimal(-8.4108186),
    longitude: new Decimal(-37.0507571),
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
    userLatitude: -8.4108186,
    userLongitude: -37.0507571
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

  test('Should not be able to check in on distant gym', async () => {
    const { checkInUseCase, gymsRepository } = makeSut()

    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Golang Gym',
      description: 'idk',
      latitude: new Decimal(-8.2920757),
      longitude: new Decimal(-36.9693911),
      phone: ''
    })

    expect(async () => checkInUseCase.execute({
      gymId: 'gym-02',
      userId: 'user-01',
      userLatitude: -8.4108186,
      userLongitude: -37.0507571
    }))
      .rejects
      .toBeInstanceOf(Error)
  })
})
