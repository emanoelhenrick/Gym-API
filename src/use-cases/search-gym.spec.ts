import { describe, expect, test } from 'vitest'
import { SearchGymUseCase } from './search-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

const makeSut = async () => {
  const gymsRepository = new InMemoryGymsRepository()
  const searchGym = new SearchGymUseCase(gymsRepository)
  return {
    gymsRepository,
    searchGym
  }
}

describe('Search Gyms Use Case', () => {
  test('Should be able to to search for gyms', async () => {
    const { searchGym, gymsRepository } = await makeSut()

    await gymsRepository.create({
      title: 'Javascript Gym',
      latitude: -8.4108186,
      longitude: -37.0507571,
      description: null,
      phone: null
    })

    await gymsRepository.create({
      title: 'Typescript Gym',
      latitude: -8.4108186,
      longitude: -37.0507571,
      description: null,
      phone: null
    })

    const { gyms } = await searchGym.execute({ query: 'Javascript', page: 1 })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym' })
    ])
  })

  test('Should be able to fetch paginated gym search', async () => {
    const { searchGym, gymsRepository } = await makeSut()

    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript Gym ${i}`,
        latitude: -8.4108186,
        longitude: -37.0507571,
        description: null,
        phone: null
      })
    }

    const { gyms } = await searchGym.execute({ query: 'Javascript', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym 21' }),
      expect.objectContaining({ title: 'Javascript Gym 22' })
    ])
  })
})
