import { Mutations } from "../../utils";

export const updateTopping: Required<Mutations>["updateTopping"] = async (
  _,
  { topping },
  { app: { dbContext, log } }
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

  log.info(topping, "Topping updated");

  return updatedTopping;
};
