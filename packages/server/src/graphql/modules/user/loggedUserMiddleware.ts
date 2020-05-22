import axios from 'axios';

import User from './UserModel';

const loggedUserMiddleware = async (resolve, root, args, ctx, info) => {
  const header = ctx?.event?.headers?.authorization || ctx?.event?.headers?.Authorization;
  if (!header) return resolve(root, args, ctx, info);
  try {
    const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${header}`);
    if (!data?.email) return resolve(root, args, ctx, info);

    const user = await User(ctx.dbConnection).findOne({ email: data.email });

    return resolve(root, args, { ...ctx, user }, info);
  } catch (e) {
    console.log(e);
    return resolve(root, args, ctx, info);
  }
};

export default loggedUserMiddleware;
