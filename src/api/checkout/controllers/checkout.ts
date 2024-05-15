/**
 * A set of functions called "actions" for `checkout`
 */

import { Context, Next } from "koa";
import Stripe from "stripe";
import Joi from "joi";
import unparsed from "koa-body/unparsed.js";

const YOUR_DOMAIN = process.env.URL_FRONT;
const TOKEN_STRIPE = process.env.TOKEN_STRIPE;
const endpointSecret = process.env.ENDPOINT_SECRET_STRIPE;

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
        const lineItemStrip: Stripe.Checkout.SessionCreateParams.LineItem = {
          price_data: {
            currency: "EUR",
            product_data: {
              name: entityOffre.name,

            },
            unit_amount: entityOffre.price * 100,
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
        metadata: {
          user: JSON.stringify(ctx.state.user),
          dataListItem: JSON.stringify(ctx.request.body)
        }
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
  webhook: async (
    ctx: Context & { request: { body: any } },
    next: Next
  ) => {
    // webhook de paiement
    console.log("appel du webhook");


    // récupération du header Stripe Signature
    const sig = ctx.request.header["stripe-signature"];

    const payload = ctx.request.body[unparsed];


    let event: Stripe.Event;

    try {
      // construction de l'event Strip
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      ctx.response.status = 400;
      console.log(err);
      console.log(err.message);
      ctx.response.body = { error: `Webhook Error: ${err.message}` };
      return; // retourne pour éviter de lancer next
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {

      const paymentIntent = event.data.object;

      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ['line_items'],
        }
      )
      const line_items = sessionWithLineItems.line_items;

      console.log(line_items);
      console.log('PaymentIntent was succcesful!');
      console.log(paymentIntent);

    } else {
      console.log(`Unhandled event type ${event.type}`);

    }


    // strapi.service('api::command.command').generateCommand();

    console.log(event.type);
    ctx.response.body = "OK";

    await next();
  },
};
