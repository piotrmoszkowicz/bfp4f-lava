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
          properties: {
            status: {
              type: "string",
            },
            bundles: {
              type: "array",
            },
          },
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
