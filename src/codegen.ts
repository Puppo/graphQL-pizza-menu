import { FastifyInstance } from "fastify";
import { buildSchema } from "graphql";
import { IResolvers, MercuriusContext } from "mercurius";
import {
  codegenMercurius,
  CodegenMercuriusOptions,
  loadSchemaFiles,
} from "mercurius-codegen";

const codegenMercuriusOptions: CodegenMercuriusOptions = {
  targetPath: "./src/resolvers/generated.ts",
  watchOptions: {
    enabled: process.env.NODE_ENV === "development",
  },
};

export function runCodegen(app: FastifyInstance) {
  codegenMercurius(app, codegenMercuriusOptions).catch(console.error);
}

export function loadSchema(
  app: FastifyInstance,
  resolvers: IResolvers<any, MercuriusContext>
) {
  return loadSchemaFiles("./graphql/schema/**/*.gql", {
    watchOptions: {
      enabled: process.env.NODE_ENV === "development",
      async onChange(schema) {
        app.graphql.replaceSchema(buildSchema(schema.join("\n")));
        app.graphql.defineResolvers(resolvers);

        runCodegen(app);
      },
    },
  });
}
