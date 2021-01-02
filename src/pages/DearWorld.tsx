import React, { FC } from 'react';

import { Layout } from '../components';
import MessageCard from '../components/MessageCard';

interface DearWorldProps {}

const DearWorld: FC<DearWorldProps> = props => {
  return (
    <Layout>
      <MessageCard />
    </Layout>
  );
};

export default DearWorld;
