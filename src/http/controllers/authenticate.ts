import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import z from 'zod'

export async function authenticate (req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
  const content = authenticateBodySchema.parse(req.body)
  try {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)
    await authenticateUseCase.execute(content)
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return await res.status(400).send({ message: error.message })
    }
    throw error
  }
  return await res.status(200).send()
}
