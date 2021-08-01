import { FastifyInstance } from "fastify";

import { getApparelJson } from "@controllers/get/getApparelJson";
import { getAttachmentsJson } from "@controllers/get/getAttachmentsJson";
import { getBoostersJson } from "@controllers/get/getBoostersJson";
import { getBundlesJson } from "@controllers/get/getBundlesJson";
import { getGameEvents } from "@controllers/get/getGameEvents";
import { getGameList } from "@controllers/get/getGameList";
import { getSoldiers } from "@controllers/get/getSoldiers";
import { getVip } from "@controllers/get/getVip";
import { getWalletBalance } from "@controllers/get/getWalletBalance";
import { getWeaponsJson } from "@controllers/get/getWeaponsJson";

import { purchaseTrainingPoints } from "@controllers/post/abilities/purchaseTrainingPoints";
import { saveEquipment } from "@controllers/post/equipment/saveEquipment";
import { postStoreBuy } from "@controllers/post/store/buy";

import getApparelJsonSchema from "@schemas/getApparelJsonSchema";
import getAttachmentsJsonSchema from "@schemas/getAttachmentsJsonSchema";
import getBoostersJsonSchema from "@schemas/getBoostersJsonSchema";
import getBundlesJsonSchema from "@schemas/getBundlesJsonSchema";
import getGameEventsSchema from "@schemas/getGameEventsSchema";
import getGameListSchema from "@schemas/getGameListSchema";
import getSoldiersSchema from "@schemas/getSoldiersSchema";
import getVipSchema from "@schemas/getVipSchema";
import getWalletBalanceSchema from "@schemas/getWalletBalanceSchema";
import getWeaponsJsonSchema from "@schemas/getWeaponsJsonSchema";

import postBuySchema from "@schemas/postBuySchema";
import postPurchaseTrainingPointsSchema from "@schemas/postPurchaseTrainingPointsSchema";
import postSaveEquipmentSchema from "@schemas/postSaveEquipmentSchema";

export default async (fastify: FastifyInstance): Promise<void> => {
  /* Get routes */

  fastify.route({
    method: "GET",
    url: "/getApparelJson",
    handler: getApparelJson,
    schema: getApparelJsonSchema,
  });

  fastify.route({
    method: "GET",
    url: "/getAttachmentsJson",
    handler: getAttachmentsJson,
    schema: getAttachmentsJsonSchema,
  });

  fastify.route({
    method: "GET",
    url: "/getBoostersJson",
    handler: getBoostersJson,
    schema: getBoostersJsonSchema,
  });

  fastify.route({
    method: "GET",
    url: "/getBundlesJson",
    handler: getBundlesJson,
    schema: getBundlesJsonSchema,
  });

  fastify.route({
    method: "GET",
    url: "/getGameEvents",
    handler: getGameEvents,
    schema: getGameEventsSchema,
  });

  fastify.route({
    method: "GET",
    url: "/getGameList",
    handler: getGameList,
    schema: getGameListSchema,
  });

  fastify.route({
    method: "GET",
    url: "/getSoldiers",
    handler: getSoldiers,
    schema: getSoldiersSchema,
  });

  fastify.route({
    method: "GET",
    url: "/getVip",
    handler: getVip,
    schema: getVipSchema,
  });

  fastify.route({
    method: "GET",
    url: "/getWalletBalance",
    handler: getWalletBalance,
    schema: getWalletBalanceSchema,
  });

  fastify.route({
    method: "GET",
    url: "/getWeaponsJson",
    handler: getWeaponsJson,
    schema: getWeaponsJsonSchema,
  });

  /* POST routes */

  fastify.route({
    method: "POST",
    url: "/purchaseTrainingPoints/personaId/:personaId/offerId/:offerId",
    handler: purchaseTrainingPoints,
    schema: postPurchaseTrainingPointsSchema,
  });

  fastify.route({
    method: "POST",
    url: "/saveEquipmentBar/:soldierId",
    handler: saveEquipment,
    schema: postSaveEquipmentSchema,
  });

  fastify.route({
    method: "POST",
    url: "/store/buy/:soldierId/:offerId",
    handler: postStoreBuy,
    schema: postBuySchema,
  });
};
