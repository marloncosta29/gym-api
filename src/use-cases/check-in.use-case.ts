import { CheckInRepository } from "@/repositories/check-in.repository";
import { GymRepository } from "@/repositories/gym.repository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckinsError } from "./errors/max-number-of-checkins-error";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}
interface checkInUseCaseResponse {
  checkIn: CheckIn;
}
export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private gymRepository: GymRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<checkInUseCaseResponse> {
    const gym = await this.gymRepository.findById(gymId);
    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: gym.latituse.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
      { latitude: userLatitude, longitude: userLongitude }
    );

    const MAX_DISTANCE = 0.1

    if(distance > 0.1){
      throw new MaxDistanceError()
    }

    const checkInSameDay = await this.checkInRepository.findByUserIdAndDate(
      userId,
      new Date()
    );

    if (checkInSameDay) {
      throw new MaxNumberOfCheckinsError();
    }

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}
