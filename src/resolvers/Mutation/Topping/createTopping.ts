import { Mutations } from "../../utils";

export const createTopping: Required<Mutations>["createTopping"] = async (
  _,
  { topping: { name } },
  { app: { log, dbContext } }
) => {
  log.info({ name }, "Creating topping");

  const newTopping = await dbContext.topping.create({
    data: {
      name,
    },
  });

  log.info({ name }, "Topping created");

  return newTopping;
};
