/**
 * command service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::command.command', ({ strapi }) => ({
  async generateCommand(userId: number, totalPrice: number, items: { quantity: number, offre: number }[]) {
    console.log("génération de la commande");

    const objetUser = await strapi.entityService.findOne("plugin::users-permissions.user", userId);


    let ticketsPromise = [];

    for (const item of items) {
      for (let i = 1; i <= item.quantity; i++) {
        // création du ticket

        const objetOffre = await strapi.entityService.findOne("api::offre.offre", item.offre);
        const ticketPromise = strapi.entityService.create('api::ticket.ticket', {
          data: {
            key_qrcode: `firstaname: ${objetUser.firstname} lastname: ${objetUser.lastname} offre: ${objetOffre.name} `,
            offre: item.offre
            // event : Event Unique JO 2024
          }
        })
        ticketsPromise.push(ticketPromise);
      }
    };
    
    const newTickets = await Promise.all(ticketsPromise);
    console.log(newTickets);

    // création de la commande 
    const now = new Date()
    const newCommand = await strapi.entityService.create('api::command.command', {
      data: {
        reference: `USER${userId}PRICE${totalPrice}T${now.getTime()}`,
        total_price: totalPrice,
        user: userId,
        date_purchasse: now,
        tickets: newTickets,


      },
    })

    console.log(newCommand);

  }
}));
