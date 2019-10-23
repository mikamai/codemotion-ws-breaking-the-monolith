import { default as fastify } from 'fastify';
import { ApolloServer } from 'apollo-server-fastify';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true
});

async function main(): Promise<any> {
  const app = fastify({ logger: true });
  app.register(server.createHandler());

  return app.listen(8080, '0.0.0.0');
}

main().catch(console.error);
