import { describe, expect, test } from "vitest";
import {  hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory.users.repository";
import { AuthenticateUseCase } from "./authenticate.use-case";
import { InvalidUserAuthenticateError } from "./errors/invalid-user-authenticate-error";

describe("AuthenticateUseCase Test", () => {
  test("usuario deve poder se autenticar", async () => {
    const userRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(userRepository);

    const userToRegister = {
      email: "jonhjonh4@test.com.br",
      password: "12345678",
    };
    await userRepository.create({
      name: "jonh doe",
      email: userToRegister.email,
      password_hash: await hash(userToRegister.password, 5),
    });

    const { user } = await authenticateUseCase.execute(userToRegister);
    expect(user).toHaveProperty("id");
    expect(user.id).toEqual(expect.any(String));
  });
  test("usuario nao deve se logar com um email que não existe", async () => {
    const userRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(userRepository);

    const userToTest = {
      email: "jonhjonh4@test.com.br",
      password: "12345678",
    };

    expect(async () => {
      await authenticateUseCase.execute(userToTest);
    }).rejects.toBeInstanceOf(InvalidUserAuthenticateError);
  });
  test("usuario nao deve poder se autenticar com a senha errada", async () => {
    const userRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(userRepository);

    const userToRegister = {
      email: "jonhjonh4@test.com.br",
      password: "12345678",
    };
    await userRepository.create({
      name: "jonh doe",
      email: userToRegister.email,
      password_hash: await hash(userToRegister.password, 5),
    });

    expect(async () => {
      await authenticateUseCase.execute({
        email: userToRegister.email,
        password: "123",
      });
    }).rejects.toBeInstanceOf(InvalidUserAuthenticateError);
  });
});
