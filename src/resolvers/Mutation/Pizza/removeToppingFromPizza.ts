import { Mutations } from "../../utils";
import { createPizzaEvent } from "../../utils/pizzaEvent";

export const removeToppingFromPizza: Required<Mutations>["removeToppingFromPizza"] =
  async (_, { data: { pizzaId, toppingId } }, { app: { log, dbContext }, pubsub }) => {
    log.info({ pizzaId, toppingId }, "Remove Topping from Pizza");

    const updatedPizza = await dbContext.recipe.delete({
      where: {
        pizzaId_toppingId: {
          pizzaId,
          toppingId,
        },
      },
      include: {
        pizza: true,
      },
    });

    pubsub.publish(createPizzaEvent('PIZZA_UPDATED', pizzaId));

    log.info({ pizzaId, toppingId }, "Remove Topping from Pizza completed");

    return updatedPizza.pizza;
  };
