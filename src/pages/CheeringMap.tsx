import React, { Suspense, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { getCountriesCount } from '../api';
import { CheerRank, Layout, PixelMap } from '../components';
import { sizes } from '../constants';
import { useWindowDimensions } from '../hooks';
import { countriesCountState, countriesRankState } from '../store';

const CheeringMapWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  padding: 16px 0 20px 0;

  ${({ theme }) => theme.media.desktop`
    grid-template-columns: 65% auto;
    gap: 100px;
  `};

  ${({ theme }) => theme.media.mobile`
    grid-template-rows: 300px auto;
    gap: 20px;
  `};
`;

const CheeringMapTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin: 28px 36px;

  color: ${props => props.theme.color.menu};
`;

const AsyncCheerRank = () => {
  const ranking = useRecoilValue(countriesRankState);

  return <CheerRank countries={ranking} />;
};

const AsyncPixelMap = () => {
  const countries = useRecoilValue(countriesCountState);

  return <PixelMap countries={countries} />;
};

const CheeringMap = () => {
  const [width] = useWindowDimensions();

  return (
    <Layout>
      {width < sizes.desktop && (
        <CheeringMapTitle>Cheering Map</CheeringMapTitle>
      )}
      <CheeringMapWrapper>
        <Suspense fallback={<div />}>
          <AsyncPixelMap />
        </Suspense>
        <Suspense fallback={<div />}>
          <AsyncCheerRank />
        </Suspense>
      </CheeringMapWrapper>
    </Layout>
  );
};

export default CheeringMap;
