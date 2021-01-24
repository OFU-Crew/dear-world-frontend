import React, { FC, Suspense } from 'react';

import { Layout, MessageFilterBar, MessageList } from '../components';
import { useSearchParams } from '../hooks';

const DearWorld: FC = () => {
  const [countriesQuery, orderingQuery] = useSearchParams();

  return (
    <Layout>
      <Suspense fallback={<div />}>
        <MessageFilterBar
          countriesQuery={countriesQuery}
          orderingQuery={orderingQuery}
        />
        <MessageList
          countriesQuery={countriesQuery}
          orderingQuery={orderingQuery}
        />
      </Suspense>
    </Layout>
  );
};

export default DearWorld;
