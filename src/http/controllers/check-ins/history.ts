import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import z from 'zod'

export async function history (req: FastifyRequest, res: FastifyReply) {
  const { page } = validateCheckInHistory(req.query)
  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()
  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    userId: req.user.sub,
    page
  })
  return await res.status(200).send({
    checkIns
  })

  function validateCheckInHistory (query: any) {
    const checkInHistorySchema = z.object({
      page: z.coerce.number().min(1).default(1)
    })
    return checkInHistorySchema.parse(query)
  }
}
