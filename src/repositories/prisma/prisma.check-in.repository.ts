import { Prisma, CheckIn } from "@prisma/client";
import { CheckInRepository } from "../check-in.repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInRepository implements CheckInRepository {
  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIn = await prisma.checkIn.findMany({
      where: { user_id: userId },
      take: 20,
      skip: (page - 1) * 20,
    });
    return checkIn;
  }

  async getCheckinsCounterByUserId(userId: string): Promise<number> {
    return prisma.checkIn.count({ where: { user_id: userId } });
  }

  async findById(id: string): Promise<CheckIn | null> {
    return prisma.checkIn.findUnique({ where: { id } });
  }
  
  async save(data: CheckIn): Promise<CheckIn> {
    const checkIn = prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });
    return checkIn;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({ data });
    return checkIn;
  }

  async findByUserIdAndDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkIns = prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      },
    });
    return checkIns;
  }
}
