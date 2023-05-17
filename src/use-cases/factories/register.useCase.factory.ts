import { PrismaUsersRepository } from "@/repositories/prisma/prisma.users.repository";
import { RegisterUseCase } from "../register.useCase";

export function RegisterUseCaseFactory() {
  const userRepository = new PrismaUsersRepository();
  const useCase = new RegisterUseCase(userRepository);
  return useCase;
}
