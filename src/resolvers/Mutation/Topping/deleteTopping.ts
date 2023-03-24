import { Mutations } from "../../utils";

export const deleteTopping: Required<Mutations>["deleteTopping"] = async (
  _,
  { id },
  { app: { log, dbContext } }
) => {
  log.info({ id }, "Deleting topping");

  const deletedTopping = await dbContext.topping.delete({
    where: {
      id,
    },
  });

  log.info({ id }, "Topping deleted");

  return deletedTopping;
};
