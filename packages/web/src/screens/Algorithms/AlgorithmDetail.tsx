import * as React from 'react';
import { Button } from 'antd';
import { ConnectionHandler, ROOT_ID } from 'relay-runtime';
import { PauseOutlined, CaretRightOutlined } from '@ant-design/icons';
import { PageHeader, Collapse, Input, Switch, Form } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { graphql } from 'react-relay';
import { usePreloadedQuery } from 'react-relay/hooks';
import { EditOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { AlgorithmDetailQuery } from './__generated__/AlgorithmDetailQuery.graphql';
import styled from 'styled-components';
import { useMutation, useSubscription } from 'relay-hooks/lib';
import LogNewSubscription from './subscriptions/LogNewSubscription';
import AlgorithmStartMutation from './mutations/AlgorithmStartMutation';

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

const AlgorithmDetail = ({ preloadedQuery }) => {
  const { id } = useParams();
  const history = useHistory();
  const { node, logs } = usePreloadedQuery<AlgorithmDetailQuery>(query, preloadedQuery);
  const [canEdit, toggleCanEdit] = React.useReducer(state => !state, false);
  useSubscription(LogNewSubscription());
  const [isRunning, setIsRunning] = React.useState(node?.status?.isRunning);
  const handleEdit = (_, e) => {
    e.stopPropagation();
    toggleCanEdit();
  };
  const data = formatData(logs);
  const [mutate] = useMutation(AlgorithmStartMutation, {});

  const handleStart = async () => {
    const response = await mutate({ variables: { input: { id } } });
    console.log(response);
  };
  return (
    <Form name="algorithm" layout="vertical" initialValues={{ name: node?.name }} onFinish={() => {}}>
      <PageHeader title={node?.name} onBack={history.goBack} />
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header="Resultados" key="1">
          <Row>
            <FitnessLabel>Fitness: {data[data.length - 1].fitness}</FitnessLabel>
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

          <ResponsiveContainer aspect={5}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <Line type="monotone" dataKey="fitness" stroke="#002140" dot={false} isAnimationActive={true} />
              <Line type="monotone" dataKey="populationFitness" stroke="#1890ff" dot={false} isAnimationActive={true} />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                type="number"
                label={<CustomLabel>Gerações</CustomLabel>}
                domain={['dataMin', 'dataMax']}
                padding={{ bottom: 20 }}
              />
              <YAxis domain={['auto', 'auto']} hide={true} />
              <Tooltip />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </Collapse.Panel>
        <Collapse.Panel
          header="Configurações"
          key="2"
          extra={
            <Switch checkedChildren={<EditOutlined />} unCheckedChildren={<EditOutlined />} onClick={handleEdit} />
          }
        >
          <Form.Item label="Nome" name="name">
            <Input disabled={!canEdit} />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </Form>
  );
};

const query = graphql`
  query AlgorithmDetailQuery($id: ID!) {
    logs(first: 100, algorithm: $id) @connection(key: "AlgorithmDetail_logs", filters: []) {
      count
      edges {
        node {
          fitness
          populationFitness
        }
      }
    }
    node(id: $id) {
      ... on Algorithm {
        id
        name
        setup {
          dataModel {
            name
            type
          }
          generateFunction
          testFunction
          populationSize
        }
        currentData {
          bestFitness
        }
        status {
          isRunning
        }
      }
    }
  }
`;

export default AlgorithmDetail;
