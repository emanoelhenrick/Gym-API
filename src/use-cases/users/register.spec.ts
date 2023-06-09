import { test, describe, expect } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { EmailAlreadyExistsError } from '../errors/email-already-exists-error'

const makeSut = () => {
  const userRepository = new InMemoryUsersRepository()
  return new RegisterUseCase(userRepository)
}

describe('Register Use Case', () => {
  test('Should hash user password upon registration', async () => {
    const sut = makeSut()
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )
    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  test('Should not be able to register with email thats already exists', async () => {
    const sut = makeSut()
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    }
    await sut.execute(userData)
    await expect(async () => sut.execute(userData))
      .rejects
      .toBeInstanceOf(EmailAlreadyExistsError)
  })

  test('Should be able to register', async () => {
    const sut = makeSut()
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    }
    const { user } = await sut.execute(userData)
    expect(user.id).toEqual(expect.any(String))
  })
})
