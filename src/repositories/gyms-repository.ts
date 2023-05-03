import { type Prisma, type Gym } from '@prisma/client'

export interface GymsRepository {
  findById: (id: string) => Promise<Gym | null>
  create: (data: Prisma.GymCreateInput) => Promise<Gym>
}
