import { PrismaCheckInRepository } from "@/repositories/prisma/prisma.check-in.repository";
import { CheckInUseCase } from "../check-in.use-case";
import { PrismaGymRepository } from "@/repositories/prisma/prisma.gym.repository";

export function CheckInUseCaseFactory() {
  const checkInRepository = new PrismaCheckInRepository();
  const gymRepository = new PrismaGymRepository()
  const useCase = new CheckInUseCase(checkInRepository, gymRepository);
  return useCase;
}
