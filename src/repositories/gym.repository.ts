import { Gym, Prisma } from "@prisma/client";

export interface findManyNearbyParams{
    longitude: number
    latitude: number
}

export interface GymRepository{
    findById(gymId: string): Promise<Gym | null>
    create(data: Prisma.GymUncheckedCreateInput): Promise<Gym | null>
    searchMany(query: string, page: number): Promise<Gym[]>
    findManyNearby(data:findManyNearbyParams): Promise<Gym[]>
}