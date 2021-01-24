import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { THEME } from '../../../hooks';
import { messageCountAtom, parsedMessageCountSelector } from '../../../store';

const LogoWrapper = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 48px;
  height: 48px;
  margin-right: 17px;

  span {
    display: none;
  }

  ${({ theme }) => theme.media.mobile`
    margin: 0px;
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
}

const Logo: FC<LogoProps> = props => {
  const messageCount = useRecoilValue(parsedMessageCountSelector);

  return (
    <LogoWrapper>
      <img
        src={
          props.theme === THEME.DARK
            ? '/images/logo-dark.svg'
            : '/images/logo-light.svg'
        }
      />
      <MessageCountBadge>{messageCount}</MessageCountBadge>
    </LogoWrapper>
  );
};

export default Logo;
