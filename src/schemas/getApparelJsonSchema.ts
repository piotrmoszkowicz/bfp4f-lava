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
            apparel: {
              type: "array",
              items: {
                properties: {
                  id: {
                    type: "integer",
                  },
                  type: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                  category: {
                    type: "string",
                  },
                  categoryname: {
                    type: "string",
                  },
                  usecount: {
                    type: "integer",
                  },
                  isnew: {
                    type: "boolean",
                  },
                  expiredata: {
                    type: "string",
                  },
                  expireTS: {
                    type: "integer",
                  },
                  expired: {
                    type: "boolean",
                  },
                  description: {
                    type: "string",
                  },
                  owned: {
                    type: "boolean",
                  },
                  ownedPermanent: {
                    type: "boolean",
                  },
                  buyable: {
                    type: "boolean",
                  },
                  equippedSlot: {
                    type: "integer",
                  },
                  validationGroup: {
                    type: "string",
                  },
                  prices: {
                    type: "array",
                    items: {
                      properties: {
                        offer: {
                          type: "string",
                        },
                        limit: {
                          type: "integer",
                        },
                        isUnlimited: {
                          type: "boolean",
                        },
                        currency: {
                          type: "string",
                        },
                        cost: {
                          type: "integer",
                        },
                        isUnlockOffer: {
                          type: "boolean",
                        },
                      },
                    },
                  },
                  promotionType: {
                    type: "boolean",
                  },
                  isLocked: {
                    type: "boolean",
                  },
                  lockType: {
                    type: "string",
                  },
                  lockCriteria: {
                    type: "integer",
                  },
                  numberOfPockets: {
                    type: "integer",
                  },
                  minNumPockets: {
                    type: "integer",
                  },
                  maxNumPockets: {
                    type: "integer",
                  },
                  upgrades: {
                    type: "array",
                  },
                },
              },
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
