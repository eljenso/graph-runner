const { ApolloServer } = require("apollo-server");

const { typeDefs } = require("./types");
const { resolvers } = require("./resolvers");

const HOST = "0.0.0.0";
const PORT = 3000;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(PORT, HOST).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
