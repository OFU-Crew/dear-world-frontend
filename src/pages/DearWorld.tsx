import React, { FC } from 'react';

import { Layout, MessageCard, MessageFilterBar } from '../components';
import { useSearchParams } from '../hooks';

const DearWorld: FC = () => {
  useSearchParams();

  return (
    <Layout>
      <MessageFilterBar />
      <MessageCard />
    </Layout>
  );
};

export default DearWorld;
