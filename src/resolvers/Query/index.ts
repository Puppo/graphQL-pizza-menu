import { Queries } from "../utils";

import * as hello from "./Hello";

const Query = {
  ...hello,
} satisfies Queries;

export default Query;
