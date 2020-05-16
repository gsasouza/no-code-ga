import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { relayEnvironment } from '@gsasouza/relay';

import React from 'react';
import ReactDOM from 'react-dom';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import App from './App';

import './styles.less';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <RelayEnvironmentProvider environment={relayEnvironment}>
    <App />
  </RelayEnvironmentProvider>,
  rootEl,
);
