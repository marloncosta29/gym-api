import { PrismaCheckInRepository } from "@/repositories/prisma/prisma.check-in.repository";
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history.use-case";

export function FetchUserCheckInsHistoryUseCaseFactory() {
  const checkInRepository = new PrismaCheckInRepository();
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInRepository);
  return useCase;
}
