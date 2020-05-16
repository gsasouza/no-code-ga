// import { AnimatePresence, motion } from 'framer-motion';

import * as React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';

const Wrapper = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${media.lessThan('medium')`
    > img {
      width: calc(100% - 2rem) !important;
    }
  `}
`;

const Logo = styled.img`
  width: 24rem;
`;

interface Props {
  logo?: any;
}

const LoadingScreen: React.FC<Props> = ({ logo }) => {
  return (
    <Wrapper>
      <Logo src={logo} />
    </Wrapper>
  );
};

export default LoadingScreen;
