import DataLoader from 'dataloader';
import { Types } from 'mongoose';

import * as AlgorithmLoader from '../modules/algorithm/AlgorithmLoader';
import * as UserLoader from '../modules/user/UserLoader';
import * as LogLoader from '../modules/log/LogLoader';

export type DataLoaderKey = string | object | Types.ObjectId;

export interface GraphQLDataloaders {
  UserLoader: DataLoader<DataLoaderKey, UserLoader.IUser>;
  AlgorithmLoader: DataLoader<DataLoaderKey, AlgorithmLoader.IAlgorithm>;
  LogLoader: DataLoader<DataLoaderKey, LogLoader.ILog>;
}

export { UserLoader, AlgorithmLoader, LogLoader };
