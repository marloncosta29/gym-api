import { beforeEach, describe, expect, test } from "vitest";
import { RegisterUseCase } from "./register.useCase";
import { compare, hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory.users.repository";
import { UserAlreadyExistError } from "./errors/user-already-exist-error";

let userRepository: InMemoryUsersRepository;
let registerUseCase: RegisterUseCase; // pode der usado o nome de sut para boas praticas, mas particularmente eu nao acho isso muito bom
describe("RegisterUseCase Test", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    registerUseCase = new RegisterUseCase(userRepository);
  });
  test("a senha deve ser criptografada apos o cadastro", async () => {
    const userToRegister = {
      name: "Jonh Doe",
      email: "jonhjonh4@test.com.br",
      password: "12345678",
    };

    const { user } = await registerUseCase.execute(userToRegister);

    const isHashed = await compare(userToRegister.password, user.password_hash);

    expect(isHashed).toBeTruthy();
  });

  test("Nao pode ser possivel cadastrar mais de um usuario com o mesmo email", async () => {
    const userToRegister = {
      name: "Jonh Doe",
      email: "jonhjonh4@test.com.br",
      password: "12345678",
    };
    await registerUseCase.execute(userToRegister);

    await expect(async () => {
      await registerUseCase.execute(userToRegister);
    }).rejects.toBeInstanceOf(UserAlreadyExistError);
  });
});
