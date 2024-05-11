

export default {
  routes: [
    {
      method: "POST",
      path: "/checkout",
      handler: "checkout.sendCommand",
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
    {
      method: "POST", 
      path: "/webhook", 
      handler: "checkout.webhook", 
      config: {
        policies: [],
        middlewares: [], 
        auth: false
      }

    }

  ],
};
