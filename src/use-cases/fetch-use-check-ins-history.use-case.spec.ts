import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory.check-in.repository";
import { beforeEach, describe, expect, test } from "vitest";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history.use-case";
import { randomUUID } from "crypto";

let checkInRepository: InMemoryCheckInRepository;
let fetchUserCheckInsUseCase: FetchUserCheckInsHistoryUseCase;

describe("FechUserCheckinsUseCase Test", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository();
    fetchUserCheckInsUseCase = new FetchUserCheckInsHistoryUseCase(
      checkInRepository
    );
  });

  test("Dese ser possivel consultar academias pelo id do usuario", async () => {
    const userId = randomUUID();
    await checkInRepository.create({
      gym_id: randomUUID(),
      user_id: userId,
    });
    await checkInRepository.create({
      gym_id: randomUUID(),
      user_id: userId,
    });
    await checkInRepository.create({
      gym_id: randomUUID(),
      user_id: userId,
    });

    const { checkIns } = await fetchUserCheckInsUseCase.execute({ userId, page: 1 });
    expect(checkIns).toBeInstanceOf(Array);
    expect(checkIns).toHaveLength(3);
  });

  test("deve ser possivel consultar checkins com paginação", async ()=>{
    const userId = randomUUID();
    for (let index = 1; index <=22; index++) {
        await checkInRepository.create({
            user_id: userId,
            gym_id: `gym-${index}`
        })
    }

    const { checkIns } = await fetchUserCheckInsUseCase.execute({ userId, page: 2 });
    
    expect(checkIns).toBeInstanceOf(Array);
    expect(checkIns).toEqual([
        expect.objectContaining({gym_id: 'gym-21'}),
        expect.objectContaining({gym_id: 'gym-22'})
    ])
  })


});
