import { FastifyInstance } from "fastify";
import { register } from "./constrollers/register.controller";
import { authenticate } from "./constrollers/authenticate.controoler";
import { profile } from "./constrollers/profile.controller";
import fastifyJwt from "@fastify/jwt";
import { verifyJwt } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);
  app.get("/me", { onRequest: [verifyJwt] }, profile);
}
