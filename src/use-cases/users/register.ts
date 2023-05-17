import { type UserRepository } from '@/repositories/protocols/users-repository'
import { hash } from 'bcryptjs'
import { EmailAlreadyExistsError } from '../errors/email-already-exists-error'
import { type User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor (private readonly usersRepository: UserRepository) {}

  async execute ({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) throw new EmailAlreadyExistsError()
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    })
    return { user }
  }
}
