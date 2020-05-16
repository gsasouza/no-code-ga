import * as React from 'react';

export type TableHeader = {
  label: string;
};

export type TableColumn<T> = {
  header: TableHeader;
  property: string;
  renderRow?: (node: T) => React.ReactElement;
};

type Edge<T> = {
  cursor: string;
  node: T;
};

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: {
    count: number;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      endCursor: string;
      startCursor: string;
    };
    edges: Edge<T>[];
  };
  onRowClick?: (node: T) => void;
}
