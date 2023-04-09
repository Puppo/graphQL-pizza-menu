import { Subscription, Topping } from "../generated";

export const TOPPING_EVENTS = Object.freeze({
  TOPPING_CREATED: "TOPPING_CREATED",
  TOPPING_UPDATED: "TOPPING_UPDATED",
  TOPPING_DELETED: "TOPPING_DELETED",
});

type ToppingEvents = (typeof TOPPING_EVENTS)[keyof typeof TOPPING_EVENTS];

type ToppingEvent =
  | {
      topic: typeof TOPPING_EVENTS.TOPPING_CREATED;
      payload: Pick<Subscription, "toppingCreatedNotifications">;
    }
  | {
      topic: typeof TOPPING_EVENTS.TOPPING_UPDATED;
      payload: Pick<Subscription, "toppingUpdatedNotifications">;
    }
  | {
      topic: typeof TOPPING_EVENTS.TOPPING_DELETED;
      payload: Pick<Subscription, "toppingDeletedNotifications">;
    };

export function createToppingEvent<E extends ToppingEvents>(
  event: E,
  id: Topping["id"]
): Extract<ToppingEvent, { topic: E }>;
export function createToppingEvent(
  event: ToppingEvents,
  id: Topping["id"]
): ToppingEvent {
  switch (event) {
    case TOPPING_EVENTS.TOPPING_CREATED:
      return {
        topic: event,
        payload: {
          toppingCreatedNotifications: {
            id,
          },
        },
      };
    case TOPPING_EVENTS.TOPPING_UPDATED:
      return {
        topic: event,
        payload: {
          toppingUpdatedNotifications: {
            id,
          },
        },
      };
    case TOPPING_EVENTS.TOPPING_DELETED:
      return {
        topic: event,
        payload: {
          toppingDeletedNotifications: {
            id,
          },
        },
      };
  }
}
