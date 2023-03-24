import crypto from "crypto";
import { FastifyInstance } from "fastify";
import { createMercuriusTestClient } from "mercurius-integration-testing";
import tap from "tap";

import {
  addToppingToPizzaDocument,
  getPizzaDocument,
  getPizzasDocument,
  removeToppingFromPizzaDocument,
  updatePizzaDocument,
} from "../src/resolvers/generated";
import { createTestApp } from "./util/createApp";
import { createPizza, deletePizza } from "./util/pizza";
import { createTopping } from "./util/topping";
import { uuidV4Regex } from "./util/uuid";

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

const defaultPizzaName = "pizzaTest";

async function createDefaultPizza() {
  const {
    data: {
      createTopping: { id: toppingId1 },
    },
  } = await createTopping(client, "toppingTest1");
  const {
    data: {
      createTopping: { id: toppingId2 },
    },
  } = await createTopping(client, "toppingTest2");
  const {
    data: {
      createTopping: { id: toppingId3 },
    },
  } = await createTopping(client, "toppingTest3");

  const response = await createPizza(client, defaultPizzaName, [
    toppingId1,
    toppingId2,
    toppingId3,
  ]);

  return {
    response,
    toppings: [toppingId1, toppingId2, toppingId3],
  };
}

tap.test("createPizza", async t => {
  const { response, toppings } = await createDefaultPizza();
  t.match(response.data.createPizza.id, uuidV4Regex);
  t.equal(response.data.createPizza.name, defaultPizzaName);
  t.same(
    response.data.createPizza.toppings.map(({ id }) => id),
    toppings
  );
  t.equal(response.errors, undefined);
});

tap.test("updatePizza", async t => {
  const {
    response: {
      data: {
        createPizza: { id: pizzaId },
      },
    },
    toppings,
  } = await createDefaultPizza();
  const {
    data: {
      createTopping: { id: toppingId4 },
    },
  } = await createTopping(client, "toppingTest4");

  const newPizzaName = "pizzaTestUpdated";
  const newToppings = toppings.slice(0, toppings.length - 2).concat(toppingId4);

  const response = await client.mutate(updatePizzaDocument, {
    variables: {
      pizzaId,
      name: newPizzaName,
      toppings: newToppings,
    },
  });

  t.equal(response.data.updatePizza?.id, pizzaId);
  t.equal(response.data.updatePizza?.name, newPizzaName);
  t.same(
    response.data.updatePizza?.toppings.map(({ id }) => id),
    newToppings
  );
  t.equal(response.errors, undefined);
});

tap.test("deletePizza", async t => {
  const {
    response: {
      data: {
        createPizza: { id: pizzaId },
      },
    },
  } = await createDefaultPizza();

  const response = await deletePizza(client, pizzaId);

  t.ok(response.data.deletePizza);
  t.equal(response.data.deletePizza?.name, defaultPizzaName);
  t.equal(response.errors, undefined);
});

tap.test("addToppingToPizza", async t => {
  const {
    response: {
      data: {
        createPizza: { id: pizzaId },
      },
    },
  } = await createDefaultPizza();
  const {
    data: {
      createTopping: { id: toppingId4 },
    },
  } = await createTopping(client, "toppingTest4");

  const response = await client.mutate(addToppingToPizzaDocument, {
    variables: {
      pizzaId,
      toppingId: toppingId4,
    },
  });

  t.ok(response.data.addToppingToPizza);
  t.equal(response.data.addToppingToPizza?.name, defaultPizzaName);
  t.ok(
    response.data.addToppingToPizza?.toppings.some(
      ({ id }) => id === toppingId4
    )
  );
  t.equal(response.errors, undefined);
});

tap.test("addToppingToPizza - throw error if pizza not exists", async t => {
  const pizzaId = crypto.randomUUID();
  const toppingId = crypto.randomUUID();

  const response = await client.mutate(addToppingToPizzaDocument, {
    variables: {
      pizzaId,
      toppingId,
    },
  });

  t.equal(response.data.addToppingToPizza, null);
  t.ok(response.errors);
});

tap.test("addToppingToPizza - throw error if topping not exists", async t => {
  const {
    response: {
      data: {
        createPizza: { id: pizzaId },
      },
    },
  } = await createDefaultPizza();
  const toppingId = crypto.randomUUID();

  const response = await client.mutate(addToppingToPizzaDocument, {
    variables: {
      pizzaId,
      toppingId,
    },
  });

  t.equal(response.data.addToppingToPizza, null);
  t.ok(response.errors);
});

tap.test(
  "addToppingToPizza - throw error if topping already added in the pizza",
  async t => {
    const {
      response: {
        data: {
          createPizza: { id: pizzaId },
        },
      },
      toppings: [toppingId],
    } = await createDefaultPizza();

    const response = await client.mutate(addToppingToPizzaDocument, {
      variables: {
        pizzaId,
        toppingId,
      },
    });

    t.equal(response.data.addToppingToPizza, null);
    t.ok(response.errors);
  }
);

tap.test("removeToppingFromPizza", async t => {
  const {
    response: {
      data: {
        createPizza: { id: pizzaId },
      },
    },
    toppings: [toppingId1],
  } = await createDefaultPizza();

  const response = await client.mutate(removeToppingFromPizzaDocument, {
    variables: {
      pizzaId,
      toppingId: toppingId1,
    },
  });

  t.ok(response.data.removeToppingFromPizza);
  t.equal(response.data.removeToppingFromPizza?.name, defaultPizzaName);
  t.notOk(
    response.data.removeToppingFromPizza?.toppings.find(
      ({ id }) => id === toppingId1
    )
  );
  t.equal(response.errors, undefined);
});

tap.test("getPizza", async t => {
  const {
    response: {
      data: {
        createPizza: { id: pizzaId },
      },
    },
  } = await createDefaultPizza();

  const response = await client.query(getPizzaDocument, {
    variables: {
      pizzaId,
    },
  });

  t.ok(response.data.getPizza);
  t.equal(response.data.getPizza?.id, pizzaId);
  t.equal(response.data.getPizza?.name, defaultPizzaName);
  t.equal(response.errors, undefined);
});

tap.test("getPizzas", async t => {
  await createDefaultPizza();

  const response = await client.mutate(getPizzasDocument, {
    variables: {
      limit: 10,
      offset: 0,
    },
  });

  t.ok(response.data.getPizzas);
  t.ok(response.data.getPizzas.length);
  t.equal(response.errors, undefined);
});
