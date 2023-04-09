import { Subscriptions } from "../utils";

import pizza from "./Pizza";
import topping from "./Topping";

const Mutation = {
  ...pizza,
  ...topping
} satisfies Subscriptions;

export default Mutation;
