import React, { FC, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { messagesCountState } from '../../store';
import CountriesFilter from './CountriesFilter';
import OrderingFilter from './OrderingFilter';

const Wrapper = styled.div`
  width: 100%;
  margin: 14px 0 26px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MessageCount = styled.span`
  font-size: 26px;
  font-weight: bold;
  margin-right: 8px;

  color: ${props => props.theme.color.messageCount};
`;

const MessageUnit = styled.span`
  font-size: 25px;
`;

const AsyncMessagesFilterBar: FC = () => {
  const messagesCount = useRecoilValue(messagesCountState({ countryCode: '' }));

  return (
    <Wrapper>
      <span>
        <CountriesFilter />
        <OrderingFilter />
      </span>
      <span>
        <MessageCount>{messagesCount}</MessageCount>
        <MessageUnit>Messages</MessageUnit>
      </span>
    </Wrapper>
  );
};

const MessagesFilterBar: FC = () => {
  return (
    <Suspense fallback={<div />}>
      <AsyncMessagesFilterBar />
    </Suspense>
  );
};

export default MessagesFilterBar;
