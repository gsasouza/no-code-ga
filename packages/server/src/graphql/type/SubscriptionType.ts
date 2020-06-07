import { GraphQLObjectType } from 'graphql';

import LogSubscriptions from '../modules/log/subscriptions';

export default new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    ...LogSubscriptions,
  },
});
