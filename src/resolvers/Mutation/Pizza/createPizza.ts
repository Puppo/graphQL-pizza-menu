import { Mutations } from "../../utils";

export const createPizza: Required<Mutations>["createPizza"] = async (
  _,
  { pizza: { name, toppings } },
  { app: { log, dbContext } }
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

  log.info({ name }, "Pizza created");

  return newPizza;
};
