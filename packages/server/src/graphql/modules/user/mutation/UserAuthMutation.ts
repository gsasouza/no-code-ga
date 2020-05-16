import axios from 'axios';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import * as UserLoader from '../UserLoader';
import { User } from '../UserModel';
import UserType from '../UserType';

export default mutationWithClientMutationId({
  name: 'AuthUser',
  inputFields: {
    token: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ token }, { dbConnection }) => {
    try {
      const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
      const user = await User(dbConnection).findOne({ email: data.email });
      if (user)
        return {
          token,
          meId: user._id,
          error: null,
        };
      const newUser = await new (User(dbConnection))({ ...data, role: 'user' }).save();
      return {
        token,
        meId: newUser._id,
        error: null,
      };
    } catch (err) {
      return {
        token: null,
        meId: null,
        error: 'Invalid token',
      };
    }
  },
  outputFields: {
    me: {
      type: UserType,
      resolve: ({ meId }, args, context) => {
        if (!meId) return null;
        return UserLoader.load(context, meId);
      },
    },
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
