import { Gym } from "@prisma/client";
import { GymRepository } from "../gym.repository";
import { prisma } from "@/lib/prisma";

export class InMemoryGymRepository implements GymRepository {
  private gyms: Gym[] = [];

  async findById(gymId: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({ where: { id: gymId } });
    return gym
}
}
