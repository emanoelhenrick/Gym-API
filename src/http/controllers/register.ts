import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import z from 'zod'

export async function register (req: FastifyRequest, res: FastifyReply) {
  const content = validateRegisterBody()
  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute(content)
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return await res.status(409).send({ message: error.message })
    }
    throw error
  }
  return await res.status(201).send()

  function validateRegisterBody () {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6)
    })
    return registerBodySchema.parse(req.body)
  }
}
