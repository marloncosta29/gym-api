import { UserRepository } from "@/repositories/users.repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistError } from "./errors/user-already-exist-error";
import { User } from "@prisma/client";

interface RegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseParams): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 5);

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistError();
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    });
    return { user };
  }
}
