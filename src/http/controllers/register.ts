import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { RegisterUseCase } from '@/use-cases/register'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import z from 'zod'

export async function register (req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })
  const content = registerBodySchema.parse(req.body)
  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)
    await registerUseCase.execute(content)
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return await res.status(409).send({ message: error.message })
    }

    throw error
  }
  return await res.status(201).send()
}
