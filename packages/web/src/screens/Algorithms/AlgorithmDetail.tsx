import * as React from 'react';
import { PageHeader, Collapse, Input, Switch, Form } from 'antd';
import { useHistory } from 'react-router-dom';
import { graphql } from 'react-relay';
import { usePreloadedQuery } from 'react-relay/hooks';
import { EditOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { AlgorithmDetailQuery } from './__generated__/AlgorithmDetailQuery.graphql';

const formatData = logs => {
  const { count } = logs;
  return logs.edges.map(({ node }, index) => ({
    name: count - logs.edges?.length + index,
    ...node,
  }));
};

const AlgorithmDetail = ({ preloadedQuery }) => {
  const history = useHistory();
  const { node, logs } = usePreloadedQuery<AlgorithmDetailQuery>(query, preloadedQuery);
  const [canEdit, toggleCanEdit] = React.useReducer(state => !state, false);

  const handleEdit = (_, e) => {
    console.log(e);
    e.stopPropagation();
    toggleCanEdit();
  };
  const data = formatData(logs);
  console.log(data)
  return (
    <Form name="algorithm" layout="vertical" initialValues={{ name: node?.name }} onFinish={() => {}}>
      <PageHeader title={node?.name} onBack={history.goBack} />
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header="Resultados" key="1">
          <ResponsiveContainer aspect={5}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <Line type="monotone" dataKey="fitness" stroke="#002140" dot={false} isAnimationActive={true} />
              <Line type="monotone" dataKey="populationFitness" stroke="#1890ff" dot={false} isAnimationActive={true} />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" type="number" tickCount={logs?.count} />
              <YAxis domain={[0, 'auto']} />
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
    logs(first: 1000, algorithm: $id) {
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
