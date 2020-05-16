import { PrivateScreenLoading } from '@gsasouza/ui';
import React from 'react';

interface Props {
  component: React.ComponentType;
  loadingComponent?: React.ComponentType<any> | null;
  loadingProps?: any;
}

const LazyComponent = ({
  component: Component,
  loadingProps,
  loadingComponent: Loading = PrivateScreenLoading,
}: Props) => {
  return (
    <React.Suspense fallback={Loading && <Loading {...loadingProps} />}>
      <Component />
    </React.Suspense>
  );
};

export default LazyComponent;
