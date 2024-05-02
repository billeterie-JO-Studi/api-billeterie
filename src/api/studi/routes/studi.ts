export default {
  routes: [
     {
      method: 'GET',
      path: '/studi',
      handler: 'studi.exampleAction',
      config: {
        policies: [],
        auth: false, 
      middlewares: ['global::user-authentification'],
      },
     },
  ],
};
