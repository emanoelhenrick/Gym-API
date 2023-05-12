import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-auth-user'

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('Should be able to check-in', async () => {
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

    const responseGym = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'JavaScript'
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    const { id }: { id: string } = responseGym.body.gyms[0]

    const response = await request(app.server)
      .post(`/gyms/${id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        gymId: id,
        latitude: -8.4108186,
        longitude: -37.0507571
      })

    expect(response.statusCode).toEqual(201)
  })
})
