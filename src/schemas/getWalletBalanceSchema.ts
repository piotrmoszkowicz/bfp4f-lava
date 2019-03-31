import * as fastify from "fastify";

const getAll: fastify.RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          status: {
            type: "string"
          },
          data: {
            type: "object",
            properties: {
              _PF: {
                type: "integer"
              },
              _AC: {
                type: "integer"
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
