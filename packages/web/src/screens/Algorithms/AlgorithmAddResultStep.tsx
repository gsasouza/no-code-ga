import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';
import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
`;

const AlgorithmAddResultStep = () => {
  return (
    <Container>
      <Typography.Title level={4}>
        Seu algoritimo foi criado, dentro de instantes você poderá acompanhar o resultado
      </Typography.Title>
      <Link to="/dashboard/algorithms">
        <Button type="link">Voltar para a lista de algoritimos</Button>
      </Link>
    </Container>
  );
};

export default AlgorithmAddResultStep;
