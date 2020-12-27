import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { THEME, useTheme } from '../hooks/useTheme';

interface HeaderProps {
  messageCount?: number;
}

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 20px;

  a {
    text-decoration: none;
  }

  ${({ theme }) => theme.media.mobile`
    display: flex;
    flex-direction: row;
    justify-content: center;
  `}
`;

const DesktopHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 1200px;
  max-width: 100%;
`;

const LeftWrapper = styled.span`
  display: flex;
  position: relative;

  a {
    text-decoration: none;
    color: ${props => props.theme.color.dark};
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 48px;
  height: 48px;
  margin-right: 17px;

  ${({ theme }) => theme.media.mobile`
    height: 80px
  `};
`;

const Menu = styled(NavLink)`
  width: 135px;
  height: 45px;
  border-radius: 9px;
  margin-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${props => props.theme.color.menu};

  &.selected {
    background: ${props => props.theme.backgroundColor.activeMenu};
    color: ${props => props.theme.color.activeMenu};
  }
`;

const RightWrapper = styled.span`
  display: flex;
  position: relative;
`;

const MessageSendButton = styled.button`
  width: 180px;
  height: 48px;
  background: ${props => props.theme.backgroundColor.sendButton};
  color: ${props => props.theme.color.sendButton};
  border: 0px;
  box-sizing: border-box;
  border-radius: 31.5px;
  outline: 0;
  cursor: pointer;

  i {
    margin-right: 10px;
  }

  &:hover {
    background: ${props => props.theme.backgroundColor.sendButtonHover};
    color: ${props => props.theme.color.sendButtonHover};
  }
`;

const Header: FC<HeaderProps> = props => {
  const [theme] = useTheme();

  return (
    <>
      <HeaderWrapper>
        <DesktopHeader>
          <LeftWrapper>
            <Link to="/">
              <LogoWrapper>
                <img
                  src={
                    theme === THEME.DARK ? 'logo-dark.svg' : 'logo-light.svg'
                  }
                />
              </LogoWrapper>
            </Link>
            <Menu exact to="/" activeClassName="selected">
              Dear, world
            </Menu>
            <Menu exact to="/cheering-map" activeClassName="selected">
              Cheering map
            </Menu>
            <Menu exact to="/about" activeClassName="selected">
              About
            </Menu>
          </LeftWrapper>
          <RightWrapper>
            <MessageSendButton>
              <i className="fa fa-plus"></i>
              Send Message
            </MessageSendButton>
          </RightWrapper>
        </DesktopHeader>
      </HeaderWrapper>
    </>
  );
};

export default Header;
