"use strict";
const { sanitize } = require("@strapi/utils");
/**
 * A set of functions called "actions" for `transfer`
 */
module.exports = {
  index: async (ctx) => {
    const { sender, receiver, amount } = ctx.request.body;
    console.log(sender, receiver, amount);
    let entity;
    // deduct amount from sender
    // add amount to reciver
    // add the transaction to transact
    const [senderAcc] = await strapi.entityService.findMany(
      "api::account.account",
      {
        filters: { name: { $eq: sender } },
      }
    );
    const [receiverAcc] = await strapi.entityService.findMany(
      "api::account.account",
      {
        filters: { name: { $eq: receiver } },
      }
    );
    senderAcc.balance = senderAcc.balance - parseFloat(amount);
    receiverAcc.balance = receiverAcc.balance + parseFloat(amount);
    await strapi.entityService.update("api::account.account", senderAcc.id, {
      data: senderAcc,
    });
    await strapi.entityService.update("api::account.account", receiverAcc.id, {
      data: receiverAcc,
    });
    entity = await strapi.entityService.create("api::transact.transact", {
      data: { sender, receiver, amount },
    });

    const contentType = strapi.contentType('api::transact.transact');
    const sanitizedEntity = await sanitize.contentAPI.output(entity, contentType); 
    return sanitizedEntity;
  },
};
