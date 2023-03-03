import { QueryResolvers } from "../generated";

import hello from "./Hello";

const Query = {
  hello,
} satisfies Required<QueryResolvers>;

export default Query;
