import { Prisma, CheckIn } from "@prisma/client";
import { CheckInRepository } from "../check-in.repository";
import { prisma } from "@/lib/prisma";

export class PrismaCheckInRepository implements CheckInRepository {

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({ data });
    return checkIn
  }

  async findByUserIdAndDate(userId: string, date: Date): Promise<CheckIn | null> {
    const checkIn = prisma.checkIn.findFirst({
        where:{
            user_id: userId
        }
    })
}
}
