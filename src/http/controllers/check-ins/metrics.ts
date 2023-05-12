import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'

export async function metrics (req: FastifyRequest, res: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()
  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: req.user.sub
  })
  return await res.status(200).send({
    checkInsCount
  })
}
