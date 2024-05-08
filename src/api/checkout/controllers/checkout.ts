/**
 * A set of functions called "actions" for `checkout`
 */

import { Context , Next } from "koa";
import Stripe from "stripe";
import { factories } from "@strapi/strapi";
import { validate } from "@strapi/utils"

const YOUR_DOMAIN = process.env.URL_FRONT;
const TOKEN_STRIPE = process.env.TOKEN_STRIPE; 

const stripe = new Stripe(TOKEN_STRIPE);


export default {
  sendCommand: async (ctx: Context & {request: { body: any}}, next: Next) => {
    console.log(ctx.request.body);
    console.log("Custom controller");

    // const contentType = strapi.contentType("api:checkout.checkout"); 

    //await 

    // transformation des data pour stripe 

    //const line_items = 

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price_data: {
            currency: "EUR",
            product_data: {
              name: "Commande JO",
            },
            unit_amount: 3000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    console.log(session.url);
    //ctx.response.redirect(session.url); // Problème cors avec request sur OPTION de firefox
    ctx.body = session.url; 
    
    next();
  },
};
