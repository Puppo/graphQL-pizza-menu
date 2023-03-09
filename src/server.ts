import type { FastifyInstance } from "fastify";
import fastify from "fastify";

import registerGraphQL from "./graphQL";

export default async function (opts = {}): Promise<FastifyInstance> {
  const app = fastify(opts);

  registerGraphQL(app);

  return app;
}
