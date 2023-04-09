import { Subscriptions } from "../../utils";
import { PIZZA_EVENTS } from "../../utils/pizzaEvent";

export const pizzaDeletedNotifications: Required<Subscriptions>["pizzaDeletedNotifications"] =
  {
    subscribe: async (root, args, { pubsub }) =>
      await pubsub.subscribe(PIZZA_EVENTS.PIZZA_DELETED),
  };
