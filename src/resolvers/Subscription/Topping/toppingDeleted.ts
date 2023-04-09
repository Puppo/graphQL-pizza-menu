import { Subscriptions } from "../../utils";
import { TOPPING_EVENTS } from "../../utils/toppingEvent";

export const toppingDeletedNotifications: Required<Subscriptions>["toppingDeletedNotifications"] = {
  subscribe: async (root, args, { pubsub }) =>
    await pubsub.subscribe(TOPPING_EVENTS.TOPPING_DELETED),
};
