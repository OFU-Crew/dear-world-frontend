import React, { FC } from 'react';
import styled from 'styled-components';

import Header from './Header';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Layout: FC = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
