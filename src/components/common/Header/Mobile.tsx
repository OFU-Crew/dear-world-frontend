import React, { FC } from 'react';
import styled from 'styled-components';

import Logo from './Logo';

const MobileHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 200px;
  padding: 20px;
  box-sizing: border-box;
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
}

const MobileHeader: FC<DesktopHeaderProps> = props => {
  return (
    <MobileHeaderWrapper>
      <LeftWrapper />
      <Logo theme={props.theme} />
      <RightWrapper />
    </MobileHeaderWrapper>
  );
};

export default MobileHeader;
