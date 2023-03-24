import {
  GQLResponse,
  createMercuriusTestClient,
} from "mercurius-integration-testing";
import {
  createPizzaDocument,
  createPizzaMutation,
  deletePizzaDocument,
  deletePizzaMutation,
} from "../../src/resolvers/generated";

export function createPizza(
  client: ReturnType<typeof createMercuriusTestClient>,
  name: string,
  toppings: string[]
): Promise<GQLResponse<createPizzaMutation>> {
  return client.mutate(createPizzaDocument, {
    variables: {
      name,
      toppings,
    },
  });
}

export function deletePizza(
  client: ReturnType<typeof createMercuriusTestClient>,
  pizzaId: string
): Promise<GQLResponse<deletePizzaMutation>> {
  return client.mutate(deletePizzaDocument, {
    variables: {
      pizzaId,
    },
  });
}
