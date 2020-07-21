import { GraphQLObjectType } from 'graphql';
import { offsetToCursor } from 'graphql-relay';

import LogConnection from '../LogConnection';
import { pubSub, EVENTS } from '../../../../common/subscriptions';
import { withFilter } from 'aws-lambda-graphql';

const LogNewPayloadType = new GraphQLObjectType({
  name: 'LogNewPayload',
  fields: () => ({
    logEdge: {
      type: LogConnection.edgeType,
      resolve: ({ log }) => {
        return {
          cursor: offsetToCursor(log.id),
          node: log,
        };
      },
    },
  }),
});

const logNewSubscription = {
  type: LogNewPayloadType,
  subscribe: withFilter(pubSub.subscribe(EVENTS.LOGS.NEW), (rootValue, args: { type }) => {
    console.log(rootValue);
    return true;
  }),
};

export default logNewSubscription;
