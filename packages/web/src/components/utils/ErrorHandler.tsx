import * as Sentry from '@sentry/browser';
import { Error } from '@styled-icons/boxicons-solid/Error';
import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #f8f8f8;
  height: 20rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ec1414;
`;

const Message = styled.h2`
  margin: 0;
`;

const ErrorIcon = styled(Error)`
  width: 4rem;
  margin: 0 1.5rem;
`;

class ErrorHandler extends React.Component<any, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state.hasError)
      return (
        <Wrapper>
          <ErrorIcon />
          <div>
            <Message>An error occurred :( </Message>
            <Message>Please try again.</Message>
          </div>
        </Wrapper>
      );
    return this.props.children;
  }
}

export default ErrorHandler;
