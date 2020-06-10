import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import AlgorithmConnection from '../AlgorithmConnection';
import { AlgorithmLoader } from '../../../loaders';
import AlgorithmModel from '../AlgorithmModel';
import PopulationModel from '../../population/PopulationModel';
import { handleRestart } from '../../../../evolutionaryAlgorithm/selectPopulation/handleSelect';

export default mutationWithClientMutationId({
  name: 'AlgorithmStart',
  inputFields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ id }, { dbConnection, user }) => {
    try {
      const algorithm = await AlgorithmModel(dbConnection)
        .findOne({ _id: fromGlobalId(id).id, user: user._id })
        .lean();

      if (algorithm.status.isRunning) {
        await AlgorithmModel(dbConnection)
          .findOneAndUpdate({ _id: fromGlobalId(id).id, user: user._id }, { status: { isRunning: false } })
          .lean();
        return {
          error: null,
        };
      }
      await AlgorithmModel(dbConnection)
        .findOneAndUpdate({ _id: fromGlobalId(id).id, user: user._id }, { status: { isRunning: true } })
        .lean();
      const population = await PopulationModel(dbConnection)
        .find({ algorithm: algorithm._id, user: user._id })
        .lean();

      await handleRestart(population, algorithm);
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
