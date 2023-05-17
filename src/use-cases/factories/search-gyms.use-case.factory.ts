import { SearchGymsUseCase } from "../search-gyms.use-case";
import { PrismaGymRepository } from "@/repositories/prisma/prisma.gym.repository";

export function SearchGymsUseCaseFactory() {
  const gymRepository = new PrismaGymRepository();
  const useCase = new SearchGymsUseCase(gymRepository);
  return useCase;
}
