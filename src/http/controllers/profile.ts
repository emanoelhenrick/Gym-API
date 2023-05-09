import { type FastifyReply, type FastifyRequest } from 'fastify'

export async function profile (req: FastifyRequest, res: FastifyReply) {
  await req.jwtVerify()

  console.log(req.user.sub)

  return await res.status(200).send()
}
