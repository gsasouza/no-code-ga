import React from 'react';

import AppRouter from './router/AppRouter';
import Providers from './utils/Providers';

type Props = {};

const App = ({}: Props) => {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
};

export default App;
