import { Prisma, CheckIn } from "@prisma/client";
import { CheckInRepository } from "../check-in.repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInRepository implements CheckInRepository {

  private checkIns: CheckIn[] = [];
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
        id: randomUUID(),
        created_at: new Date(),
        gym_id: data.gym_id,
        user_id: data.user_id,
        validated_at: data.validated_at ? new Date(data.validated_at): null
    }
    this.checkIns.push(checkIn);
    return checkIn;
  }


  async findByUserIdAndDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInSameDay = this.checkIns.find(checkIn => {
        const checkInDate = dayjs(checkIn.created_at)
        const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
        return checkIn.user_id === userId && isOnSameDate
    })

    if(!checkInSameDay){
        return null
    }
    return checkInSameDay
  }
}
