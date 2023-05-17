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

    const authenticateUseCase = authenticateUseCaseFactory();
    const { user } = await authenticateUseCase.execute({ email, password });

    const token = await response.jwtSign({id: user.id}, {
      sign:{
       sub: user.id 
      }
    })

    return response.status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidUserAuthenticateError) {
      return response.status(403).send({ message: error.message });
    }
    throw error;
  }
}
