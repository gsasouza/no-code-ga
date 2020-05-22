import { UserLoader, AlgorithmLoader, LogLoader } from './loaders';

export const getLoaders = dbConnection => ({
  UserLoader: UserLoader.getLoader(dbConnection),
  AlgorithmLoader: AlgorithmLoader.getLoader(dbConnection),
  LogLoader: LogLoader.getLoader(dbConnection),
});

export const dataloadersMiddleware = async (resolve, root, args, ctx, info) => {
  const dataloaders = getLoaders(ctx.dbConnection);
  return resolve(root, args, { ...ctx, dataloaders }, info);
};
