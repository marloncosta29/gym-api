import { InvalidUserAuthenticateError } from "@/use-cases/errors/invalid-user-authenticate-error";
import { authenticateUseCaseFactory } from "@/use-cases/factories/authenticate-use-case.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  response: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(7),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = authenticateUseCaseFactory()
    await authenticateUseCase.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidUserAuthenticateError) {
      return response.status(403).send({ message: error.message });
    }
    throw error
  }

  return response.status(200).send();
}
