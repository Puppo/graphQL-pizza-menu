import { MutationResolvers } from "../generated";

import hello from "./Hello";

const Mutation = {
  hello,
} satisfies Required<MutationResolvers>;

export default Mutation;
