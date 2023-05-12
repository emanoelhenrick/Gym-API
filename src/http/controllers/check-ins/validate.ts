import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import z from 'zod'

export async function validate (req: FastifyRequest, res: FastifyReply) {
  const { checkInId } = validateCheckInParams(req.params)
  const validateCheckInUseCase = makeValidateCheckInUseCase()
  await validateCheckInUseCase.execute({ checkInId })
  return await res.status(204).send()

  function validateCheckInParams (params: any) {
    const checkInParamsSchema = z.object({
      checkInId: z.string().uuid()
    })
    return checkInParamsSchema.parse(params)
  }
}
