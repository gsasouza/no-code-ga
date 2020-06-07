import * as React from 'react';
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

const GenerationLabel = styled.h2`
  text-align: center;
`;
const CustomLabel = styled.span`
  margin-top: 20px;
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
  console.log(id);
  const history = useHistory();
  const { node, logs } = usePreloadedQuery<AlgorithmDetailQuery>(query, preloadedQuery);
  const [canEdit, toggleCanEdit] = React.useReducer(state => !state, false);
  useSubscription(LogNewSubscription());
  const handleEdit = (_, e) => {
    e.stopPropagation();
    toggleCanEdit();
  };
  const data = formatData(logs);
  const [mutate] = useMutation(AlgorithmStartMutation);

  const handleStart = () => mutate({ variables: { input: { id } } });

  return (
    <Form name="algorithm" layout="vertical" initialValues={{ name: node?.name }} onFinish={() => {}}>
      <PageHeader title={node?.name} onBack={history.goBack} />
      <button onClick={handleStart}>MESSAGE</button>
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header="Resultados" key="1">
          <GenerationLabel>Geração {logs?.count}</GenerationLabel>
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
              <YAxis domain={['auto', 'auto']} />
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
    logs(first: 100, algorithm: $id) {
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
