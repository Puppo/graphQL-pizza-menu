import { IResolvers } from "mercurius";

import Mutation from "./Mutation";
import Query from "./Query";
import Subscription from "./Subscription";

const resolvers = {
  Query,
  Mutation,
  Subscription,
} satisfies IResolvers;

export default resolvers;
