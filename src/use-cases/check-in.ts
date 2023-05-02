import { type CheckIn } from '@prisma/client'
import { type CheckInsRepository } from '@/repositories/check-ins-repository'
import { type GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor (
    private readonly checkInsRepository: CheckInsRepository,
    private readonly gymsRepository: GymsRepository
  ) {}

  async execute ({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)
    if (!gym) throw new ResourceNotFoundError()

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOneDate(userId, new Date())
    if (checkInOnSameDay) throw new Error()

    const checkIn = await this.checkInsRepository.create({ user_id: userId, gym_id: gymId })
    return {
      checkIn
    }
  }
}
