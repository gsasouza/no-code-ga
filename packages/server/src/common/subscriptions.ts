import {
  DynamoDBConnectionManager,
  DynamoDBEventStore,
  PubSub,
  DynamoDBSubscriptionManager,
  DynamoDBEventProcessor,
} from 'aws-lambda-graphql';
import { ApiGatewayManagementApi, DynamoDB } from 'aws-sdk';

const dynamoDbClient = new DynamoDB.DocumentClient({
  ...(process.env.IS_OFFLINE
    ? {
        endpoint: 'http://localhost:8000',
      }
    : {}),
});

export const eventProcessor = new DynamoDBEventProcessor({
  onError: err => console.log(err),
});
export const eventStore = new DynamoDBEventStore({ dynamoDbClient });
export const pubSub = new PubSub({ eventStore });
export const subscriptionManager = new DynamoDBSubscriptionManager({ dynamoDbClient });
export const connectionManager = new DynamoDBConnectionManager({
         // this one is weird but we don't care because you'll use it only if you want to use serverless-offline
         // why is it like that? because we are extracting api gateway endpoint from received events
         // but serverless offline has wrong stage and domainName values in event provided to websocket handler
         // so we need to override the endpoint manually
         // please do not use it otherwise because we need correct endpoint, if you use it similarly as dynamoDBClient above
         // you'll end up with errors
         apiGatewayManager: process.env.IS_OFFLINE
           ? new ApiGatewayManagementApi({
               endpoint: 'http://localhost:3001',
             })
           : undefined,
         dynamoDbClient,
         subscriptions: subscriptionManager,
       });

export const EVENTS = {
  LOGS: {
    NEW: 'LOGS_NEW',
  },
};
