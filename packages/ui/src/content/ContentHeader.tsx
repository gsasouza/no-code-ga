import { ArrowBack } from '@styled-icons/boxicons-regular/ArrowBack';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.palette.primary};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Actions = styled.nav`
  display: flex;
  align-items: center;
  > * {
    margin: 0 1rem;
  }
`;

const BackIcon = styled(ArrowBack)`
  width: 35px;
  margin-right: 1rem;
  cursor: pointer;
  transition: color 0.3s;
  color: ${props => props.theme.palette.primary};
  &:hover {
    stroke: ${props => props.theme.palette.primary};
    color: ${props => props.theme.palette.secondary};
  }
`;

interface Props {
  title: string;
  backAction?: () => void;
}

const ContentHeader: React.FC<Props> = ({ title, children, backAction }) => {
  return (
    <Container>
      <Helmet>
        <title>{title + ' - Sancathon'}</title>
      </Helmet>
      <Row>
        {backAction && <BackIcon onClick={backAction} />}
        <Title>{title}</Title>
      </Row>
      <Actions>{children}</Actions>
    </Container>
  );
};

export default ContentHeader;
