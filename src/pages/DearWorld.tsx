import React, { FC } from 'react';

import { Layout, MessageCard, MessagesFilterBar } from '../components';

interface DearWorldProps {}

const DearWorld: FC<DearWorldProps> = props => {
  return (
    <Layout>
      <MessagesFilterBar />
      <MessageCard />
    </Layout>
  );
};

export default DearWorld;
