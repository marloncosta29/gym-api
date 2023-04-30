import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory.gym.repository";
import { beforeEach, describe, expect, test } from "vitest";
import { CreateGymUseCase } from "./create-gym.use-case";



let gymRepository: InMemoryGymRepository
let createGymUseCase:  CreateGymUseCase

describe("CreateGymUseCase Test", () => {
    beforeEach(()=>{
        gymRepository = new InMemoryGymRepository()
        createGymUseCase = new CreateGymUseCase(gymRepository)
    })

    test("deve ser possivel cadastrar uma academia", async () => {
        const {gym} = await createGymUseCase.execute({
            title: 'academia teste',
            description: "descrição da academia",
            latitude: -51.2197506,
            longitude: -29.6468184,
            phone: '9999999999'
        })
        expect(gym).toHaveProperty('id')
        expect(gym?.title).toBe('academia teste')
    })
})