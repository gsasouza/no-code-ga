import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';

import {
  clearDbAndRestartCounters,
  connectMongoose,
  disconnectMongoose,
  createUser,
  getContext,
} from '../../../../../test/helpers';
import schema from '../../../schema';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

describe('User Type', () => {
  it('should get an user', async () => {
    const user = await createUser();
    // language=GraphQL
    const query = `
      query Q($id: ID!) {
        user: node(id: $id) {
          id
          ... on User {
            id
            name
            email
            profilePicture
          }
        }
      }
    `;

    const variables = {
      id: toGlobalId('User', user._id),
    };

    const rootValue = {};
    const context = await getContext();
    const result = await graphql(schema, query, rootValue, context, variables);
    expect(result.data).toMatchSnapshot({
      user: {
        id: expect.any(String),
      },
    });
  });

  it('should get a list of users user', async () => {
    await createUser();
    await createUser();
    await createUser();
    await createUser();
    // language=GraphQL
    const query = `
      query Q {
        users {
          edges {
            node {
              name
              email
              profilePicture
            }
          }
        }
      }
    `;

    const variables = {};

    const rootValue = {};
    const context = await getContext();
    const result = await graphql(schema, query, rootValue, context, variables);
    expect(result.data).toMatchSnapshot();
  });
});
