import { test, describe, expect } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

const makeSut = async () => {
  const checkInRepository = new InMemoryCheckInsRepository()

  const validateCheckIn = new ValidateCheckInUseCase(checkInRepository)
  return {
    checkInRepository,
    validateCheckIn
  }
}

describe('Validate Check In Use Case', () => {
  // beforeEach(() => {
  //   vi.useFakeTimers()
  // })

  // afterEach(() => {
  //   vi.useRealTimers()
  // })

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
})
