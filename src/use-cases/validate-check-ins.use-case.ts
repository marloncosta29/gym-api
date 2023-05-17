import { CheckInRepository } from "@/repositories/check-in.repository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface ValidateCheckInsUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInsUseCaseResponse {
  checkIn: CheckIn | null;
}

export class ValidateCheckInsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}
  async execute({
    checkInId,
  }: ValidateCheckInsUseCaseRequest): Promise<ValidateCheckInsUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId);

    if(!checkIn){
        throw new ResourceNotFoundError()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return { checkIn };
  }
}
