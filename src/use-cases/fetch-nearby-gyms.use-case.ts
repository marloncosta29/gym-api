import { GymRepository } from "@/repositories/gym.repository";
import { Gym } from "@prisma/client";

interface FetchNearByGymsUseCaseRequest {
  longitude: number;
  latitude: number;
}
interface FetchNearByGymsUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearByGymsUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    longitude,
    latitude,
  }: FetchNearByGymsUseCaseRequest): Promise<FetchNearByGymsUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      longitude,
      latitude,
    });
    return { gyms };
  }
}
