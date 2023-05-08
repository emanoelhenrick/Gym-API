import { type CheckIn } from '@prisma/client'
import { type CheckInsRepository } from '@/repositories/protocols/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor (
    private readonly checkInsRepository: CheckInsRepository
  ) {}

  async execute ({ checkInId }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)
    if (!checkIn) throw new ResourceNotFoundError()
    checkIn.validated_at = new Date()
    this.checkInsRepository.save(checkIn)
    return { checkIn }
  }
}
