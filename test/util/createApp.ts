import fastify from "fastify";
import { createMercuriusTestClient } from "mercurius-integration-testing";

export async function createTestApp() {
  const app = fastify();
  await app.register(import("../../src/app"));
  const client = createMercuriusTestClient(app);

  return { app, client };
}
