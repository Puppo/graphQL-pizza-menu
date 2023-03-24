import { Queries } from "../../utils";

const getPizzas: Queries["getPizzas"] = async (
  _,
  { pagination: { limit, offset } },
  { app: { log, dbContext } }
) => {
  log.info({ limit, offset }, "Get pizzas");
  const pizzas = await dbContext.pizza.findMany({
    take: limit,
    skip: offset,
    orderBy: {
      name: "asc",
    },
  });

  log.info({ limit, offset }, "Pizzas retrieved");

  return pizzas;
};

const getPizza: Queries["getPizza"] = async (
  _,
  { id },
  { app: { dbContext, log } }
) => {
  log.info({ id }, "Get pizza");
  const pizza = await dbContext.pizza.findUnique({
    where: {
      id,
    },
  });

  log.info({ id }, "Pizza retrieved");

  return pizza;
};

export { getPizzas, getPizza };
