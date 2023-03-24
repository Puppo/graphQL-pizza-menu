import { Mutations } from "../../utils";

export const deletePizza: Required<Mutations>["deletePizza"] = async (
  _,
  { id },
  { app: { log, dbContext } }
) => {
  log.info({ id }, "Deleting pizza");

  const deletedPizza = await dbContext.$transaction(async t => {
    const pizza = await t.pizza.findUnique({
      where: {
        id,
      },
      include: {
        recipes: {
          include: {
            topping: true,
          },
        },
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

  log.info({ id }, "Pizza deleted");

  return deletedPizza;
};
