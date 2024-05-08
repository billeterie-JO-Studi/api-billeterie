

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
  ],
};
