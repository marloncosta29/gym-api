import { Gym, Prisma } from "@prisma/client";

export interface GymRepository{
    findById(gymId: string): Promise<Gym | null>
    create(data: Prisma.GymUncheckedCreateInput): Promise<Gym | null>
}