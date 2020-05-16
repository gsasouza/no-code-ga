import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import * as React from 'react';
import { Clickable, DialogProps } from 'reakit';
import styled from 'styled-components';

const Header = styled.header`
  width: 100%;
  margin: -2rem -2rem 0;
  padding: 0.5rem 2rem;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  margin: 0.5rem auto 0.5rem 0;
`;

const CloseIcon = styled(CloseOutline)`
  color: rgba(0, 0, 0, 0.6);
  width: 1.5rem;
`;

const ModalTitle: React.FC<DialogProps> = ({ children, hide }) => {
  return (
    <Header>
      <Title>{children}</Title>
      <Clickable as="div" onClick={hide}>
        <CloseIcon />
      </Clickable>
    </Header>
  );
};

export default ModalTitle;
