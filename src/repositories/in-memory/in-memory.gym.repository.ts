import { Gym, Prisma } from "@prisma/client";
import { GymRepository, findManyNearbyParams } from "../gym.repository";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCordinates";

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
    id,
  }: Prisma.GymUncheckedCreateInput): Promise<Gym | null> {
    const gym: Gym = {
      id: id ?? randomUUID(),
      description: description ? description : null,
      latituse: new Decimal(latituse.toString()),
      longitude: new Decimal(longitude.toString()),
      phone: phone ? phone : null,
      title,
    };
    this.gyms.push(gym);
    return gym;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const start = (page - 1) * 20;
    const end = page * 20;

    return this.gyms
      .filter((gym) => gym.title.includes(query))
      .slice(start, end);
  }
  async findManyNearby(params: findManyNearbyParams): Promise<Gym[]> {
    return this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        { latitude: gym.latituse.toNumber(), longitude: gym.longitude.toNumber() }
      );

      return distance < 10

    });
  }
}
