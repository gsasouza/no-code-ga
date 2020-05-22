import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutation';
import AlgorithmMutations from '../modules/algorithm/mutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...AlgorithmMutations,
  }),
});
