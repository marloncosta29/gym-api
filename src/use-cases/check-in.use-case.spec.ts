import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { CheckInUseCase } from "./check-in.use-case";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory.check-in.repository";
import { randomUUID } from "crypto";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory.gym.repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInrepository: InMemoryCheckInRepository;
let gymRepository: InMemoryGymRepository;
let checkInUseCase: CheckInUseCase;
describe("CheckInUseCase Test", () => {
  beforeEach(() => {
    checkInrepository = new InMemoryCheckInRepository();
    gymRepository = new InMemoryGymRepository();
    checkInUseCase = new CheckInUseCase(checkInrepository, gymRepository);

    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  test("deve ser possivel criar um check in", async () => {
    const gymId = randomUUID();

    // usando devido a didatica, os outros testes estão usando o push direto
    gymRepository.create({
      id: gymId,
      title: "academia teste",
      description: "uma academia de teste",
      latituse: new Decimal(0),
      longitude: new Decimal(0),
      phone: "",
    });
    const { checkIn } = await checkInUseCase.execute({
      gymId,
      userId: randomUUID(),
      userLatitude: 0,
      userLongitude: 0,
    });
    expect(checkIn).toHaveProperty("id");
  });

  test("usuario nao deve ser possivel fazer mais de um checkin no mesmo dia", async () => {
    const gymId = randomUUID();
    gymRepository.gyms.push({
      id: gymId,
      title: "academia teste",
      description: "uma academia de teste",
      latituse: new Decimal(0),
      longitude: new Decimal(0),
      phone: "",
    });

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const userId = randomUUID();

    await checkInUseCase.execute({
      gymId,
      userId,
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(async () => {
      return checkInUseCase.execute({
        gymId,
        userId,
        userLatitude: 0,
        userLongitude: 0,
      });
    }).rejects.toBeInstanceOf(Error);
  });

  test("usuario pode fazer mais de um checkin em dias diferentes", async () => {
    const gymId = randomUUID();
    gymRepository.gyms.push({
      id: gymId,
      title: "academia teste",
      description: "uma academia de teste",
      latituse: new Decimal(0),
      longitude: new Decimal(0),
      phone: "",
    });

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const userId = randomUUID();

    await checkInUseCase.execute({
      gymId,
      userId,
      userLatitude: 0,
      userLongitude: 0,
    });
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await checkInUseCase.execute({
      gymId,
      userId,
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn).toHaveProperty("id");
  });

  test("deve ocorrer erro de o usuario tentar fazer checkin em uma academia distante", async () => {
    const gymId = randomUUID();
    gymRepository.gyms.push({
      id: gymId,
      title: "academia teste",
      description: "uma academia de teste",
      latituse: new Decimal(-29.6525852),
      longitude: new Decimal(-51.1351422),
      phone: "",
    });

    await expect(async () => {
      return checkInUseCase.execute({
        gymId,
        userId: randomUUID(),
        userLatitude: -29.6927216,
        userLongitude: -51.1840607,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
