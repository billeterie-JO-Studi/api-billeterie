/**
 * A set of functions called "actions" for `studi`
 */

import { Context } from 'koa'

export default {
  exampleAction: async (ctx: Context, next) => {
    try {
      const entries = await strapi.entityService.findMany('api::offre.offre')
      console.log(strapi); 
      console.log("*****"); 
      console.log(ctx.user); 
      
      
    } catch (err) {
      ctx.body = err;
      console.error(err); 
    }
  },
};
