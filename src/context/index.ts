import { FastifyReply, FastifyRequest } from "fastify";

const buildContext = (req: FastifyRequest, res: FastifyReply) => {
  return {};
};

declare module "mercurius" {
  interface MercuriusContext extends ReturnType<typeof buildContext> {}
}

export default buildContext;
