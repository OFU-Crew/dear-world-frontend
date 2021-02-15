import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from './Logo';

const ColorWrapper = styled.div`
  background-color: ${props => props.theme.backgroundColor.header};
  margin-bottom: 20px;
`;

const MobileLeftLogoHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  position: relative;
`;

const Title = styled.div`
  font-size: 20px;
  margin-left: 12px;

  color: ${props => props.theme.color.messageDescription};
`;

const LeftWrapper = styled.span`
  display: flex;
  position: relative;

  a {
    text-decoration: none;
    color: ${props => props.theme.color.dark};
  }
`;

interface DesktopHeaderProps {
  theme: string;
}

const MobileLeftLogoHeader: FC<DesktopHeaderProps> = props => {
  return (
    <ColorWrapper>
      <MobileLeftLogoHeaderWrapper>
        <LeftWrapper>
          <Link to="/">
            <Logo theme={props.theme} isMessagePage />
          </Link>
          <Title>Dear world</Title>
        </LeftWrapper>
      </MobileLeftLogoHeaderWrapper>
    </ColorWrapper>
  );
};

export default MobileLeftLogoHeader;
