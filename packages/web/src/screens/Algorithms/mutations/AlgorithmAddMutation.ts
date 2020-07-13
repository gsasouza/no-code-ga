import { graphql } from 'react-relay';

const AlgorithmStartMutation = graphql`
  mutation AlgorithmAddMutation($input: AlgorithmAddInput!) {
    AlgorithmAdd(input: $input) {
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
