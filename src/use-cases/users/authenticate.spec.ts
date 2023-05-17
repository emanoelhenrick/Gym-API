import { test, describe, expect } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

const makeSut = () => {
  const userRepository = new InMemoryUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(userRepository)
  return {
    userRepository,
    authenticateUseCase
  }
}

describe('Authenticate Use Case', () => {
  test('Should be able to authenticate', async () => {
    const { authenticateUseCase, userRepository } = makeSut()
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    }
    await userRepository.create(userData)
    const { user } = await authenticateUseCase.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })
    expect(user.id).toEqual(expect.any(String))
  })

  test('Should not be able to authenticate with wrong email', async () => {
    const { authenticateUseCase } = makeSut()
    await expect(async () => authenticateUseCase.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test('Should not be able to authenticate with wrong password', async () => {
    const { authenticateUseCase, userRepository } = makeSut()

    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    await expect(async () => authenticateUseCase.execute({
      email: 'johndoe@example.com',
      password: '654321'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
