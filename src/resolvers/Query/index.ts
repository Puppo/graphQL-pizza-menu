import { Queries } from "../utils";

import * as hello from "./Hello";
import * as pizza from "./Pizza";
import * as topping from "./Topping";

const Query = {
  ...hello,
  ...topping,
  ...pizza,
} satisfies Queries;

export default Query;
