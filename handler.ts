import { ApolloServer} from "apollo-server-lambda";
import 'source-map-support/register';

import { typeDefs } from './src/typeDefs';
import { resolvers } from './src/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const graphql = server.createHandler({
  cors: {
    origin: true
  }
});