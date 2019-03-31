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
              personas: {
                type: "array",
                items: {
                  properties: {
                    id: {
                      type: "integer"
                    },
                    name: {
                      type: "string"
                    },
                    kit: {
                      type: "integer"
                    },
                    xp: {
                      type: "integer"
                    },
                    xpForNextLevel: {
                      type: "integer"
                    },
                    lastAuthenticated: {
                      type: "integer"
                    },
                    mugShot: {
                      type: "string"
                    },
                    isMaxLevel: {
                      type: "boolean"
                    },
                    level: {
                      type: "integer"
                    },
                    levelUpProgression: {
                      type: "integer"
                    },
                    levelDescription: {
                      type: "string"
                    }
                  }
                }
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
