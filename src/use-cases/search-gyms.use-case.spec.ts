import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory.gym.repository";
import { beforeEach, describe, expect, test } from "vitest";
import { SearchGymsUseCase } from "./search-gyms.use-case";

let gymsRepository: InMemoryGymRepository;
let searchGymsUseCase: SearchGymsUseCase;

describe("Teste do uso de caso searchGyms", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository();
    searchGymsUseCase = new SearchGymsUseCase(gymsRepository);
  });
  test("deve ser possivel listar academias por texto", async () => {
    await gymsRepository.create({
      latituse: 0,
      longitude: 0,
      title: "academia teste um",
    });
    await gymsRepository.create({
      latituse: 0,
      longitude: 0,
      title: "academia teste dois",
    });
    await gymsRepository.create({
      latituse: 0,
      longitude: 0,
      title: "banana",
    });

    const { gyms } = await searchGymsUseCase.execute({
      query: "teste",
      page: 1,
    });

    expect(gyms).toHaveLength(2);
  });
  test("deve ser possivel listar academias por paginação", async () => {
    for (let index = 1; index <= 25; index++) {
      await gymsRepository.create({
        title: `academia teste ${index}`,
        latituse: 0,
        longitude: 0,
      });
    }

    const { gyms } = await searchGymsUseCase.execute({
      query: "teste",
      page: 2,
    });
    expect(gyms).toHaveLength(5);
  });
});
