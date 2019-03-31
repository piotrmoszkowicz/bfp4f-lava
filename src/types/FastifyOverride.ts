import { FastifyRequest } from "fastify";
import * as http from "http";

interface FastifyRequestSession extends FastifyRequest<http.IncomingMessage> {
  session: any;
}

export { FastifyRequestSession };
