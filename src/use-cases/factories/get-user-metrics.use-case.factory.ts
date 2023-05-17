import { PrismaCheckInRepository } from "@/repositories/prisma/prisma.check-in.repository";
import { GetUserMetricsUseCase } from "../get-user-metrics.use-case";

export function GetUserMetricsUseCaseFactory() {
  const checkInRepository = new PrismaCheckInRepository();
  const useCase = new GetUserMetricsUseCase(checkInRepository);
  return useCase;
}
