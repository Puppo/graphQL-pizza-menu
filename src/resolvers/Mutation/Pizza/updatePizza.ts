import { Mutations } from "../../utils";

export const updatePizza: Required<Mutations>["updatePizza"] = async (
  _,
  { pizza },
  { app: { log, dbContext } }
) => {
  log.info(pizza, "Updating pizza");

  const updatedPizza = await dbContext.$transaction(async t => {
    await t.recipe.deleteMany({
      where: {
        pizzaId: pizza.id,
      },
    });

    log.info(pizza, "Pizza updated - Remove all toppings");

    await t.recipe.createMany({
      data: pizza.toppings.map(toppingId => ({
        toppingId,
        pizzaId: pizza.id,
      })),
    });

    log.info(pizza, "Pizza updated - Add new toppings");

    return await t.pizza.update({
      where: {
        id: pizza.id,
      },
      data: {
        name: pizza.name,
      },
    });
  });

  log.info(pizza, "Pizza updated");

  return updatedPizza;
};
