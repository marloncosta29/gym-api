import { UserRepository } from "@/repositories/users.repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidUserAuthenticateError } from "./errors/invalid-user-authenticate-error";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}
interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidUserAuthenticateError()
    }

    const passwordMatch = await  compare(password, user.password_hash);

    if (!passwordMatch) {
      throw new InvalidUserAuthenticateError();
    }

    return { user };
  }
}
