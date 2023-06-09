import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRepository{
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findByUserIdAndDate(userId: string, date: Date): Promise<CheckIn | null>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    getCheckinsCounterByUserId(userId: string): Promise<number>
    findById(id: string): Promise<CheckIn | null>
    save(checkIn: CheckIn): Promise<CheckIn>
}