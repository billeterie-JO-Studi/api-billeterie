# API Billeterie Studi 

ce projet, est une Api d'une application de billeteries ( Evaluation Studi ) 

## Installation 

### Méthode manuel 

**Requires** : [NodeJs](https://nodejs.org/en)

1. crée le fichier _.env_ en se basant sur le fichier ._env.example_
2. changer les variable du fichier selon vos besoins
3. lancer la commande `npm run build` pour construire le panel d'administration 
4. lancer la commande `npm run start` pour lancer le serveur API

### Méthode avec Docker 

1. crée le fichier _.env_ en se basant du fichier _.env.examples_
2. changer les variables du fichiers selon vos besoins
3. lancer le réseau docker en tapant la commande `docker-compose up -d`

**remarque**: vous n'etes pas obligé de crée le _.env_
vous pouvez passé diretement les variable avant la commande `docker-compose up -d` 
example : `MY_ENV_VAR=value1 ANOTHER_ENV_VAR=value2 docker-compose up -d`

les variables définir en précédant la commande sont prioritaire par rapport au _.env_



----------------------------------------------------------------------------------------------------- 





# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
