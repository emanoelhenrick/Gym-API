import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import z from 'zod'

export async function create (req: FastifyRequest, res: FastifyReply) {
  const { gymId } = validateCheckInParams(req.params)
  const { latitude, longitude } = validateCheckInBody(req.body)
  const checkInUseCase = makeCheckInUseCase()
  await checkInUseCase.execute({
    userId: req.user.sub,
    gymId,
    userLatitude: latitude,
    userLongitude: longitude
  })
  return await res.status(201).send()

  function validateCheckInBody (body: any) {
    const checkInBodySchema = z.object({
      latitude: z.number().refine(value => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine(value => {
        return Math.abs(value) <= 180
      })
    })
    return checkInBodySchema.parse(body)
  }

  function validateCheckInParams (params: any) {
    const checkInParamsSchema = z.object({
      gymId: z.string().uuid()
    })
    return checkInParamsSchema.parse(params)
  }
}
