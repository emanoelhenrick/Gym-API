import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import z from 'zod'

export async function authenticate (req: FastifyRequest, res: FastifyReply) {
  const content = validateAuthBody()
  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    await authenticateUseCase.execute(content)
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return await res.status(400).send({ message: error.message })
    }
    throw error
  }
  return await res.status(200).send()

  function validateAuthBody () {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    })
    return authenticateBodySchema.parse(req.body)
  }
}
