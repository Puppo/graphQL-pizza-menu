import {
  GQLResponse,
  createMercuriusTestClient,
} from "mercurius-integration-testing";
import {
  createToppingDocument,
  createToppingMutation,
  deleteToppingDocument,
  deleteToppingMutation,
} from "../../src/resolvers/generated";

export function createTopping(
  client: ReturnType<typeof createMercuriusTestClient>,
  name: string
): Promise<GQLResponse<createToppingMutation>> {
  return client.mutate(createToppingDocument, {
    variables: {
      name,
    },
  });
}

export function deleteTopping(
  client: ReturnType<typeof createMercuriusTestClient>,
  id: string
): Promise<GQLResponse<deleteToppingMutation>> {
  return client.mutate(deleteToppingDocument, {
    variables: {
      id,
    },
  });
}
