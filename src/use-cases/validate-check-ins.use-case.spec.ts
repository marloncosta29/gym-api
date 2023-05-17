import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory.check-in.repository";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { ValidateCheckInsUseCase } from "./validate-check-ins.use-case";
import { randomUUID } from "crypto";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let checkInrepository: InMemoryCheckInRepository;
let validateCheckInUseCase: ValidateCheckInsUseCase;

describe("validate use case unit test", () => {
  beforeEach(() => {
    checkInrepository = new InMemoryCheckInRepository();
    validateCheckInUseCase = new ValidateCheckInsUseCase(checkInrepository);
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  test("deve ser possivel validar um checkin", async () => {
    const checkInCreated = await checkInrepository.create({
      gym_id: randomUUID(),
      user_id: randomUUID(),
    });

    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId: checkInCreated.id,
    });
    expect(checkIn?.validated_at).toEqual(expect.any(Date));
  });

  test("não deve ser possivel validar um checkin com id inexistente", async () => {
    await expect(async () => {
      return validateCheckInUseCase.execute({ checkInId: "banana" });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  test("Nao deve ser possivel validar o checkin apos 20 min", async () => {
    vi.setSystemTime(new Date(2023, 4, 1, 13, 0));
    const checkInCreated = await checkInrepository.create({
      gym_id: randomUUID(),
      user_id: randomUUID(),
    });

    const minutesPassed = 1000 * 60 * 21 // 21 minutes
    vi.advanceTimersByTime(minutesPassed)

    await expect(async () => {
      return validateCheckInUseCase.execute({ checkInId: checkInCreated.id });
    }).rejects.toBeInstanceOf(Error);
  });
});
