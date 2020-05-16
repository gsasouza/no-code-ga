import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

import AlgorithmType from './AlgorithmType';

export default connectionDefinitions({
  name: 'Algorithm',
  nodeType: AlgorithmType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
