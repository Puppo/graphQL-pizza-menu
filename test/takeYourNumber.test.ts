import { createMercuriusTestClient } from "mercurius-integration-testing";
import tap from "tap";

import { FastifyInstance } from "fastify";
import { takeYourNumberDocument } from "../src/resolvers/generated";
import buildApp from "../src/server";

let app: FastifyInstance;
let client: ReturnType<typeof createMercuriusTestClient>;

tap.before(async () => {
  app = await buildApp();
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
