import { CheckInRepository } from "@/repositories/check-in.repository";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { CheckInUseCase } from "./check-in.use-case";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory.check-in.repository";
import { randomUUID } from "crypto";

let checkInrepository: CheckInRepository;
let checkInUseCase: CheckInUseCase;
describe("CheckInUseCase Test", () => {
  beforeEach(() => {
    checkInrepository = new InMemoryCheckInRepository();
    checkInUseCase = new CheckInUseCase(checkInrepository);

    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  test("deve ser possivel criar um check in", async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: randomUUID(),
      userId: randomUUID(),
    });
    expect(checkIn).toHaveProperty("id");
  });

  test("usuario nao deve ser possivel fazer mais de um checkin no mesmo dia", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const userId = randomUUID();

    await checkInUseCase.execute({
      gymId: randomUUID(),
      userId,
    });

    await expect(async () => {
      return checkInUseCase.execute({
        gymId: randomUUID(),
        userId,
      });
    }).rejects.toBeInstanceOf(Error);
  });

  test("usuario pode fazer mais de um checkin em dias diferentes", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const userId = randomUUID();

    await checkInUseCase.execute({
      gymId: randomUUID(),
      userId,
    });
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await checkInUseCase.execute({
      gymId: randomUUID(),
      userId,
    });

    expect(checkIn).toHaveProperty("id");

  });
});
