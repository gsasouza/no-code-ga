import { LazyRouter } from '@gsasouza/ui';
import * as React from 'react';
import { useHistory, useRouteMatch, Switch } from 'react-router-dom';
import { Skeleton } from 'antd';

import PrivateContent from '../components/content/PrivateContent';
import { isLoggedIn } from '../utils/security';
import { privateRoutes } from './routes';

const PublicRouter = () => {
  const [isLoading, setLoading] = React.useState(true);
  const history = useHistory();
  const { path } = useRouteMatch();

  React.useEffect(() => {
    (async () => {
      if (!(await isLoggedIn())) return history.push('/');
      return setLoading(false);
    })();
  }, [history]);

  if (isLoading) return <Skeleton />;

  return (
    <PrivateContent>
      <Switch>
        {privateRoutes.map(route => {
          return (
            <LazyRouter {...route} path={route.path(path)} key={route.path(path)} exact loadingComponent={Skeleton} loadingProps={{ active: true }} />
          );
        })}
      </Switch>
    </PrivateContent>
  );
};

export default PublicRouter;
