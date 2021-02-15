import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import ThemeButton from '../ThemeButton';
import Logo from './Logo';

const ColorWrapper = styled.div`
  background-color: ${props => props.theme.backgroundColor.header};
`;

const DesktopHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1240px;
  width: 100%;
  min-width: 1000px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
`;

const LeftWrapper = styled.span`
  display: flex;
  position: relative;

  a {
    text-decoration: none;
    color: ${props => props.theme.color.dark};
  }
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

const Divider = styled.span`
  width: 10px;
  height: 42px;
  margin-top: 4px;
  border-right: 1px solid black;
`;

interface DesktopHeaderProps {
  theme: string;
}

const DesktopHeader: FC<DesktopHeaderProps> = props => {
  return (
    <ColorWrapper>
      <DesktopHeaderWrapper>
        <LeftWrapper>
          <Link to="/">
            <Logo theme={props.theme} />
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
          <ThemeButton />
        </RightWrapper>
      </DesktopHeaderWrapper>
    </ColorWrapper>
  );
};

export default DesktopHeader;
