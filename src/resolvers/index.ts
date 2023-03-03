import { IResolvers } from "mercurius";

import Mutation from "./Mutation";
import Query from "./Query";

const resolvers = {
  Query,
  Mutation,
} satisfies IResolvers;

export default resolvers;
