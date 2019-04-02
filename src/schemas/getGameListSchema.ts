import * as fastify from "fastify";

const getAll: fastify.RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          result: {
            type: "string"
          },
          status: {
            type: "string"
          },
          data: {
            type: "object"
          }
        }
      },
      406: {
        type: "object",
        properties: {
          result: {
            type: "string"
          },
          status: {
            type: "string"
          }
        }
      }
    }
  }
};

export default getAll;
