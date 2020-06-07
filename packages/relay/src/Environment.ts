import invariant from 'invariant';
import {
  ConnectionHandler,
  Environment,
  HandlerInterface,
  Network,
  RecordSource,
  Store,
  ViewerHandler,
} from 'relay-runtime';

import executeFunction from './cacheHandler';
import { setupSubscription } from './setupSubscription';

const network = Network.create(executeFunction, setupSubscription);

const source = new RecordSource();
const store = new Store(source);

function RelayDefaultHandlerProvider(handle: string): HandlerInterface {
  switch (handle) {
    case 'connection':
      return ConnectionHandler;
    case 'viewer':
      return ViewerHandler;
  }
  invariant(false, 'RelayDefaultHandlerProvider: No handler provided for `%s`.', handle);
}

const env = new Environment({
  network,
  store,
  handlerProvider: RelayDefaultHandlerProvider,
});

export default env;
