import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Logo from './Logo';

const MobileHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 1200px;
  max-width: 100%;
  padding: 20px;
  position: relative;
`;

const LeftWrapper = styled.span`
  display: flex;
  position: relative;
`;

const RightWrapper = styled.span`
  display: flex;
  position: relative;
`;

interface DesktopHeaderProps {
  theme: string;
  messageCount: number;
}

const MobileHeader: FC<DesktopHeaderProps> = props => {
  return (
    <MobileHeaderWrapper>
      <LeftWrapper />
      <Logo theme={props.theme} messageCount={props.messageCount} />
      <RightWrapper />
    </MobileHeaderWrapper>
  );
};

export default MobileHeader;
