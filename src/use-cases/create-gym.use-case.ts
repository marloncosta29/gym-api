import { GymRepository } from "@/repositories/gym.repository";
import { Gym } from "@prisma/client";

interface CreateGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymUseCaseResponse {
  gym: Gym | null;
}

export class CreateGymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymRepository.create({
      description,
      latituse: latitude,
      longitude,
      phone,
      title,
    });
    return { gym };
  }
}
