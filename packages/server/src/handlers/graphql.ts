import { Server } from 'aws-lambda-graphql';
import { applyMiddleware } from 'graphql-middleware';

import { connectionManager, eventProcessor, subscriptionManager } from '../common/subscriptions';
import { MONGO_URL, getConnection } from '../common';
import { dataloadersMiddleware } from '../graphql/loaders';
import schema from '../graphql/schema';
import loggedUserMiddleware from '../graphql/modules/user/loggedUserMiddleware';

const server = new Server({
  schema: applyMiddleware(schema, loggedUserMiddleware, dataloadersMiddleware),
  context: async req => {
    const dbConnection = await getConnection(MONGO_URL);
    return { ...req, dbConnection };
  },
  playground: {
    endpoint: 'https://e07p5jga5e.execute-api.us-east-1.amazonaws.com/dev',
    subscriptionEndpoint: 'wss://qi4dcv7dn5.execute-api.us-east-1.amazonaws.com/dev',
  },
  connectionManager,
  eventProcessor,
  subscriptionManager,
  introspection: true,
});

export const handleHttp = server.createHttpHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
export const handleWebSocket = server.createWebSocketHandler();
export const handleDynamoDBStream = server.createEventHandler();
