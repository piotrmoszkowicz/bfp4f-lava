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

import * as getApparelJsonSchema from "@schemas/getApparelJsonSchema";
import * as getAttachmentsJsonSchema from "@schemas/getAttachmentsJsonSchema";
import * as getBoostersJsonSchema from "@schemas/getBoostersJsonSchema";
import * as getBundlesJsonSchema from "@schemas/getBundlesJsonSchema";
import * as getGameEventsSchema from "@schemas/getGameEventsSchema";
import * as getGameListSchema from "@schemas/getGameListSchema";
import * as getSoldiersSchema from "@schemas/getSoldiersSchema";
import * as getVipSchema from "@schemas/getVipSchema";
import * as getWalletBalanceSchema from "@schemas/getWalletBalanceSchema";
import * as getWeaponsJsonSchema from "@schemas/getWeaponsJsonSchema";

import * as postBuySchema from "@schemas/postBuySchema";
import * as postPurchaseTrainingPointsSchema from "@schemas/postPurchaseTrainingPointsSchema";
import * as postSaveEquipmentSchema from "@schemas/postSaveEquipmentSchema";

export default async fastify => {
  /* Get routes */

  fastify.route({
    method: "GET",
    url: "/getApparelJson",
    handler: getApparelJson,
    schema: getApparelJsonSchema
  });

  fastify.route({
    method: "GET",
    url: "/getAttachmentsJson",
    handler: getAttachmentsJson,
    schema: getAttachmentsJsonSchema
  });

  fastify.route({
    method: "GET",
    url: "/getBoostersJson",
    handler: getBoostersJson,
    schema: getBoostersJsonSchema
  });

  fastify.route({
    method: "GET",
    url: "/getBundlesJson",
    handler: getBundlesJson,
    schema: getBundlesJsonSchema
  });

  fastify.route({
    method: "GET",
    url: "/getGameEvents",
    handler: getGameEvents,
    schema: getGameEventsSchema
  });

  fastify.route({
    method: "GET",
    url: "/getGameList",
    handler: getGameList,
    schema: getGameListSchema
  });

  fastify.route({
    method: "GET",
    url: "/getSoldiers",
    handler: getSoldiers,
    schema: getSoldiersSchema
  });

  fastify.route({
    method: "GET",
    url: "/getVip",
    handler: getVip,
    schema: getVipSchema
  });

  fastify.route({
    method: "GET",
    url: "/getWalletBalance",
    handler: getWalletBalance,
    schema: getWalletBalanceSchema
  });

  fastify.route({
    method: "GET",
    url: "/getWeaponsJson",
    handler: getWeaponsJson,
    schema: getWeaponsJsonSchema
  });

  /* POST routes */

  fastify.route({
    method: "POST",
    url: "/purchaseTrainingPoints/personaId/:personaId/offerId/:offerId",
    handler: purchaseTrainingPoints,
    schema: postPurchaseTrainingPointsSchema
  });

  fastify.route({
    method: "POST",
    url: "/saveEquipmentBar/:soldierId",
    handler: saveEquipment,
    schema: postSaveEquipmentSchema
  });

  fastify.route({
    method: "POST",
    url: "/store/buy/:soldierId/:offerId",
    handler: postStoreBuy,
    schema: postBuySchema
  });
};
