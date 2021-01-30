import React, { Fragment, FunctionComponent, useCallback } from 'react';
import styled from 'styled-components';

import CancelButton from './common/CancelButton';

const Wrapper = styled.div`
  padding: 40px 38px 48px 38px;
  border-radius: 100px;
`;

export const Header = styled.div`
  border-radius: 8px 8px 0 0;
  display: flex;
  margin-bottom: 28px;
  justify-content: space-between;
`;

export const HeaderText = styled.div`
  font-size: 24px;
  color: #212e5a;
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
  const onClick = useCallback(() => {
    navigator.clipboard.writeText(url).then(function () {
      console.log('success');
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
