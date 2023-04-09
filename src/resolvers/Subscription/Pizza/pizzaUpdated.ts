import { Subscriptions } from "../../utils";
import { PIZZA_EVENTS } from "../../utils/pizzaEvent";

export const pizzaUpdatedNotifications: Required<Subscriptions>["pizzaUpdatedNotifications"] =
  {
    subscribe: async (root, args, { pubsub }) =>
      await pubsub.subscribe(PIZZA_EVENTS.PIZZA_UPDATED),
  };
