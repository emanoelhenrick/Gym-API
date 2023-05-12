import fastify, { type FastifyRequest, type FastifyError, type FastifyReply } from 'fastify'
import { usersRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { gymsRoutes } from './http/controllers/gyms/routes'

export const app = fastify()
app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(usersRoutes)
app.register(gymsRoutes)

app.setErrorHandler(validationError)

function validationError (error: FastifyError, _req: FastifyRequest, res: FastifyReply) {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({
        message: 'Validation error',
        issues: error.format()
      })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO
  }
  return res.status(500).send({ message: 'Internal server error' })
}
