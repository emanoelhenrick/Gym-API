import { type CheckIn } from '@prisma/client'
import { type CheckInsRepository } from '@/repositories/check-ins-repository'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor (private readonly checkInsRepository: CheckInsRepository) {}

  async execute ({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOneDate(userId, new Date())

    if (checkInOnSameDay) throw new Error()
    const checkIn = await this.checkInsRepository.create({ user_id: userId, gym_id: gymId })
    return {
      checkIn
    }
  }
}
