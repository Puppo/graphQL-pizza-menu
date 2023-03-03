import fp from "fastify-plugin";
import mercurius from "mercurius";
import { loadSchema, runCodegen } from "./codegen";

import context from "./context";
// import loaders from "./loaders";
import resolvers from "./resolvers";

export default fp(async app => {
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
});
