import mongoose from 'mongoose';

import AlgorithmModel, { IAlgorithm } from '../src/graphql/modules/algorithm/AlgorithmModel';
import { User, IUser } from '../src/graphql/modules/user/UserModel';

export const createUser = (payload: Partial<IUser> = {}) => {
  const count = 1
  return new (User(mongoose.connections[0]))({
    name: `User#${count}`,
    username: `user#${count}`,
    password: 'password',
    email: `user#${count}@domain.com`,
    role: 'user',
    ...payload,
  }).save();
};

export const createAlgorithm = async (payload: Partial<IAlgorithm> = {}) => {
  const count = global.__COUNTERS__.getValue('Algorithm');
  global.__COUNTERS__.increase('Algorithm');
  const user = await createUser();
  return new (AlgorithmModel(mongoose.connections[0]))({
    name: `Algorithm#${count}`,
    user,
    setup: {
      populationSize: 10,
      generateFunction: '(x) => x',
      testFunction: '(x) => x',
      dataModel: [{ name: 'prop', type: 'Number' }],
    },
    ...payload,
  }).save();
};
