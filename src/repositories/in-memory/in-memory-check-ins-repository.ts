import { type CheckIn, type Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { type CheckInsRepository } from '../check-ins-repository'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async create (data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date()
    }

    this.items.push(checkIn)
    return checkIn
  }

  async findByUserIdOneDate (userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIndOnSameDate = this.items.find(checkIn => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDay = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDay
    })

    if (!checkIndOnSameDate) return null
    return checkIndOnSameDate
  }
}
