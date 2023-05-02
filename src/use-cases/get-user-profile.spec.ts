import { test, describe, expect } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

const makeSut = () => {
  const userRepository = new InMemoryUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(userRepository)
  return {
    userRepository,
    getUserProfileUseCase
  }
}

describe('Get User Profile Use Case', () => {
  test('Should throws if resource do not exists', async () => {
    const { getUserProfileUseCase } = makeSut()
    expect(async () => getUserProfileUseCase.execute({ userId: 'invalid-param' }))
      .rejects
      .toBeInstanceOf(ResourceNotFoundError)
  })

  test('Should be able to return a user profile', async () => {
    const { getUserProfileUseCase, userRepository } = makeSut()
    const createdUser = await userRepository.create({
      id: 'valid-user-id',
      email: 'valid@mail.com',
      name: 'valid-name',
      password_hash: 'valid-password'
    })
    const { user } = await getUserProfileUseCase.execute({ userId: createdUser.id })
    expect(user.email).toBe('valid@mail.com')
  })
})
