import { Gym, Prisma } from "@prisma/client";
import { GymRepository } from "../gym.repository";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime";

export class InMemoryGymRepository implements GymRepository {
  public gyms: Gym[] = [];

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === gymId);
    return gym ? gym : null;
  }

  async create({
    title,
    description,
    longitude,
    latituse,
    phone,
    id
  }: Prisma.GymUncheckedCreateInput): Promise<Gym | null> {

    const gym: Gym = {
      id: id ?? randomUUID(),
      description: description? description : null,
      latituse: new Decimal(latituse.toString()),
      longitude: new Decimal(longitude.toString()),
      phone: phone ? phone : null,
      title
    }
    this.gyms.push(gym);
    return gym;
  }
}
