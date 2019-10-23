import { default as fastify } from 'fastify';
import { ApolloServer } from 'apollo-server-fastify';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function main() {
  const app = fastify({ logger: false });

  app.register(server.createHandler());

  return app.listen(8080, '0.0.0.0');
}

main().catch(console.error);
