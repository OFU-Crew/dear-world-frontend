import React, { Fragment, FunctionComponent, useCallback } from 'react';
import { Flip, toast } from 'react-toastify';
import styled from 'styled-components';

import { THEME, useTheme } from '../hooks';
import CancelButton from './common/CancelButton';

const Wrapper = styled.div`
  padding: 40px 38px 48px 38px;
  border-radius: 20px;
  background-color: ${props => props.theme.backgroundColor.card};
`;

export const Header = styled.div`
  border-radius: 8px 8px 0 0;
  display: flex;
  margin-bottom: 28px;
  justify-content: space-between;
`;

export const HeaderText = styled.div`
  font-size: 24px;
  color: ${props => props.theme.color.messageNickname};
  align-self: center;
`;

export const Content = styled.div`
  display: flex;
`;

export const ConfirmationButtons = styled.div`
  display: flex;
  justify-content: center;
`;

export const Message = styled.input`
  width: 400px;
  font-size: 18px;
  height: 39px;
  text-align: center;
  border: 0;
  border-radius: 7px;
  background-color: #f4f7ff;
`;

const CopyButton = styled.button`
  width: 73px;
  height: 41px;
  margin-left: 12px;
  border: 0;
  border-radius: 7px;
  background-color: #e5eafe;
  color: #212e5a;

  &:hover {
    background-color: #20d7d7;
    color: #fff;
  }
`;

interface ConfirmationModalProps {
  messageId?: number;
  hide?: () => void;
}

const ShareLinkBox: FunctionComponent<ConfirmationModalProps> = props => {
  const url = `https://dear-world.live/messages/${props.messageId}`;
  const [theme] = useTheme();
  const onClick = useCallback(() => {
    navigator.clipboard.writeText(url).then(() => {
      toast('Successfully copied link to clipboard.', {
        style: {
          borderRadius: '16px',
          padding: '13px',
          backgroundColor: theme === THEME.LIGHT ? '#fff' : '#212E5A',
          color: theme === THEME.LIGHT ? '#212E5A' : '#D6DDFB',
        },
        autoClose: 3000,
        closeButton: false,
        position: 'bottom-left',
        transition: Flip,
      });
    });
  }, []);

  return (
    <Fragment>
      <Wrapper>
        <Header>
          <HeaderText>Share</HeaderText>
          <CancelButton size={5} onClick={props.hide!} />
        </Header>
        <Content>
          <Message disabled value={url} />
          <ConfirmationButtons>
            <CopyButton onClick={onClick}>Copy</CopyButton>
          </ConfirmationButtons>
        </Content>
      </Wrapper>
    </Fragment>
  );
};

export default ShareLinkBox;
