import { FastifyInstance } from "fastify";
import { createMercuriusTestClient } from "mercurius-integration-testing";
import tap from "tap";

import {
  getToppingDocument,
  getToppingsDocument,
  toppingCreatedNotificationsDocument,
  toppingDeletedNotificationsDocument,
  toppingUpdatedNotificationsDocument,
  updateToppingDocument,
} from "../src/resolvers/generated";
import { createTestApp } from "./util/createApp";
import { createTopping, deleteTopping } from "./util/topping";
import { uuidV4Regex } from "./util/uuid";

let app: FastifyInstance;
let client: ReturnType<typeof createMercuriusTestClient>;

tap.beforeEach(async () => {
  const testApp = await createTestApp();
  app = testApp.app;
  client = testApp.client;
});

tap.afterEach(async () => {
  await app.close();
});

tap.test("createTopping", async t => {
  await new Promise<void>(async resolve => {
    await client.subscribe({
      query: toppingCreatedNotificationsDocument,
      onData: response => {
        t.match(response.data?.toppingCreatedNotifications?.id, uuidV4Regex);
        resolve();
      },
    });

    const name = "toppingTest";
    const response = await createTopping(client, name);
    t.match(response.data.createTopping.id, uuidV4Regex);
    t.equal(response.data.createTopping.name, name);
    t.equal(response.errors, undefined);
  });
});

tap.test("updateTopping", async t => {
  let name = "toppingTest";
  const {
    data: {
      createTopping: { id },
    },
  } = await createTopping(client, name);

  name = "toppingTestUpdated";

  await new Promise<void>(async resolve => {
    await client.subscribe({
      query: toppingUpdatedNotificationsDocument,
      onData: response => {
        t.equal(response.data?.toppingUpdatedNotifications?.id, id);
        resolve();
      },
    });

    const response = await client.mutate(updateToppingDocument, {
      variables: {
        id,
        name,
      },
    });

    t.equal(response.data.updateTopping?.name, name);
    t.equal(response.errors, undefined);
  });
});

tap.test("deleteTopping", async t => {
  const name = "toppingTest";
  const {
    data: {
      createTopping: { id },
    },
  } = await createTopping(client, name);

  await new Promise<void>(async resolve => {
    await client.subscribe({
      query: toppingDeletedNotificationsDocument,
      onData: response => {
        t.equal(response.data?.toppingDeletedNotifications?.id, id);
        resolve();
      },
    });

    const response = await deleteTopping(client, id);

    t.ok(response.data.deleteTopping);
    t.equal(response.data.deleteTopping?.name, name);
    t.equal(response.errors, undefined);
  });
});

tap.test("getTopping", async t => {
  const name = "toppingTest";
  const {
    data: {
      createTopping: { id: toppingId },
    },
  } = await createTopping(client, name);

  const response = await client.query(getToppingDocument, {
    variables: {
      toppingId,
    },
  });

  t.ok(response.data.getTopping);
  t.equal(response.data.getTopping?.id, toppingId);
  t.equal(response.data.getTopping?.name, name);
  t.equal(response.data.getTopping?.name, name);
  t.equal(response.errors, undefined);
});

tap.test("getToppings", async t => {
  const name = "toppingTest";
  await createTopping(client, name);

  const response = await client.query(getToppingsDocument, {
    variables: {
      limit: 10,
      offset: 0,
    },
  });

  t.ok(response.data.getToppings);
  t.ok(response.data.getToppings.length);
  t.equal(response.errors, undefined);
});
