import { Queries } from "../../utils";

const hello: Queries["hello"] = _ =>
  `Welcome to Tonino Pizza 🍕!`;

const helloByName: Queries["helloByName"] = (_, { name }) =>
  `Hi ${name}, welcome to Tonino Pizza 🍕!`;

export { hello, helloByName };
