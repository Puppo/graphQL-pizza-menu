import { MutationResolvers } from "../../generated";

const hello: Required<MutationResolvers>["hello"] = (_, { name }) =>
  `Hi ${name}, welcome to Tonino Pizza 🍕!`;

export default hello;
