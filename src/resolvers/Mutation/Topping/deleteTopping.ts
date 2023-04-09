import mercurius from "mercurius";
import { Mutations } from "../../utils";
import { createToppingEvent } from "../../utils/toppingEvent";

const { ErrorWithProps } = mercurius;

export const deleteTopping: Required<Mutations>["deleteTopping"] = async (
  _,
  { id },
  { app: { log, dbContext }, pubsub }
) => {
  log.info({ id }, "Deleting topping");

  const recipe = await dbContext.recipe.findMany({
    where: {
      toppingId: id,
    },
    include: {
      pizza: true,
    },
  });

  if (recipe.length > 0)
    throw new ErrorWithProps(
      `Topping already added to pizzas: ${recipe
        .map(r => r.pizza.name)
        .join(", ")}`,
      {
        code: "TOPPING_ALREADY_ADDED_TO_PIZZAS",
        toppingId: id,
        pizzaIds: recipe.map(r => r.pizza.id),
      }
    );

  const deletedTopping = await dbContext.topping.delete({
    where: {
      id,
    },
  });

  await pubsub.publish(createToppingEvent("TOPPING_DELETED", id));

  log.info({ id }, "Topping deleted");

  return deletedTopping;
};
