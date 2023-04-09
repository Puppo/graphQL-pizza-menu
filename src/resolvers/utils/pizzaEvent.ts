import { Pizza, Subscription } from "../generated";

export const PIZZA_EVENTS = Object.freeze({
  PIZZA_CREATED: "PIZZA_CREATED",
  PIZZA_UPDATED: "PIZZA_UPDATED",
  PIZZA_DELETED: "PIZZA_DELETED",
});

type PizzaEvents = (typeof PIZZA_EVENTS)[keyof typeof PIZZA_EVENTS];

type PizzaEvent =
  | {
      topic: typeof PIZZA_EVENTS.PIZZA_CREATED;
      payload: Pick<Subscription, "pizzaCreatedNotifications">;
    }
  | {
      topic: typeof PIZZA_EVENTS.PIZZA_UPDATED;
      payload: Pick<Subscription, "pizzaUpdatedNotifications">;
    }
  | {
      topic: typeof PIZZA_EVENTS.PIZZA_DELETED;
      payload: Pick<Subscription, "pizzaDeletedNotifications">;
    };

export function createPizzaEvent<E extends PizzaEvents>(
  event: E,
  id: Pizza["id"]
): Extract<PizzaEvent, { topic: E }>;
export function createPizzaEvent(
  event: PizzaEvents,
  id: Pizza["id"]
): PizzaEvent {
  switch (event) {
    case PIZZA_EVENTS.PIZZA_CREATED:
      return {
        topic: event,
        payload: {
          pizzaCreatedNotifications: {
            id,
          },
        },
      };
    case PIZZA_EVENTS.PIZZA_UPDATED:
      return {
        topic: event,
        payload: {
          pizzaUpdatedNotifications: {
            id,
          },
        },
      };
    case PIZZA_EVENTS.PIZZA_DELETED:
      return {
        topic: event,
        payload: {
          pizzaDeletedNotifications: {
            id,
          },
        },
      };
  }
}
