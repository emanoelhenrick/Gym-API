import { type CheckIn, type Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
  findByUserIdOneDate: (userId: string, date: Date) => Promise<CheckIn | null>
}