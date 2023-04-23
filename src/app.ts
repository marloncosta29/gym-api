import fastify from "fastify";

import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, request, response) => {
  if (error instanceof ZodError) {
    response.status(400).send({
      message: "Validation Error",
      issue: error.format(),
    });
  }

  if(env.NODE_ENV !== 'production'){
    console.error(error)
  }
  response.status(500).send({ message: "Internal server error!" });
});
