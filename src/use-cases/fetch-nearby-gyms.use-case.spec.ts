import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory.gym.repository";
import { beforeEach, describe, expect, test } from "vitest";
import { FetchNearByGymsUseCase } from "./fetch-nearby-gyms.use-case";

let gymRepository: InMemoryGymRepository;
let fetchNearbyGymsUseCase: FetchNearByGymsUseCase;

describe("fetch near by usecase unit test", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    fetchNearbyGymsUseCase = new FetchNearByGymsUseCase(gymRepository);
  });
  test("should be find gyms in 10km of distance", async () => {
    // -29.5375968,-51.0930747,15z
    await gymRepository.create({
      title: "teste de academia 1",
      latituse: -29.5375968,
      longitude: -51.0930747,
    });
    //-29.6834789,-51.1699316,15z
    await gymRepository.create({
        title: "teste de academia 2",
        latituse: -29.6834789,
        longitude: -51.1699316,
      });
    
      const {gyms} = await fetchNearbyGymsUseCase.execute({latitude:-29.6834789, longitude: -51.1699316})

      expect(gyms).toHaveLength(1)

  });
});
