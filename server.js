const Hapi = require("hapi");
const { graphqlHapi, graphiqlHapi } = require("apollo-server-hapi");
const { makeExecutableSchema } = require("graphql-tools");

const HOST = "localhost";
const PORT = 3000;

const typeDefs = `
  type Runner {
    id: String!
    name: String!
  }
`;
const resolvers = {};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

async function StartServer() {
  const server = new Hapi.server({
    host: HOST,
    port: PORT
  });

  await server.register({
    plugin: graphqlHapi,
    options: {
      path: "/graphql",
      graphqlOptions: {
        schema
      },
      route: {
        cors: true
      }
    }
  });

  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: "/graphiql",
      graphiqlOptions: {
        endpointURL: "/graphql"
      }
    }
  });

  try {
    await server.start();
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }

  console.log(`Server running at: ${server.info.uri}`);
}

StartServer();
