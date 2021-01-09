import React, { Suspense, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { getCountriesCount } from '../apis';
import { CheerRank, Layout, PixelMap } from '../components';
import { countriesCountState, countriesRankState } from '../modules/countries';

const CheeringMapWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;

  ${({ theme }) => theme.media.desktop`
    grid-template-columns: 65% auto;
    gap: 100px;
  `};

  ${({ theme }) => theme.media.mobile`
    grid-template-rows: 300px auto;
    gap: 20px;
  `};
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
  return (
    <Layout>
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
