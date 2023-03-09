import { createMercuriusTestClient } from "mercurius-integration-testing";
import tap from "tap";

import { FastifyInstance } from "fastify";
import {
  welcomeByNameDocument,
  welcomeByNameQueryVariables,
  welcomeDocument,
} from "../src/resolvers/generated";
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

tap.test("welcome works", async t => {
  await client.query(welcomeDocument).then(response => {
    t.equal(response.data.hello, `Welcome to Tonino Pizza 🍕!`);
    t.equal(response.errors, undefined);
  });
});

tap.test("welcomeByName works", async t => {
  const variables: welcomeByNameQueryVariables = {
    name: "John",
  };
  await client
    .query(welcomeByNameDocument, {
      variables,
    })
    .then(response => {
      t.equal(
        response.data.helloByName,
        `Hi ${variables.name}, welcome to Tonino Pizza 🍕!`
      );
      t.equal(response.errors, undefined);
    });
});
