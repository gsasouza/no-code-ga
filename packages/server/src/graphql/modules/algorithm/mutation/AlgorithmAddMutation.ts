import { GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import AlgorithmConnection from '../AlgorithmConnection';
import { AlgorithmLoader } from '../../../loaders';
import AlgorithmModel from '../AlgorithmModel';
import PopulationModel from '../../population/PopulationModel';
import { publishToQueue } from '../../../../common/aws';

const DataInputType = new GraphQLInputObjectType({
  name: 'DataInputType',
  fields: {
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    type: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
});

const SetupInputType = new GraphQLInputObjectType({
  name: 'SetupInputType',
  fields: {
    populationSize: {
      type: GraphQLNonNull(GraphQLInt),
    },
    generateFunction: {
      type: GraphQLNonNull(GraphQLString),
    },
    testFunction: {
      type: GraphQLNonNull(GraphQLString),
    },
    dataModel: {
      type: GraphQLNonNull(GraphQLList(DataInputType)),
    },
  },
});

export default mutationWithClientMutationId({
  name: 'AlgorithmAdd',
  inputFields: {
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    setup: {
      type: GraphQLNonNull(SetupInputType),
    },
  },
  mutateAndGetPayload: async ({ setup, name }, { dbConnection, user }) => {
    console.log(user);
    if (!user)
      return {
        algorithmId: null,
        error: 'UNAUTHORIZED',
      };
    try {
      const algorithm = await new (AlgorithmModel(dbConnection))({
        setup,
        name,
        user,
        status: {
          isRunning: true,
        },
        evolveConfig: {
          mutationRate: 15,
          mutationBaseRate: 15,
          mutationRateModifier: 1,
          generationsWithRateModifier: 0,
        },
      }).save();
      const { populationSize, generateFunction } = algorithm?.setup;
      const fn = new Function('position', `${generateFunction}; return generate(position);`);
      console.log(`${generateFunction}; return generate(position);`);

      const population = new Array(populationSize).fill(null).map((_, i) => fn(i));

      for await (const individual of population) {
        const document = await new (PopulationModel(dbConnection))({
          algorithm: algorithm._id,
          user: algorithm.user._id,
          fields: JSON.stringify(individual),
        }).save();
        await publishToQueue('avaliate', { populationId: document._id });
      }
      await publishToQueue('select', { algorithmId: algorithm._id });
      return {
        algorithmId: algorithm._id,
        error: null,
      };
    } catch (e) {
      return {
        algorithmId: null,
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
