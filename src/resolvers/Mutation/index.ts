import { Mutations } from "../utils";

import pizza from "./Pizza";
import * as takeYourNumber from "./TakeNumber";
import topping from "./Topping";

const Mutation = {
  ...takeYourNumber,
  ...topping,
  ...pizza,
} satisfies Mutations;

export default Mutation;
