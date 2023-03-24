import { PrismaClient } from "@prisma/client";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

export type DbContext = PrismaClient;

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module "fastify" {
  interface FastifyInstance {
    dbContext: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (app, options) => {
  app.log.info(app.config, `Loading dbContext`);
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: app.config.DATABASE_URL,
      },
    },
  });

  await prisma.$connect();

  // Make Prisma Client available through the fastify server instance: server.prisma
  app.decorate("dbContext", prisma);
  app.log.info(`Loaded dbContext`);

  app.addHook("onClose", async server => {
    await server.dbContext.$disconnect();
  });
});

export default prismaPlugin;
