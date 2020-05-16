import * as React from 'react';
import styled from 'styled-components';

import { PrivateWrapper } from '../content';

const Wrapper = styled.div`
  a > div {
    color: transparent;
  }
`;

const PrivateScreenLoading = () => {
  return (
    <Wrapper>
      <PrivateWrapper></PrivateWrapper>
    </Wrapper>
  );
};

export default PrivateScreenLoading;
