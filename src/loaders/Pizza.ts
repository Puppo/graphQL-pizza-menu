import { MercuriusLoaders } from "mercurius";

const PizzaLoader = {
  toppings: async function loader(parent, { app: { dbContext, log } }) {
    log.info(parent, "PizzaLoader.toppings");
    const pizzaIds = parent.map(({ obj }) => obj.id);
    const recipes = await dbContext.recipe.findMany({
      where: {
        pizzaId: {
          in: pizzaIds,
        },
      },
      select: {
        pizzaId: true,
        topping: true,
      },
    });
    const res = parent
      .map(({ obj }) => recipes.filter(({ pizzaId }) => pizzaId === obj.id))
      .map(recipes => recipes.map(({ topping }) => topping));
    return res;
  },
} satisfies MercuriusLoaders["Pizza"];

export default PizzaLoader;
