import { Mutations } from "../../utils";

let counter = 0;
const takeYourNumber: Mutations["takeYourNumber"] = () => ++counter;

export { takeYourNumber };
