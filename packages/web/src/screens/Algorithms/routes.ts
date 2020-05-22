import * as React from 'react';
import { prepareQuery } from '@gsasouza/relay';

export default [
  {
    path: path => `${path}/algorithms`,
    component: React.lazy(() => import('./AlgorithmList')),
    prepare: () => {
      const query = require('./__generated__/AlgorithmListQuery.graphql');
      const variables = {
        first: 20,
      };
      return prepareQuery(query, variables);
    },
  },
  {
    path: path => `${path}/algorithms/:id`,
    component: React.lazy(() => import('./AlgorithmDetail')),
    prepare: params => {
      console.log(params);
      const query = require('./__generated__/AlgorithmDetailQuery.graphql');
      const variables = {
        id: params.id,
      };
      return prepareQuery(query, variables);
    },
  },
];
