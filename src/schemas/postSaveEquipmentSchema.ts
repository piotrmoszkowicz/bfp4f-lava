import { FastifySchema } from "fastify";

const result: FastifySchema = {
  body: {
    type: "array",
  },
  params: {
    type: "object",
    required: ["soldierId"],
    properties: {
      soldierId: {
        type: "integer",
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        status: {
          type: "string",
        },
      },
    },
    406: {
      type: "object",
      properties: {
        status: {
          type: "string",
        },
      },
    },
  },
};

export default result;
