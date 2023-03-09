import fastify, { FastifyInstance } from "fastify";
import { createMercuriusTestClient } from "mercurius-integration-testing";
import tap from "tap";

import { takeYourNumberDocument } from "../src/resolvers/generated";

let app: FastifyInstance;
let client: ReturnType<typeof createMercuriusTestClient>;

tap.before(async () => {
  app = fastify();
  await app.register(import("../src/app"));
  client = createMercuriusTestClient(app);
});

tap.teardown(async () => {
  await app.close();
});

tap.test("takeYourNumber", async t => {
  await client.mutate(takeYourNumberDocument).then(response => {
    t.equal(response.data.takeYourNumber, 1);
    t.equal(response.errors, undefined);
  });
});

tap.test("welcomeByName more times", async t => {
  await client
    .mutate(takeYourNumberDocument)
    .then(response => {
      t.equal(response.data.takeYourNumber, 2);
      t.equal(response.errors, undefined);
      return client.mutate(takeYourNumberDocument);
    })
    .then(response => {
      t.equal(response.data.takeYourNumber, 3);
      t.equal(response.errors, undefined);
    });
});
