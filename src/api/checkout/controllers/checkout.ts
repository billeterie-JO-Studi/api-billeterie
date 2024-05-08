/**
 * A set of functions called "actions" for `checkout`
 */

import { Context, Next } from "koa";
import Stripe from "stripe";
import Joi from "joi";

const YOUR_DOMAIN = process.env.URL_FRONT;
const TOKEN_STRIPE = process.env.TOKEN_STRIPE;

const stripe = new Stripe(TOKEN_STRIPE);

// schema pour le controlleur
const schema = Joi.array().items(
  Joi.object({
    offre: Joi.number().required(),
    quantity: Joi.number().required(),
  })
);

export default {
  sendCommand: async (
    ctx: Context & {
      request: { body: Array<{ offre: number; quantity: number }> };
    },
    next: Next
  ) => {
    try {
      // vérification des data
      Joi.assert(ctx.request.body, schema, "format Invalide");

      let promiseResult = ctx.request.body.map(async (item) => {
        const entityOffre = await strapi.entityService.findOne(
          "api::offre.offre",
          item.offre
        );
        const lineItemStrip = {
          price_data: {
            currency: "EUR",
            product_data: {
              name: entityOffre.name,
            },
            unit_amount: entityOffre.price,
          },
          quantity: item.quantity,
        };

        return lineItemStrip;
      });

      const resultListItemStripe = await Promise.all(promiseResult);

      console.log(resultListItemStripe);

      const session = await stripe.checkout.sessions.create({
        line_items: resultListItemStripe,
        mode: "payment",
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      });

      console.log(session.url);
      //ctx.response.redirect(session.url); // Problème cors avec request sur OPTION de firefox
      ctx.body = session.url;

      next();
    } catch (err) {
      ctx.response.status = 400; // Bad Request
      console.log("---début error---");
      console.log(err);
      console.log("---fin error---");
      ctx.response.body = err;
    }
  },
};
