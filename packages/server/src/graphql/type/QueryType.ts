import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs } from 'graphql-relay';

import { NodeField } from '../interface/NodeInterface';

import AlgorithmConnection from '../modules/algorithm/AlgorithmConnection';
import * as AlgorithmLoader from '../modules/algorithm/AlgorithmLoader';

import UserConnection from '../modules/user/UserConnection';
import * as UserLoader from '../modules/user/UserLoader';
import UserType from '../modules/user/UserType';
import * as LogLoader from '../modules/log/LogLoader';
import LogConnection from '../modules/log/LogConnection';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: NodeField,
    me: {
      type: UserType,
      resolve: (_, args, context) => {
        return context && context.user;
      },
    },
    users: {
      type: UserConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (_, args, context) => UserLoader.loadUsers(context, args),
    },
    algorithms: {
      type: AlgorithmConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (_, args, context) => AlgorithmLoader.loadAlgorithms(context, args),
    },
    logs: {
      type: LogConnection.connectionType,
      args: {
        ...connectionArgs,
        algorithm: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (_, args, context) => LogLoader.loadLogs(context, args),
    },
  }),
});
