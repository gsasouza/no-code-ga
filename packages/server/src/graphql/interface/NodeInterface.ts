import { fromGlobalId, nodeDefinitions } from 'graphql-relay';

import { GraphQLContext } from '../../common/types';

import * as AlgorithmLoader from '../modules/algorithm/AlgorithmLoader';
import AlgorithmType from '../modules/algorithm/AlgorithmType';
import * as UserLoader from '../modules/user/UserLoader';
import UserType from '../modules/user/UserType';
import * as LogLoader from '../modules/log/LogLoader';
import LogType from '../modules/log/LogType';

const { nodeField, nodesField, nodeInterface } = nodeDefinitions(
  async (globalId, context: GraphQLContext) => {
    const { id, type } = fromGlobalId(globalId);
    if (type === 'Algorithm') return AlgorithmLoader.load(context, id);
    if (type === 'User') return UserLoader.load(context, id);
    if (type === 'Log') return LogLoader.load(context, id);
    return null;
  },
  obj => {
    if (obj instanceof UserLoader.default) return UserType;
    if (obj instanceof AlgorithmLoader.default) return AlgorithmType;
    if (obj instanceof LogLoader.default) return LogType;
    return null;
  },
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
export const NodesField = nodesField;
