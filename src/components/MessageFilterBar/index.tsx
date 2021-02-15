import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { sizes } from '../../constants';
import { useWindowDimensions } from '../../hooks';
import { countriesQueryState, countriesSelector } from '../../store';
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

interface MessageFilterBarProps {
  countriesQuery: string;
  orderingQuery: string;
}

const MessageFilterBar: FC<MessageFilterBarProps> = ({
  countriesQuery,
  orderingQuery,
}) => {
  const [width] = useWindowDimensions();
  const countries = useRecoilValue(countriesSelector);

  return width > sizes.desktop ? (
    <Wrapper>
      <span>
        <CountriesFilter
          countriesQuery={countriesQuery}
          orderingQuery={orderingQuery}
          countries={countries}
        />
        <OrderingFilter
          countriesQuery={countriesQuery}
          orderingQuery={orderingQuery}
        />
      </span>
      <span>
        <MessageCount />
      </span>
    </Wrapper>
  ) : (
    <Wrapper></Wrapper>
  );
};

export default MessageFilterBar;
