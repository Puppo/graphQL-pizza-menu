import { Subscriptions } from "../../utils";
import { TOPPING_EVENTS } from "../../utils/toppingEvent";


export const toppingUpdatedNotifications: Required<Subscriptions>["toppingUpdatedNotifications"] = {
  subscribe: async (root, args, { pubsub }) =>
  await pubsub.subscribe(TOPPING_EVENTS.TOPPING_UPDATED)
}
