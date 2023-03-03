import type { FastifyInstance } from "fastify";
import fastify from "fastify";

export default async function (opts = {}): Promise<FastifyInstance> {
  const app = fastify(opts);

  app.register(import("./graphQL"));

  app.get("/", async () => {
    return { hello: "world" };
  });

  return app;
}
