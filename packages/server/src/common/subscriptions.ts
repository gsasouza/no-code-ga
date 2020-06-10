import {
  DynamoDBConnectionManager,
  DynamoDBEventStore,
  PubSub,
  DynamoDBSubscriptionManager,
  DynamoDBEventProcessor,
} from 'aws-lambda-graphql';
import { DynamoDB } from 'aws-sdk';

const dynamoDbClient = new DynamoDB.DocumentClient({});

export const eventProcessor = new DynamoDBEventProcessor({
  onError: err => console.log(err),

});
export const eventStore = new DynamoDBEventStore({ dynamoDbClient });
export const pubSub = new PubSub({ eventStore });
export const subscriptionManager = new DynamoDBSubscriptionManager({ dynamoDbClient });
export const connectionManager = new DynamoDBConnectionManager({
  dynamoDbClient,
  subscriptions: subscriptionManager,
});

export const EVENTS = {
  LOGS: {
    NEW: 'LOGS_NEW',
  },
};
