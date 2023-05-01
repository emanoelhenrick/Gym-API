import fastify, { type FastifyRequest, type FastifyError, type FastifyReply } from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(appRoutes)

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
