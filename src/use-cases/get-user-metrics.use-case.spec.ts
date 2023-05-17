import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory.check-in.repository";
import { beforeEach, describe, expect, test } from "vitest";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history.use-case";
import { randomUUID } from "crypto";
import { GetUserMetricsUseCase } from "./get-user-metrics.use-case";

let checkInRepository: InMemoryCheckInRepository;
let getUserMetricsUseCase: GetUserMetricsUseCase;

describe("FechUserCheckinsUseCase Test", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository();
    getUserMetricsUseCase = new GetUserMetricsUseCase(
      checkInRepository
    );
  });

  test("Deve ser possivel consultar a quantidade de checkIns do usuario", async () => {
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

    const { checkInsCount } = await getUserMetricsUseCase.execute({ userId });
    expect(checkInsCount).toBe(3);
  });
});
