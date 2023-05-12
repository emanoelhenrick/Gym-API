import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import z from 'zod'

export async function create (req: FastifyRequest, res: FastifyReply) {
  const { title, description, phone, latitude, longitude } = validateCreateGymBody(req.body)
  const createGymUseCase = makeCreateGymUseCase()
  await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude
  })
  return await res.status(201).send()

  function validateCreateGymBody (body: any) {
    const createGymBodySchema = z.object({
      title: z.string(),
      description: z.string().nullable(),
      phone: z.string().nullable(),
      latitude: z.number().refine(value => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine(value => {
        return Math.abs(value) <= 180
      })
    })
    return createGymBodySchema.parse(body)
  }
}
