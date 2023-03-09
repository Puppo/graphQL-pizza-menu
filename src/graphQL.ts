import fp from "fastify-plugin";
import mercurius from "mercurius";
import { loadSchema, runCodegen } from "./codegen";

import { FastifyInstance } from "fastify";
import context from "./context";
import resolvers from "./resolvers";

async function graphQL(app: FastifyInstance, opts = {}) {
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

export default fp(graphQL);
