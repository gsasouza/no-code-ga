import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import AlgorithmConnection from '../AlgorithmConnection';
import { AlgorithmLoader } from '../../../loaders';
import { SNS } from '../../../../common/aws';

export default mutationWithClientMutationId({
  name: 'AlgorithmStart',
  inputFields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ id }, { dbConnection, user }) => {
    try {
      SNS.publish(
        {
          Message: JSON.stringify({
            algorithmId: fromGlobalId(id).id,
          }),
          TopicArn: 'arn:aws:sns:us-east-1:444098062489:create',
        },
        err => {
          console.log(err);
          console.log('ping');
        },
      );

      return {
        error: null,
      };
    } catch (e) {
      return {
        error: e,
      };
    }
  },
  outputFields: {
    algorithmEdge: {
      type: AlgorithmConnection.edgeType,
      resolve: async ({ algorithmId }, args, context) => {
        if (!algorithmId) return null;
        const algorithm = await AlgorithmLoader.load(context, algorithmId);
        if (!algorithm) return null;
        return {
          node: algorithm,
          cursor: toGlobalId('Algorithm', algorithm._id.toString()),
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
