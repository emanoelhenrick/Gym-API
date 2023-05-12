import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-auth-user'

describe('Metrics Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterAll(async () => {
    await app.close()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('Should be able to get check-ins count', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Description',
        phone: '999999999',
        latitude: -8.4108186,
        longitude: -37.0507571
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'Description',
        phone: '999999999',
        latitude: -8.4108186,
        longitude: -37.0507571
      })

    const responseGym01 = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'JavaScript'
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    const gym_01: { id: string } = responseGym01.body.gyms[0]

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await request(app.server)
      .post(`/gyms/${gym_01.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        gymId: gym_01.id,
        latitude: -8.4108186,
        longitude: -37.0507571
      })

    const responseGym02 = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'TypeScript'
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    const gym_02: { id: string } = responseGym02.body.gyms[0]

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    await request(app.server)
      .post(`/gyms/${gym_02.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        gymId: gym_02.id,
        latitude: -8.4108186,
        longitude: -37.0507571
      })

    const response = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInsCount).toEqual(2)
  })
})
