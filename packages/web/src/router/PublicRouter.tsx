import { LazyRouter, useScrollToTop } from '@gsasouza/ui';
import * as React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';

import { publicRoutes } from './routes';

const PublicRouter = () => {
  useScrollToTop();
  const { path } = useRouteMatch();

  return (
    <Switch>
      {publicRoutes.map(route => {
        return <LazyRouter {...route} path={route.path(path)} key={route.path(path)} exact />;
      })}
    </Switch>
  );
};

export default PublicRouter;
