import React, { FC } from 'react';
import styled from 'styled-components';

import { THEME } from '../../hooks/useTheme';

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 48px;
  height: 48px;
  margin-right: 17px;

  span {
    display: none;
  }

  ${({ theme }) => theme.media.tablet`
    span {
        display: inline;
    }
  `};

  ${({ theme }) => theme.media.mobile`
    span {
        display: inline;
    }
  `};
`;

const MessageCountBadge = styled.span`
  width: 83px;
  height: 37px;
  padding: 6px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;

  box-sizing: border-box;
  border-radius: 19px;
  transform: translateY(-6px);

  border: ${props => `2px solid ${props.theme.color.message}`};
  color: ${props => props.theme.color.message};
  background: ${props => props.theme.backgroundColor.sendButton};
`;

interface LogoProps {
  theme: string;
  messageCount?: number;
}

const Logo: FC<LogoProps> = props => {
  return (
    <LogoWrapper>
      <img
        src={props.theme === THEME.DARK ? 'logo-dark.svg' : 'logo-light.svg'}
      />
      <MessageCountBadge>{`+${props.messageCount || 34.5}K`}</MessageCountBadge>
    </LogoWrapper>
  );
};

export default Logo;
