import axios from 'axios';
import { graphql } from 'graphql';

import {
  clearDbAndRestartCounters,
  connectMongoose,
  disconnectMongoose,
  createUser,
  getContext,
} from '../../../../../../test/helpers';
import schema from '../../../../schema';

import { User } from '../../UserModel';

jest.mock('axios');

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

describe('Auth User', () => {
  it('should add user to database if it doesnt exist ', async () => {
    axios.get.mockResolvedValue({
      data: {
        email: 'email@domain.com',
        name: 'name',
        picture: 'picture',
      },
    });
    // language=GraphQL
    const query = `
      mutation M($token: String!) {
        UserAuth(input: { token: $token }) {
          error
          token
          me {
            name
            email
            profilePicture
          }
        }
      }
    `;

    const variables = {
      token: 'VALID_TOKEN',
    };

    const rootValue = {};
    const context = await getContext();
    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data).toMatchSnapshot();
    const users = await User(context.dbConnection).find({});

    expect(users.length).toBe(1);
  });

  it('should not add user to database if it exists ', async () => {
    await createUser({ email: 'email@domain.com' });

    axios.get.mockResolvedValue({
      data: {
        email: 'email@domain.com',
        name: 'name',
        picture: 'picture',
      },
    });
    // language=GraphQL
    const query = `
      mutation M($token: String!) {
        UserAuth(input: { token: $token }) {
          error
          token
          me {
            name
            email
            profilePicture
          }
        }
      }
    `;

    const variables = {
      token: 'VALID_TOKEN',
    };

    const rootValue = {};
    const context = await getContext();
    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data).toMatchSnapshot();
    const users = await User(context.dbConnection).find({});
    expect(users.length).toBe(1);
  });

  it('should not auth an user with an invalid token', async () => {
    axios.get.mockResolvedValue(() => {
      throw 'Invalid token';
    });
    // language=GraphQL
    const query = `
      mutation M($token: String!) {
        UserAuth(input: { token: $token }) {
          error
          token
          me {
            name
            email
            profilePicture
          }
        }
      }
    `;

    const variables = {
      token: 'INVALID_TOKEN',
    };

    const rootValue = {};
    const context = await getContext();
    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data).toMatchSnapshot();
    const users = await User(context.dbConnection).find({});
    expect(users.length).toBe(0);
  });
});
