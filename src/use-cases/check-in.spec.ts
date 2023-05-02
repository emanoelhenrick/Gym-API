import { test, describe, expect } from 'vitest'
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
  test('Should be able to create a new Check In', async () => {
    const { checkInUseCase } = makeSut()
    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
})
