import { Mutations } from "../../utils";
import { createToppingEvent } from "../../utils/toppingEvent";

export const createTopping: Required<Mutations>["createTopping"] = async (
  _,
  { topping: { name } },
  { app: { log, dbContext }, pubsub }
) => {
  log.info({ name }, "Creating topping");

  const newTopping = await dbContext.topping.create({
    data: {
      name,
    },
  });

  await pubsub.publish(createToppingEvent("TOPPING_CREATED", newTopping.id));

  log.info({ name }, "Topping created");

  return newTopping;
};
