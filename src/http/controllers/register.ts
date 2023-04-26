import { registerUseCase } from '@/use-cases/register'
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
    await registerUseCase(content)
  } catch (error) {
    return await res.status(409).send()
  }
  return await res.status(201).send()
}
