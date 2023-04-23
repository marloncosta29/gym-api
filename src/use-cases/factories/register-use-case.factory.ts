import { RegisterUseCase } from "../register.useCase";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma.users.repository";

export function registerUseCaseFactory() {
  const userRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(userRepository);
  return registerUseCase;
}
