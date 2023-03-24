import { MercuriusLoaders } from "mercurius";

const ToppingLoader = {
  pizzas: async function loader(parent, { app: { dbContext, log } }) {
    log.info(parent, "ToppingLoader.pizzas");
    const toppingIds = parent.map(({ obj }) => obj.id);
    const recipes = await dbContext.recipe.findMany({
      where: {
        toppingId: {
          in: toppingIds,
        },
      },
      select: {
        toppingId: true,
        pizza: true,
      },
    });
    const res = parent
      .map(({ obj }) => recipes.filter(({ toppingId }) => toppingId === obj.id))
      .map(recipes => recipes.map(({ pizza }) => pizza));
    return res;
  },
} satisfies MercuriusLoaders["Topping"];

export default ToppingLoader;
