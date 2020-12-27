import React, { FC } from 'react';

import { Layout } from '../components';

interface DearWorldProps {}

const DearWorld: FC<DearWorldProps> = props => {
  return (
    <Layout>
      <div>Dear World</div>
    </Layout>
  );
};

export default DearWorld;
