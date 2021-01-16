import React, { FC } from 'react';

import { Layout, MessageCard, MessagesFilterBar } from '../components';
import { useSearchParams } from '../hooks';

interface DearWorldProps {}

const DearWorld: FC<DearWorldProps> = props => {
  useSearchParams();

  return (
    <Layout>
      <MessagesFilterBar />
      <MessageCard />
    </Layout>
  );
};

export default DearWorld;
