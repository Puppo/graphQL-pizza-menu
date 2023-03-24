import fastify from "fastify";
import logger from "./logger";

const app = fastify({
  logger,
});

app.register(import("./app"));

const PORT = (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000;

app.listen({ port: PORT }).then(() => {
  console.log(`Server listening on port ${PORT}`);
});
