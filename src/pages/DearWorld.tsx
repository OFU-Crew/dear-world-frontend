import React, { FC } from 'react';

import { Layout, MessageFilterBar, MessageList } from '../components';
import { useSearchParams } from '../hooks';

const DearWorld: FC = () => {
  useSearchParams();

  return (
    <Layout>
      <MessageFilterBar />
      <MessageList />
    </Layout>
  );
};

export default DearWorld;
