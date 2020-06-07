import { graphql } from 'react-relay';

const LogNewSubscription = graphql`
  subscription LogNewSubscription {
    LogNew {
      logEdge {
        cursor
        node {
          id
          fitness
          populationFitness
        }
      }
    }
  }
`;

export default () => ({
  subscription: LogNewSubscription,
  variables: {},
  onCompleted: () => {
    console.log('completed');
  } /* Subscription established */,
  onError: error => {
    console.log('error', error);
  } /* Subscription errored */,
  onNext: response => {
    console.log('resp', response);
  } /* Subscription payload received */,
});
