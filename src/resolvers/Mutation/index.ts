import { Mutations } from "../utils";

import * as takeYourNumber from "./TakeNumber";

const Mutation = {
  ...takeYourNumber,
} satisfies Mutations;

export default Mutation;
