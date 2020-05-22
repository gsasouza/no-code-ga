import * as React from 'react';

export default [
  {
    path: path => `${path}`,
    component: React.lazy(() => import('./Home')),
  },
];
