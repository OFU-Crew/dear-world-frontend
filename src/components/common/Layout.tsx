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
  max-width: 1240px;
  width: 100%;
  min-width: 1000px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;

  ${({ theme }) => theme.media.mobile`
    margin: 0 auto;
    width: 100%;
    min-width: 200px;
    padding: 0 20px 20px 20px;
    box-sizing: border-box;
  `};
`;

interface LayoutProps {
  isMessagePage?: boolean;
}

const Layout: FC<LayoutProps> = ({ isMessagePage, children }) => {
  return (
    <LayoutWrapper>
      <Header isMessagePage={isMessagePage} />
      <Main>{children}</Main>
    </LayoutWrapper>
  );
};

export default Layout;
