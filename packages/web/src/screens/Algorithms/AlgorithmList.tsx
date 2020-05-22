import * as React from 'react';
import { Table, Space, PageHeader } from 'antd';
import { graphql } from 'react-relay';
import { useHistory } from 'react-router-dom';
import { usePreloadedQuery, usePaginationFragment } from 'react-relay/hooks';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { AlgorithmListPaginationQuery } from './__generated__/AlgorithmListPaginationQuery.graphql';

const AlgorithmList = ({ preloadedQuery }) => {
  const history = useHistory();
  const query = usePreloadedQuery(AlgorithmListQuery, preloadedQuery);
  const { data } = usePaginationFragment<AlgorithmListPaginationQuery, any>(fragment, query);
  const dataSource = (data.algorithms?.edges || []).map(({ node }) => ({
    ...node,
    bestFitness: node.currentData.bestFitness,
    populationSize: node.setup.populationSize,
    isRunning: node.status.isRunning,
  }));
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'População',
      dataIndex: 'populationSize',
      key: 'populationSize',
    },
    {
      title: 'Fitness',
      dataIndex: 'bestFitness',
      key: 'fitness',
      render: text => (
        <Space size="middle">
          <span>{Number.parseFloat(text).toFixed(2)}</span>
        </Space>
      ),
    },
    {
      title: 'Rodando',
      dataIndex: 'isRunning',
      key: 'isRunning',
      render: value => {
        return <Space size="middle">{value ? <CheckCircleOutlined /> : <CloseCircleOutlined />}</Space>;
      },
    },
    {
      title: 'Ações',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => history.push(`/dashboard/algorithms/${record.id}`)}>Ver detalhes</a>
          <a>Remover</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageHeader onBack={undefined} title="Algoritmos" />
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

const fragment = graphql`
  fragment AlgorithmList_equipments on Query
    @argumentDefinitions(first: { type: Int }, after: { type: String }, search: { type: String })
    @refetchable(queryName: "AlgorithmListPaginationQuery") {
    algorithms(first: $first, after: $after, search: $search)
      @connection(key: "AlgorithmList_algorithms", filters: ["search"]) {
      count
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      edges {
        cursor
        node {
          id
          name
          status {
            isRunning
          }
          setup {
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
  }
`;

const AlgorithmListQuery = graphql`
  query AlgorithmListQuery($first: Int, $after: String, $search: String) {
    ...AlgorithmList_equipments @arguments(first: $first, after: $after, search: $search)
  }
`;

export default AlgorithmList;
