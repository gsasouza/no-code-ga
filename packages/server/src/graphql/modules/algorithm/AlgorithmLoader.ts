import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';

import { Schema } from 'mongoose';

import { AlgorithmModel, IAlgorithm } from './AlgorithmModel';

export { IAlgorithm } from './AlgorithmModel';

export default class Algorithm {
  _id: Schema.Types.ObjectId;
  id: Schema.Types.ObjectId;
  name: string;
  setup: IAlgorithm['setup'];
  user: Schema.Types.ObjectId;
  constructor(data) {
    this.id = data._id;
    this._id = data._id;
    this.name = data.name;
    this.setup = data.setup;
    this.user = data.user;
  }
}

export const getLoader = dbConnection =>
  new DataLoader(ids => mongooseLoader(AlgorithmModel(dbConnection), ids as string[]));

const viewerCanSee = context => context.user;

export const load = async (context, id) => {
  if (!id) return null;
  try {
    const data = await context.dataloaders.AlgorithmLoader.load(id);
    return viewerCanSee(context) ? new Algorithm(data) : null;
  } catch (err) {
    return null;
  }
};

export const clearCache = ({ dataloaders }, id) => {
  return dataloaders.AlgorithmLoader.clear(id.toString());
};

export const loadAlgorithms = async (context, args) => {
  const defaultWhere = { user: context.user._id };
  const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') }, ...defaultWhere } : defaultWhere;
  const algorithms = AlgorithmModel(context.dbConnection)
    .find(where, { _id: 1 })
    .sort({ createdAt: -1 });
  return connectionFromMongoCursor({
    cursor: algorithms,
    context,
    args,
    loader: load,
  });
};
