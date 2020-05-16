import DataLoader from 'dataloader';
import { Types } from 'mongoose';

import * as AlgorithmLoader from '../modules/algorithm/AlgorithmLoader';
import * as UserLoader from '../modules/user/UserLoader';

export type DataLoaderKey = string | object | Types.ObjectId;

export interface GraphQLDataloaders {
  UserLoader: DataLoader<DataLoaderKey, UserLoader.IUser>;
  AlgorithmLoader: DataLoader<DataLoaderKey, AlgorithmLoader.IAlgorithm>;
}

export { UserLoader, AlgorithmLoader };
