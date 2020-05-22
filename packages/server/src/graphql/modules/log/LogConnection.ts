import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

import LogType from './LogType';

export default connectionDefinitions({
  name: 'Log',
  nodeType: LogType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
