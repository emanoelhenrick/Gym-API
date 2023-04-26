import 'dotenv/config'
import { z } from 'zod'

function validateEnv () {
  const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333)
  })
  const _env = envSchema.safeParse(process.env)
  if (!_env.success) {
    console.error('Invalid environment variables', _env.error.format())
    throw new Error('Invalid environment variables')
  }
  return _env.data
}

export const env = validateEnv()
