/**
 * `user-authentification` middleware
 */

import { Strapi } from '@strapi/strapi';
import { Context, Next } from 'koa';

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx : Context, next: Next) => {
    strapi.log.info('In user-authentification middleware.');

    
    try {
      const token = ctx.request.header.authorization.replace("Bearer", ""); 
      // Vérifie le token JWT 
      const decodedToken = await strapi.plugins['users-permissions'].services.jwt.verify(token); 

      // stockage du jeton dans le context 
      ctx.state.userId = decodedToken.id; 
    }
    catch {
      console.error("jeton invalide"); 
    }

    await next();
  };
};
