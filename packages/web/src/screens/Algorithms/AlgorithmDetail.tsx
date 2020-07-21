import * as React from 'react';
import { PageHeader, Collapse, Input, Switch, Form } from 'antd';
import { useHistory } from 'react-router-dom';
import { graphql } from 'react-relay';
import { usePreloadedQuery } from 'react-relay/hooks';
import { EditOutlined } from '@ant-design/icons';
import { AlgorithmDetailQuery } from './__generated__/AlgorithmDetailQuery.graphql';
import { useSubscription } from 'relay-hooks/lib';
import LogNewSubscription from './subscriptions/LogNewSubscription';
import AlgorithmResults from './AlgorithmResults';

const InnerDetail = ({ preloadedQuery }) => {
  const history = useHistory();
  const { node, ...data } = usePreloadedQuery<AlgorithmDetailQuery>(query, preloadedQuery);
  const [canEdit, toggleCanEdit] = React.useReducer(state => !state, false);

  const handleEdit = (_, e) => {
    e.stopPropagation();
    toggleCanEdit();
  };

  return (
    <Form name="algorithm" layout="vertical" initialValues={{ name: node?.name }} onFinish={() => {}}>
      <PageHeader title={node?.name} onBack={history.goBack} />
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header="Resultados" key="1">
          <AlgorithmResults query={data} node={node} />
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

const AlgorithmDetail = ({ preloadedQuery }) => {
  useSubscription(LogNewSubscription);
  return <InnerDetail preloadedQuery={preloadedQuery} />;
};

const query = graphql`
  query AlgorithmDetailQuery($id: ID!) {
    ...AlgorithmResults_query
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
        ...AlgorithmResults_algorithm
      }
    }
  }
`;

export default AlgorithmDetail;
