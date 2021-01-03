import React, { FC } from 'react';
import styled from 'styled-components';

import Header from './Header';

const LayoutWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 1200px;
  max-width: 100%;
  height: 100%;
  padding: 20px;
  position: relative;
`;

const Layout: FC = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      <Main>{children}</Main>
    </LayoutWrapper>
  );
};

export default Layout;
