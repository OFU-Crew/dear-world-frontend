import React, { FC } from 'react';

import { Layout, MessageFilterBar, MessageList } from '../components';

const DearWorld: FC = () => {
  return (
    <Layout>
      <MessageFilterBar />
      <MessageList />
    </Layout>
  );
};

export default DearWorld;
