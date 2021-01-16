import React, { FC } from 'react';
import styled from 'styled-components';

import CountriesFilter from './CountriesFilter';
import MessageCount from './MessageCount';
import OrderingFilter from './OrderingFilter';

const Wrapper = styled.div`
  width: 100%;
  margin: 14px 0 26px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MessageFilterBar: FC = () => {
  return (
    <Wrapper>
      <span>
        <CountriesFilter />
        <OrderingFilter />
      </span>
      <span>
        <MessageCount />
      </span>
    </Wrapper>
  );
};

export default MessageFilterBar;
