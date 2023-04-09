import { Mutations } from "../../utils";
import { createToppingEvent } from "../../utils/toppingEvent";

export const updateTopping: Required<Mutations>["updateTopping"] = async (
  _,
  { topping },
  { app: { dbContext, log }, pubsub }
) => {
  log.info(topping, "Updating topping");

  const updatedTopping = await dbContext.topping.update({
    where: {
      id: topping.id,
    },
    data: {
      name: topping.name,
    },
  });

  await pubsub.publish(
    createToppingEvent("TOPPING_UPDATED", updatedTopping.id)
  );

  log.info(topping, "Topping updated");

  return updatedTopping;
};
