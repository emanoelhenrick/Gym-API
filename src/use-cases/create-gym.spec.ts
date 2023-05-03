import { test, describe, expect } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

const makeSut = () => {
  const gymRepository = new InMemoryGymsRepository()
  return new CreateGymUseCase(gymRepository)
}

describe('Create Gym Use Case', () => {
  test('Should be able to create gym', async () => {
    const sut = makeSut()

    const { gym } = await sut.execute({
      title: 'Javascript Gym',
      latitude: -8.4108186,
      longitude: -37.0507571,
      description: null,
      phone: null
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
