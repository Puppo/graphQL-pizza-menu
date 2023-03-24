import { FastifyInstance } from "fastify";
import { createMercuriusTestClient } from "mercurius-integration-testing";
import tap from "tap";

import { takeYourNumberDocument } from "../src/resolvers/generated";
import { createTestApp } from "./util/createApp";

let app: FastifyInstance;
let client: ReturnType<typeof createMercuriusTestClient>;

tap.before(async () => {
  const testApp = await createTestApp();
  app = testApp.app;
  client = testApp.client;
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
