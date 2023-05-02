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
})
