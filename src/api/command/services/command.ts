/**
 * command service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::command.command', ({ strapi }) => ({
  async generateCommand(items: {quantity: number, offre: number}[], userId) {
    console.log("génération de la commande");

    //pour le test ( masquage )
     items = [{quantity: 1, offre: 1}]; 
     userId = 1 ; 



    let ticketsPromise = []; 

    items.forEach(item => {
      for(let i = 1 ; i <= item.quantity; i++) {
        // création du ticket
        const newTicketPromise =  strapi.entityService.create('api::ticket.ticket', {
          data: {
            key_qrcode:'QRCODE TEST', 
            published: true

          }
        })
        ticketsPromise.push(newTicketPromise);
      }
    }); 

    const newTickets = await Promise.all(ticketsPromise); 
    console.log(newTickets); 

    // création de la commande 
    const newCommand = await strapi.entityService.create('api::command.command', {
      data: {
        reference: "Ref 0",
        total_price: 69,
        user: userId,
        date_purchasse: new Date(), 
        tickets: newTickets, 

        
      },
    })

    console.log(newCommand);

  }
}));
