import { makeSearchGymUseCase } from '@/use-cases/factories/make-search-gym-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import z from 'zod'

export async function search (req: FastifyRequest, res: FastifyReply) {
  const { query, page } = validateSearchGymQueryParams(req.query)
  const searchGym = makeSearchGymUseCase()
  const { gyms } = await searchGym.execute({ query, page })
  return await res.status(200).send({ gyms })

  function validateSearchGymQueryParams (query: any) {
    const searchGymQuerySchema = z.object({
      query: z.string(),
      page: z.coerce.number().min(1).default(1)
    })
    return searchGymQuerySchema.parse(query)
  }
}
