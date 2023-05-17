import { PrismaGymRepository } from "@/repositories/prisma/prisma.gym.repository";
import { CreateGymUseCase } from "../create-gym.use-case";

export function CreateGymUseCaseFactory() {
  const gymRepository = new PrismaGymRepository()
  const useCase = new CreateGymUseCase(gymRepository);
  return useCase;
}
