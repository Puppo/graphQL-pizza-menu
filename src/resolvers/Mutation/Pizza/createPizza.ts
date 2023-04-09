import { Mutations } from "../../utils";
import { createPizzaEvent } from "../../utils/pizzaEvent";

export const createPizza: Required<Mutations>["createPizza"] = async (
  _,
  { pizza: { name, toppings } },
  { app: { log, dbContext }, pubsub }
) => {
  log.info({ name }, "Creating pizza");

  const newPizza = await dbContext.pizza.create({
    data: {
      name,
      recipes: {
        create: toppings.map(toppingId => ({
          toppingId,
        })),
      },
    },
  });

  await pubsub.publish(createPizzaEvent("PIZZA_CREATED", newPizza.id));

  log.info({ name }, "Pizza created");

  return newPizza;
};
