import { graphql } from 'react-relay';
import { LogNewSubscriptionResponse } from './__generated__/LogNewSubscription.graphql';
import { ConnectionHandler, ROOT_ID } from 'relay-runtime';

const LogNewSubscription = graphql`
  subscription LogNewSubscription {
    LogNew {
      logEdge {
        cursor
        node {
          id
          fitness
          bestIndividual
          populationFitness
        }
      }
    }
  }
`;

export default {
  subscription: LogNewSubscription,
  variables: {},
  onCompleted: () => {
    console.log('completed');
  } /* Subscription established */,
  onError: error => {
    console.log('error', error);
  } /* Subscription errored */,
  onNext: (response: LogNewSubscriptionResponse | null | undefined) => {} /* Subscription payload received */,
  updater: store => {
    const logEdge = store.getRootField('LogNew').getLinkedRecord('logEdge');
    const storeProxy = store.get(ROOT_ID);
    const conn = ConnectionHandler.getConnection(storeProxy, 'AlgorithmResults_logs');
    conn?.setValue(conn?.getValue('count')+ 1, 'count');
    if (!conn) return;
    const edge = ConnectionHandler.createEdge(store, conn, logEdge.getLinkedRecord('node'), 'LogEdge');
    console.log(logEdge, edge);
    ConnectionHandler.insertEdgeBefore(conn, edge);
  },
};
