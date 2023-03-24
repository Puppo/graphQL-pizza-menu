import autoLoad from "@fastify/autoload";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

async function app(app: FastifyInstance, opts = {}) {
  app.register(autoLoad, {
    dir: `${__dirname}/plugins`,
  });

  app.register(import("./graphQL"));
}

export default fp(app);
