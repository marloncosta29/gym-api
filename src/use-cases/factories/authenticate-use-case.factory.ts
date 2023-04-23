import { PrismaUsersRepository } from "@/repositories/prisma/prisma.users.repository";
import { AuthenticateUseCase } from "../authenticate.use-case";

export function authenticateUseCaseFactory(){
    const userRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(userRepository);
    return authenticateUseCase
}