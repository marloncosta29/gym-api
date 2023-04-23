import { UserAlreadyExistError } from "@/use-cases/errors/user-already-exist-error";
import { registerUseCaseFactory } from "@/use-cases/factories/register-use-case.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(
  request: FastifyRequest,
  response: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(7),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUSeCase = registerUseCaseFactory();
    await registerUSeCase.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistError) {
      return response.status(409).send({ message: error.message });
    }
    throw error;
  }

  return response.status(201).send();
}
