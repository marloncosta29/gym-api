import { Gym, Prisma } from "@prisma/client";
import { GymRepository, findManyNearbyParams } from "../gym.repository";
import { prisma } from "@/lib/prisma";

export class PrismaGymRepository implements GymRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({ where: { id } });
    return gym;
  }
  async create(data: Prisma.GymUncheckedCreateInput) {
    const gym = prisma.gym.create({ data });
    return gym;
  }
  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return gyms;
  }
  async findManyNearby({ latitude, longitude }: findManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
            SELECT * from gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `;

    return gyms;
  }
}
