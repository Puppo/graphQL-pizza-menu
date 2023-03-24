import { Mutations } from "../../utils";

export const removeToppingFromPizza: Required<Mutations>["removeToppingFromPizza"] =
  async (_, { data: { pizzaId, toppingId } }, { app: { log, dbContext } }) => {
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

    log.info({ pizzaId, toppingId }, "Remove Topping from Pizza completed");

    return updatedPizza.pizza;
  };
