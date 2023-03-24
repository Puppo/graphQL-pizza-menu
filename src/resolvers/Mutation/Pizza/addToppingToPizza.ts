import mercurius from "mercurius";
import { Mutations } from "../../utils";

const { ErrorWithProps } = mercurius;

export const addToppingToPizza: Required<Mutations>["addToppingToPizza"] =
  async (_, { data: { pizzaId, toppingId } }, { app: { log, dbContext } }) => {
    log.info({ pizzaId, toppingId }, "Add Topping To Pizza");
    const pizza = await dbContext.pizza.findUnique({ where: { id: pizzaId } });
    const errors: Error[] = [];

    if (!pizza)
      errors.push(
        new ErrorWithProps("Pizza not found", {
          code: "PIZZA_NOT_FOUND",
          pizzaId,
        })
      );

    const topping = await dbContext.topping.findUnique({
      where: { id: toppingId },
    });
    if (!topping)
      errors.push(
        new ErrorWithProps("Topping not found", {
          code: "TOPPING_NOT_FOUND",
          toppingId,
        })
      );

    if (errors.length > 0) {
      throw new ErrorWithProps("Errors", {
        code: "ERRORS",
        errors,
      });
    }

    const recipe = await dbContext.recipe.findUnique({
      where: {
        pizzaId_toppingId: {
          pizzaId,
          toppingId,
        },
      },
    });
    if (recipe)
      throw new ErrorWithProps("Topping already added to pizza", {
        code: "TOPPING_ALREADY_ADDED_TO_PIZZA",
        pizzaId,
        toppingId,
      });

    const updatedPizza = await dbContext.recipe.create({
      data: {
        pizzaId,
        toppingId,
      },
      include: {
        pizza: true,
      },
    });

    log.info({ pizzaId, toppingId }, "Add Topping To Pizza completed");

    return updatedPizza.pizza;
  };
