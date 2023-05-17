import { GetUserProfileUseCase } from "../get-user-profile.use-case";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma.users.repository";

export function GetUserProfileUseCaseFactory() {
  const userRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileUseCase(userRepository);
  return useCase;
}
