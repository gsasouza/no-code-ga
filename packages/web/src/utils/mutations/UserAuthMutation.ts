import { graphql } from 'react-relay';

export const UserAuthMutation = graphql`
  mutation UserAuthMutation($input: AuthUserInput!) {
    UserAuth(input: $input) {
      error
      token
      me {
        id
        name
      }
    }
  }
`;
