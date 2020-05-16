import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';

import {
  clearDbAndRestartCounters,
  connectMongoose,
  disconnectMongoose,
  createAlgorithm,
  getContext,
  createUser,
} from '../../../../../test/helpers';
import schema from '../../../schema';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

describe('Algorithm Type', () => {
  it('should get an algorithm', async () => {
    const user = await createUser();
    const algorithm = await createAlgorithm({ user });

    // language=GraphQL
    const query = `
      query Q($id: ID!) {
        algorithm: node(id: $id) {
          id
          ... on Algorithm {
            name
            user {
              id
            }
            setup {
              dataModel {
                name
                type
              }
              generateFunction
              testFunction
              populationSize
            }
          }
        }
      }
    `;

    const variables = {
      id: toGlobalId('Algorithm', algorithm._id),
    };

    const rootValue = {};
    const context = await getContext({ user });
    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data).toMatchSnapshot({
      algorithm: {
        id: expect.any(String),
        user: {
          id: expect.any(String),
        },
      },
    });
  });

  it('should get a list of algorithms', async () => {
    const user = await createUser();

    await createAlgorithm({ user });
    await createAlgorithm({ user });
    await createAlgorithm({ user });
    await createAlgorithm({ user });
    // language=GraphQL
    const query = `
      query Q {
        algorithms {
          edges {
            node {
              name
              user {
                id
              }
              setup {
                dataModel {
                  type
                  name
                }
                generateFunction
                testFunction
                populationSize
              }
            }
          }
        }
      }
    `;

    const variables = {};

    const rootValue = {};
    const context = await getContext({ user });
    const result = await graphql(schema, query, rootValue, context, variables);
    expect(result.data).toMatchSnapshot();
  });
});
