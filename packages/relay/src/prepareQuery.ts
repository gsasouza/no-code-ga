import { preloadQuery } from 'react-relay/hooks';

import environment from './Environment';

const prepareQuery = (query, variables = {}) => {
  return { query: preloadQuery(environment, query, variables) };
};

export default prepareQuery;
