import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';

import { Schema } from 'mongoose';

import { LogModel } from './LogModel';
import { fromGlobalId } from 'graphql-relay';

export { ILog } from './LogModel';

export default class Log {
  _id: Schema.Types.ObjectId;
  id: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  algorithm: Schema.Types.ObjectId;
  fitness: number;
  populationFitness: number;
  constructor(data) {
    this.id = data._id;
    this._id = data._id;
    this.user = data.user;
    this.algorithm = data.algorithm;
    this.populationFitness = data.populationFitness;
    this.fitness = data.fitness;
  }
}

export const getLoader = dbConnection => new DataLoader(ids => mongooseLoader(LogModel(dbConnection), ids as string[]));

const viewerCanSee = () => true;

export const load = async (context, id) => {
  if (!id) return null;
  try {
    const data = await context.dataloaders.LogLoader.load(id);
    return viewerCanSee() ? new Log(data) : null;
  } catch (err) {
    return null;
  }
};

export const clearCache = ({ dataloaders }, id) => {
  return dataloaders.LogLoader.clear(id.toString());
};

export const loadLogs = async (context, args) => {
  const where = { user: context.user._id, algorithm: fromGlobalId(args.algorithm).id };
  const logs = LogModel(context.dbConnection)
    .find(where, { _id: 1 })
    .sort({ createdAt: 1 });

  return connectionFromMongoCursor({
    cursor: logs,
    context,
    args,
    loader: load,
  });
};
