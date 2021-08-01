import { FastifySchema } from "fastify";

const getAll: FastifySchema = {
  response: {
    200: {
      type: "object",
      properties: {
        result: {
          type: "string",
        },
        status: {
          type: "string",
        },
        data: {
          type: "object",
        },
      },
    },
    406: {
      type: "object",
      properties: {
        result: {
          type: "string",
        },
        status: {
          type: "string",
        },
      },
    },
  },
};

export default getAll;
