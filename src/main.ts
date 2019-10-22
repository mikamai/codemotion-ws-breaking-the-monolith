import { default as fastify } from 'fastify';
import { ApolloServer } from 'apollo-server-fastify';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { Swapi } from './swapi';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function main() {
  await new Swapi().getPerson(1);
  const app = fastify({ logger: true });

  app.register(server.createHandler());

  return app.listen(8080, '0.0.0.0');
}

main().catch(console.error)
