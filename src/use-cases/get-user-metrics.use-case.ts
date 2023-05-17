import { CheckInRepository } from "@/repositories/check-in.repository";

interface GetUserMetricsUseCaseRequest {
  userId: string;
}
interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInRepository.getCheckinsCounterByUserId(userId);

    return { checkInsCount };
  }
}
