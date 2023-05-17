import { PrismaCheckInRepository } from "@/repositories/prisma/prisma.check-in.repository";
import { ValidateCheckInsUseCase } from "../validate-check-ins.use-case";

export function ValidateCheckInsUseCaseFactory() {
  const checkInRepository = new PrismaCheckInRepository();
  const useCase = new ValidateCheckInsUseCase(checkInRepository);
  return useCase;
}
