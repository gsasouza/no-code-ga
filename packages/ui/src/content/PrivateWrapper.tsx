import * as React from 'react';
import styled from 'styled-components';

import Sidebar, { Props as SidebarProps } from './Sidebar';

const Main = styled.main`
  display: flex;
  min-height: 100vh;
  background-color: #fffef8;
  .loading-circle {
    background: ${props => props.theme.palette.accent};
  }
`;

const Content = styled.section`
  background-color: ${props => props.theme.palette.primary};
  flex: 1;
  border-radius: 50px;
  padding: 2rem;
  margin: 1rem 1rem 1rem 0;
  box-shadow: 7px 21px 55px -38px ${props => props.theme.palette.primary};
  display: flex;
  flex-direction: column;
`;

interface Props {
  sidebarProps?: SidebarProps;
}

const PrivateWrapper: React.FC<Props> = ({ children, sidebarProps }) => {
  return (
    <Main>
      <Sidebar {...sidebarProps} />
      <Content>{children}</Content>
    </Main>
  );
};

export default PrivateWrapper;
