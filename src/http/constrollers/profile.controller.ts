import { GetUserMetricsUseCaseFactory } from "@/use-cases/factories/get-user-metrics.use-case.factory";
import { GetUserProfileUseCaseFactory } from "@/use-cases/factories/get-user-profile.use-case.factory";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, response: FastifyReply) {
  const userProfileFactoru = GetUserProfileUseCaseFactory();
  const { user } = await userProfileFactoru.execute({ id: request.user.sub });
  return response
    .status(201)
    .send({ user: { ...user, password_hash: undefined } });
}
