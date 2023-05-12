import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import z from 'zod'

export async function nearby (req: FastifyRequest, res: FastifyReply) {
  const { latitude, longitude } = validateNearbyGymQueryParams(req.query)
  const fetchNearbyGyms = makeFetchNearbyGymsUseCase()
  const fetchNearbyGymsResponse = await fetchNearbyGyms.execute({
    userLatitude: latitude,
    userLongitude: longitude
  })
  const { gyms } = fetchNearbyGymsResponse
  return await res.status(200).send({
    gyms
  })

  function validateNearbyGymQueryParams (query: any) {
    const nearbyGymsQuerySchema = z.object({
      latitude: z.coerce.number().refine(value => {
        return Math.abs(value) <= 90
      }),
      longitude: z.coerce.number().refine(value => {
        return Math.abs(value) <= 180
      })
    })
    return nearbyGymsQuerySchema.parse(query)
  }
}
