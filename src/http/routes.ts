import { FastifyInstance } from "fastify";
import { register } from "./constrollers/register.controller";
import { authenticate } from "./constrollers/authenticate.controoler";

export async function appRoutes(app: FastifyInstance){
    app.post('/users', register)
    app.post('/sessions', authenticate)
}