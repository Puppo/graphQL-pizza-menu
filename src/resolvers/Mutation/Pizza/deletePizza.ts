import { Mutations } from "../../utils";
import { createPizzaEvent } from "../../utils/pizzaEvent";



export const deletePizza: Required<Mutations>["deletePizza"] = async (
  _,
  { id },
  { app: { log, dbContext }, pubsub }
) => {
  log.info({ id }, "Deleting pizza");

  const deletedPizza = await dbContext.$transaction(async t => {
    const pizza = await t.pizza.findUnique({
      where: {
        id,
      },
    });

    await t.recipe.deleteMany({
      where: {
        pizzaId: id,
      },
    });

    await t.pizza.delete({
      where: {
        id,
      },
    });

    return pizza;
  });

  pubsub.publish(createPizzaEvent("PIZZA_DELETED", id));

  log.info({ id }, "Pizza deleted");

  return deletedPizza;
};
