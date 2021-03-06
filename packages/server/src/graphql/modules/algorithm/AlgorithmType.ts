import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { NodeInterface } from '../../interface/NodeInterface';
import UserType from '../user/UserType';

const DataModelType = new GraphQLObjectType({
  name: 'DataModel',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: obj => obj.name,
    },
    type: {
      type: GraphQLString,
      resolve: obj => obj.type,
    },
  }),
});

const SetupType = new GraphQLObjectType({
  name: 'Setup',
  description: 'Setup data',
  fields: () => ({
    populationSize: {
      type: GraphQLInt,
      resolve: obj => obj.populationSize,
    },
    generateFunction: {
      type: GraphQLString,
      resolve: obj => obj.generateFunction,
    },
    testFunction: {
      type: GraphQLString,
      resolve: obj => obj.testFunction,
    },
    dataModel: {
      type: GraphQLList(DataModelType),
      resolve: obj => obj.dataModel,
    },
  }),
});

const StatusType = new GraphQLObjectType({
  name: 'Status',
  description: 'Status data',
  fields: () => ({
    isRunning: {
      type: GraphQLBoolean,
      resolve: obj => obj.isRunning || false,
    },
  }),
});

const CurrentDataType = new GraphQLObjectType({
  name: 'CurrentData',
  description: 'Current data',
  fields: () => ({
    bestFitness: {
      type: GraphQLFloat,
      resolve: obj => obj.bestFitness,
    },
    population: {
      type: GraphQLString,
      resolve: obj => obj.population,
    },
  }),
});

const AlgorithmType = new GraphQLObjectType({
  name: 'Algorithm',
  description: 'Algorithm data',
  fields: () => ({
    id: globalIdField('Algorithm'),
    name: {
      type: GraphQLString,
      resolve: obj => obj.name,
    },
    user: {
      type: UserType,
      resolve: (obj, _, context) => context.dataloaders.UserLoader.load(obj.user),
    },
    setup: {
      type: SetupType,
      resolve: obj => obj.setup,
    },
    status: {
      type: StatusType,
      resolve: obj => obj.status,
    },
    currentData: {
      type: CurrentDataType,
      resolve: obj => obj.currentData,
    },
  }),
  interfaces: () => [NodeInterface],
});

export default AlgorithmType;
