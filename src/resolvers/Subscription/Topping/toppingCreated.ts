import { Subscriptions } from "../../utils";
import { TOPPING_EVENTS } from "../../utils/toppingEvent";

export const toppingCreatedNotifications: Required<Subscriptions>["toppingCreatedNotifications"] =
  {
    subscribe: async (root, args, { pubsub }) =>
      await pubsub.subscribe(TOPPING_EVENTS.TOPPING_CREATED),
  };
