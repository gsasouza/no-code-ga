import { ApolloServer } from 'apollo-server-lambda';
import { applyMiddleware } from 'graphql-middleware';

import { MONGO_URL, getConnection } from '../common';
import { dataloadersMiddleware } from '../graphql/loaders';
import schema from '../graphql/schema';
import loggedUserMiddleware from '../graphql/modules/user/loggedUserMiddleware';

const server = new ApolloServer({
  schema: applyMiddleware(schema, loggedUserMiddleware, dataloadersMiddleware),
  context: async req => {
    const dbConnection = await getConnection(MONGO_URL);
    return { ...req, dbConnection };
  },
  playground: {
    endpoint: '/dev/graphql',
  },
  introspection: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
