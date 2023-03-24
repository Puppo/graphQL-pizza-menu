import { Static, Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const ajv = addFormats(new Ajv({}), [
  "date-time",
  "time",
  "date",
  "email",
  "hostname",
  "ipv4",
  "ipv6",
  "uri",
  "uri-reference",
  "uuid",
  "uri-template",
  "json-pointer",
  "relative-json-pointer",
  "regex",
]);

const configSchema = Type.Object({
  NODE_ENV: Type.Union([
    Type.Literal("development"),
    Type.Literal("production"),
  ]),
  DATABASE_URL: Type.String(),
});

const C = ajv.compile(configSchema);

declare module "fastify" {
  interface FastifyInstance {
    config: Static<typeof configSchema>;
  }
}

async function config(app: FastifyInstance, opts = {}) {
  const env = process.env;
  if (!C(env)) throw new Error("Invalid config");

  app.decorate("config", env);
}

export default fp(config);
