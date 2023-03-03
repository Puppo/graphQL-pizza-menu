import { QueryResolvers } from "../../generated";

const hello: Required<QueryResolvers>["hello"] = _ =>
  "Welcome to Tonino Pizza 🍕!";

export default hello;
