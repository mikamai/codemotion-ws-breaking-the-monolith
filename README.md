# Breaking the Monolith

## Apollo introduction

Let's get started with GraphQL!
First, let's initialize a new NodeJS project using [Yarn](https://yarnpkg.com/lang/en/) and install the needed dependencies.

```bash
$ yarn init

$ yarn add -D typescript ts-node nodemon @types/node

$ yarn add fastify apollo-server-fastify graphql graphql-tools

$ npx tsc --init --rootDir src --outDir dist --lib dom,es6 --module commonjs

$ mkdir src
```

We are using [Fastify](https://fastify.io) as our web library and the corresponding [Apollo Server](https://www.apollographql.com/docs/apollo-server/) integration.

We are then going to create a small application to get us started.

```typescript
// src/main.ts

import { default as fastify } from 'fastify';
import { ApolloServer } from 'apollo-server-fastify';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function main() {
  const app = fastify({ logger: true });

  app.register(server.createHandler());

  return app.listen(8080, '0.0.0.0');
}

main().catch(console.error)
```

```typescript
// src/resolvers.ts

export const resolvers = {
  Query: {
    hello: () => ("world")
  }
}
```

```typescript
// src/typeDefs.ts

export const typeDefs = `
type Query {
  hello: String!
}
`
```
