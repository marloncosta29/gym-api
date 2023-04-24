import { CheckInRepository } from "@/repositories/check-in.repository";
import { CheckIn } from "@prisma/client";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}
interface checkInUseCaseResponse {
  checkIn: CheckIn;
}
export class CheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<checkInUseCaseResponse> {

    const checkInSameDay = await this.checkInRepository.findByUserIdAndDate(userId, new Date())

    if(checkInSameDay){
        throw new Error()
    }

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}
