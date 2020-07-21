import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useFragment } from 'react-relay/hooks';
import { PauseOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useMutation, graphql } from 'relay-hooks/lib';
import AlgorithmStartMutation from './mutations/AlgorithmStartMutation';
import { Button } from 'antd';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const GenerationLabel = styled.h4`
  text-align: center;
`;

const FitnessLabel = styled.h4`
  padding: 5px 10px;
  background-color: #1890ff;
  color: #ffffff;
  border-radius: 20px;
  text-align: center;
`;

const CustomLabel = styled.span`
  margin-top: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 2rem 1rem 1rem;
`;
const formatData = logs => {
  const { count } = logs;
  return logs.edges.map(({ node }, index) => {
    return {
      name: count - index + 1,
      ...node,
    };
  });
};

const algorithmFragment = graphql`
  fragment AlgorithmResults_algorithm on Algorithm {
    id
    status {
      isRunning
    }
    currentData {
      bestFitness
    }
  }
`;

const fragment = graphql`
  fragment AlgorithmResults_query on Query {
    logs(first: 500, algorithm: $id) @connection(key: "AlgorithmResults_logs", filters: []) {
      count
      edges {
        cursor
        node {
          id
          fitness
          bestIndividual
          populationFitness
        }
      }
    }
  }
`;

const ResultChart = ({ query }) => {
  const { logs } = useFragment(fragment, query);
  const data = formatData(logs);
  return (
    <ResponsiveContainer aspect={5}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <Line type="monotone" dataKey="fitness" name="Fitness" stroke="#002140" dot={false} isAnimationActive={false} />
        <Line
          type="monotone"
          dataKey="populationFitness"
          name="Fitness médio da População"
          stroke="#1890ff"
          dot={false}
          isAnimationActive={false}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          type="number"
          label={<CustomLabel>Gerações</CustomLabel>}
          domain={['dataMin', 'dataMax']}
          padding={{ bottom: 20 }}
        />
        <YAxis domain={[-5, 'auto']} hide={true} />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

const AlgorithmResults = ({ query, node }) => {
  const { currentData, status } = useFragment(algorithmFragment, node);
  const { logs } = useFragment(fragment, query);
  const { id } = useParams();
  const [isRunning, setIsRunning] = React.useState(status.isRunning);

  const [mutate] = useMutation(AlgorithmStartMutation, {});

  const handleStart = async () => {
    await mutate({ variables: { input: { id } } });
    setIsRunning(state => !state);
  };

  return (
    <>
      <Row>
        <FitnessLabel>Fitness: {logs.edges[0]?.node?.fitness || currentData?.bestFitness}</FitnessLabel>
        <GenerationLabel>Geração {logs?.count}</GenerationLabel>
        <Button
          type="primary"
          shape="round"
          icon={isRunning ? <PauseOutlined /> : <CaretRightOutlined />}
          onClick={handleStart}
        >
          {isRunning ? 'Pausar' : 'Iniciar'}
        </Button>
      </Row>

      <ResultChart query={query} />

      <div>
        <strong>
          <span>Melhor Indivíduo:</span>
        </strong>
        <br />
        <span>
          <pre>{logs.edges[0]?.node?.bestIndividual}</pre>
        </span>
      </div>
    </>
  );
};

export default AlgorithmResults;
