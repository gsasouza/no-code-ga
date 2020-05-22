import { GraphQLFloat, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { NodeInterface } from '../../interface/NodeInterface';

const LogType = new GraphQLObjectType({
  name: 'Log',
  description: 'Log data',
  fields: () => ({
    id: globalIdField('Log'),
    populationFitness: {
      type: GraphQLFloat,
    },
    fitness: {
      type: GraphQLFloat,
    },
  }),
  interfaces: () => [NodeInterface],
});

export default LogType;
