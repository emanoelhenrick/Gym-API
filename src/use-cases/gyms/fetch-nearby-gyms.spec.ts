import { describe, expect, test } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

const makeSut = async () => {
  const gymsRepository = new InMemoryGymsRepository()
  const fetchNearbyGyms = new FetchNearbyGymsUseCase(gymsRepository)
  return {
    gymsRepository,
    fetchNearbyGyms
  }
}

describe('Fetch Nearby Gyms Use Case', () => {
  test('Should be able to fetch nearby gyms', async () => {
    const { fetchNearbyGyms, gymsRepository } = await makeSut()

    await gymsRepository.create({
      title: 'Near Gym',
      latitude: -8.2884698,
      longitude: -35.9696649,
      description: null,
      phone: null
    })

    await gymsRepository.create({
      title: 'Far Gym',
      latitude: -7.6562084,
      longitude: -35.2760146,
      description: null,
      phone: null
    })

    const { gyms } = await fetchNearbyGyms.execute({ userLatitude: -8.2884698, userLongitude: -35.9696649 })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
