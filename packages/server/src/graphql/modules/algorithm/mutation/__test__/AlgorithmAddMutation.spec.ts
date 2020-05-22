import { graphql } from 'graphql';
import {
  clearDbAndRestartCounters,
  connectMongoose,
  disconnectMongoose,
  getContext,
  createUser,
} from '../../../../../../test/helpers';
import schema from '../../../../schema';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

describe('Algorithm Add Mutation', () => {
  it('should add an algorithm', async () => {
    const user = await createUser();

    // language=GraphQL
    const query = `
      mutation M($name: String!, $setup: SetupInputType!) {
        AlgorithmAdd(input: { name: $name, setup: $setup }) {
          error
          algorithmEdge {
            cursor
            node {
              id
              name
              setup {
                populationSize
                generateFunction
                testFunction
                dataModel {
                  name
                  type
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      name: 'algorithm',
      setup: {
        populationSize: 10,
        generateFunction: 'return position',
        testFunction: 'return position',
        dataModel: [
          {
            name: 'value',
            type: 'number',
          },
        ],
      },
    };

    const rootValue = {};
    const context = await getContext({ user });
    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data).toMatchSnapshot({
      AlgorithmAdd: {
        algorithmEdge: {
          cursor: expect.any(String),
          node: {
            id: expect.any(String),
          },
        },
      },
    });
  });

  it('should not add an algorithm if user is not logged in', async () => {
    // language=GraphQL
    const query = `
      mutation M($name: String!, $setup: SetupInputType!) {
        AlgorithmAdd(input: { name: $name, setup: $setup }) {
          error
          algorithmEdge {
            cursor
            node {
              id
              name
              setup {
                populationSize
                generateFunction
                testFunction
                dataModel {
                  name
                  type
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      name: 'algorithm',
      setup: {
        populationSize: 10,
        generateFunction: 'return position',
        testFunction: 'return position',
        dataModel: [
          {
            name: 'value',
            type: 'number',
          },
        ],
      },
    };

    const rootValue = {};
    const context = await getContext();
    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data).toMatchSnapshot();
  });
});
