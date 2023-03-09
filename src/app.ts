import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

async function app(app: FastifyInstance, opts = {}) {
  await app.register(import("./graphQL"));
}

export default fp(app);
