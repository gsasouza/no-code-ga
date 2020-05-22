import { LazyComponent } from '@gsasouza/ui';
import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const AppRouter = () => (
  <Router>
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch>
        <Route path="/dashboard">
          <LazyComponent component={React.lazy(() => import('./PrivateRouter'))} loadingComponent={null} />
        </Route>
        <Route path="/">
          <LazyComponent component={React.lazy(() => import('./PublicRouter'))} loadingComponent={null} />
        </Route>
      </Switch>
    </AnimatePresence>
  </Router>
);

export default AppRouter;
