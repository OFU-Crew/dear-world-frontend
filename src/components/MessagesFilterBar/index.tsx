import React, { FC, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { countriesSelector } from '../../store';
import Dropdown from '../common/Dropdown';

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

const CountriesFilter: FC = () => {
  const countries = useRecoilValue(countriesSelector);

  return <Dropdown type="countries" items={countries} />;
};

const MessageFilterBar: FC = () => {
  return (
    <Wrapper>
      <span>
        <Suspense
          fallback={
            <Dropdown
              type="countries"
              items={[{ id: 1, fullName: 'Whole world' }]}
            />
          }
        >
          <CountriesFilter />
        </Suspense>

        <Dropdown
          type="ordering"
          items={[
            { id: 1, fullName: 'Recent' },
            { id: 2, fullName: 'Weekly HOT' },
          ]}
        />
      </span>
      <span>
        <MessageCount>100,000</MessageCount>
        <MessageUnit>Messages</MessageUnit>
      </span>
    </Wrapper>
  );
};

export default MessageFilterBar;
