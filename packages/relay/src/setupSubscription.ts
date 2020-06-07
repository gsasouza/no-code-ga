import { SubscribeFunction, Observable } from 'relay-runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const websocketURL = 'wss://qi4dcv7dn5.execute-api.us-east-1.amazonaws.com/dev';

export const setupSubscription: SubscribeFunction = (request, variables) => {
  const query = request.text;

  const subscriptionClient = new SubscriptionClient(websocketURL, { lazy: true, reconnect: true }, null, []);

  const observable = subscriptionClient.request({ query: query!, variables });

  return Observable.from(observable);
};
