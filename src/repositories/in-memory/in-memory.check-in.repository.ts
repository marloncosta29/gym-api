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
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };
    this.checkIns.push(checkIn);
    return checkIn;
  }

  async findByUserIdAndDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInSameDay = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);
      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInSameDay) {
      return null;
    }
    return checkInSameDay;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const start = (page - 1) * 20;
    const end = page * 20;
    return this.checkIns
      .filter((checkIn) => checkIn.user_id === userId)
      .slice(start, end);
  }

  async getCheckinsCounterByUserId(userId: string): Promise<number> {
    return this.checkIns.filter((checkIn) => checkIn.user_id === userId).length;
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.checkIns.find(item => item.id === id)
    return checkIn ?? null
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.checkIns.findIndex(item => item.id === checkIn.id)

    const distanceInMinutesFromCheckInCreated = dayjs(new Date()).diff(checkIn.created_at, 'minutes')

    if(distanceInMinutesFromCheckInCreated > 20){
      throw new Error()
    }

    if(checkInIndex >= 0){
      this.checkIns[checkInIndex] = checkIn
    }

    return checkIn

  } 
}
