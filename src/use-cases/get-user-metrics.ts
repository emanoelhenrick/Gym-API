import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { type CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor (private readonly checkInsRepository: CheckInsRepository) {}

  async execute ({ userId }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)
    if (!checkInsCount) throw new ResourceNotFoundError()
    return { checkInsCount }
  }
}
