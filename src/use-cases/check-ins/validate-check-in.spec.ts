import { test, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { LateCheckInValidationError } from '../errors/late-check-in-validation-error'

const makeSut = async () => {
  const checkInRepository = new InMemoryCheckInsRepository()

  const validateCheckIn = new ValidateCheckInUseCase(checkInRepository)
  return {
    checkInRepository,
    validateCheckIn
  }
}

describe('Validate Check In Use Case', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('Should be able to validate the check-in', async () => {
    const { validateCheckIn, checkInRepository } = await makeSut()

    const createdCheckIn = await checkInRepository.create({
      gym_id: ' gym-01',
      user_id: 'user-01'
    })

    const { checkIn } = await validateCheckIn.execute({ checkInId: createdCheckIn.id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  test('Should not be able to validate a inexistent check-in', async () => {
    const { validateCheckIn } = await makeSut()

    await expect(async () => validateCheckIn.execute({ checkInId: 'idk' }))
      .rejects
      .toBeInstanceOf(ResourceNotFoundError)
  })

  test('Should not be able to validate a check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))
    const { validateCheckIn, checkInRepository } = await makeSut()

    const createdCheckIn = await checkInRepository.create({
      gym_id: ' gym-01',
      user_id: 'user-01'
    })

    const twentyOneMinutesOnMs = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesOnMs)

    await expect(async () => validateCheckIn.execute({ checkInId: createdCheckIn.id }))
      .rejects
      .toBeInstanceOf(LateCheckInValidationError)
  })
})
