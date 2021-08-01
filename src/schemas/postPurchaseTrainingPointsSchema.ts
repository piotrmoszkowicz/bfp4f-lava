import { FastifySchema } from "fastify";

const result: FastifySchema = {
  params: {
    type: "object",
    required: ["personaId", "offerId"],
    properties: {
      personaId: {
        type: "integer",
      },
      offerId: {
        type: "integer",
      },
    },
  },
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
            credits: {
              type: "integer",
            },
            funds: {
              type: "integer",
            },
            items: {
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

export default result;
