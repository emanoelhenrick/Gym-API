import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-auth-user'

describe('Validate Check-in (e2e)', () => {
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

  test('Should be able to validate check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

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

    const checkInsResponse = await request(app.server)
      .get('/check-ins/history')
      .query({
        page: 1
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    const checkIn: { id: string } = checkInsResponse.body.checkIns[0]

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .query({
        page: 1
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)
  })
})
