import { GraphQLBoolean, GraphQLObjectType } from 'graphql';
import { offsetToCursor } from 'graphql-relay';

import LogConnection from '../LogConnection';
import { pubSub, EVENTS } from '../../../../common/subscriptions';

const LogNewPayloadType = new GraphQLObjectType({
  name: 'LogNewPayload',
  fields: () => ({
    logEdge: {
      type: LogConnection.edgeType,
      resolve: ({ log }) => ({
        cursor: offsetToCursor(log.id),
        node: log,
      }),
    },
  }),
});

const logNewSubscription = {
  type: LogNewPayloadType,
  subscribe: () => pubSub.subscribe(EVENTS.LOGS.NEW),
};

export default logNewSubscription;
