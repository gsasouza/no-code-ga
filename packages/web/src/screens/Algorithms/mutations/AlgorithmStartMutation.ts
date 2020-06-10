import { graphql } from 'react-relay';

const AlgorithmStartMutation = graphql`
  mutation AlgorithmStartMutation($input: AlgorithmStartInput!) {
    AlgorithmStart(input: $input) {
      error
      algorithmEdge {
        node {
          status {
            isRunning
          }
        }
      }
    }
  }
`;

export default AlgorithmStartMutation;
