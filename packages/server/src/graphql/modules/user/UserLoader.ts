import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';

import { Schema } from 'mongoose';

import { User as UserModel } from './UserModel';

export { IUser } from './UserModel';

export default class User {
  _id: Schema.Types.ObjectId;
  id: Schema.Types.ObjectId;
  name: string;
  email: string;
  picture: string;
  constructor(data) {
    this.id = data._id;
    this._id = data._id;
    this.name = data.name;
    this.email = data.email;
    this.picture = data.picture;
  }
}

export const getLoader = dbConnection =>
  new DataLoader(ids => mongooseLoader(UserModel(dbConnection), ids as string[]));

const viewerCanSee = () => true;

export const load = async (context, id) => {
  if (!id) return null;
  try {
    const data = await context.dataloaders.UserLoader.load(id);
    return viewerCanSee() ? new User(data) : null;
  } catch (err) {
    return null;
  }
};

export const clearCache = ({ dataloaders }, id) => {
  return dataloaders.UserLoader.clear(id.toString());
};

export const loadUsers = async (context, args) => {
  const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {};
  const users = UserModel(context.dbConnection)
    .find(where, { _id: 1 })
    .sort({ createdAt: -1 });
  return connectionFromMongoCursor({
    cursor: users,
    context,
    args,
    loader: load,
  });
};
