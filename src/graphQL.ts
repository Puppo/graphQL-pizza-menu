import mercurius from "mercurius";
import { loadSchema, runCodegen } from "./codegen";

import { FastifyInstance } from "fastify";
import context from "./context";
import resolvers from "./resolvers";

export default async function (app: FastifyInstance) {
  const { schema } = loadSchema(app, resolvers);

  app.log.info({ schema }, "Schema loaded");

  await app.register(mercurius, {
    context,
    schema,
    // loaders,
    resolvers,
    graphiql: true,
  });

  runCodegen(app);
}
