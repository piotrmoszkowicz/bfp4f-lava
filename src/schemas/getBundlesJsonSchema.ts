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
            type: "object",
            properties: {
              status: {
                type: "string"
              },
              bundles: {
                type: "array"
              }
            }
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
