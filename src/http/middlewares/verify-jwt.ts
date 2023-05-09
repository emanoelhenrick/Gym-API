import { type FastifyReply, type FastifyRequest } from 'fastify'

export async function verifyJWT (req: FastifyRequest, res: FastifyReply) {
  try {
    await req.jwtVerify()
  } catch (error) {
    res.status(401).send({ message: ' Unauthorized' })
  }
}
