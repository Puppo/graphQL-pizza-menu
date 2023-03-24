import { Queries } from "../../utils";

const getToppings: Queries["getToppings"] = async (
  _,
  { pagination: { limit, offset } },
  { app: { log, dbContext } }
) => {
  log.info({ limit, offset }, "Get toppings");
  const toppings = await dbContext.topping.findMany({
    take: limit,
    skip: offset,
    orderBy: {
      name: "asc",
    },
  });

  log.info({ limit, offset }, "Toppings retrieved");
  return toppings;
};

const getTopping: Queries["getTopping"] = async (
  _,
  { id },
  { app: { dbContext, log } }
) => {
  log.info({ id }, "Get topping");
  const topping = await dbContext.topping.findUnique({
    where: {
      id,
    },
  });

  log.info({ id }, "Topping retrieved");

  return topping;
};

export { getToppings, getTopping };
