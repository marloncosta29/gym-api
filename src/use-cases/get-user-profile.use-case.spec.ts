import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory.users.repository";
import { beforeEach, describe, expect, test } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile.use-case";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let userRepository: InMemoryUsersRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe("GetUserProfileUseCase Test", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    getUserProfileUseCase = new GetUserProfileUseCase(userRepository);
  });
  test("deve ser possivel ter o perfil do usuario pelo id", async () => {
    const { id } = await userRepository.create({
      email: "jonhDoe@any.com.br",
      name: "Jonh Doe",
      password_hash: await hash("123456", 5),
    });
    const {user: userProfile} = await getUserProfileUseCase.execute({ id });
    expect(userProfile.id).toEqual(expect.any(String))
    expect(userProfile).toHaveProperty('name')
  });

  test('deve retornar erro ao tentar pega ro perfil de um id que não existe', async ()=>{
    await expect(async()=>{
        await getUserProfileUseCase.execute({id: '123456'})
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

});
