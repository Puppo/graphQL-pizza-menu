import { Subscriptions } from "../../utils";
import { PIZZA_EVENTS } from "../../utils/pizzaEvent";

export const pizzaCreatedNotifications: Required<Subscriptions>["pizzaCreatedNotifications"] = {
  subscribe: async (root, args, { pubsub }) =>
    await pubsub.subscribe(PIZZA_EVENTS.PIZZA_CREATED),
};
