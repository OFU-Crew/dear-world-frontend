import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { getCountriesCount } from '../api';
import { CheerRank, Layout, PixelMap } from '../components';
import { sizes } from '../constants';
import { useWindowDimensions } from '../hooks';
import { countriesCountSelector, countriesRankSelector } from '../store';

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
    grid-template-rows: 46vw auto;
    gap: 20px;
  `};
`;

const PixelMapWrapper = styled.div<{ isDesktop?: boolean }>`
  ${props =>
    props.isDesktop &&
    `
      height: 95%;
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

const CheeringMapTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin: 28px 36px;

  color: ${props => props.theme.color.menu};
`;

const AsyncCheerRank = () => {
  const ranking = useRecoilValue(countriesRankSelector);

  return <CheerRank countries={ranking} />;
};

const AsyncPixelMap = () => {
  const countries = useRecoilValue(countriesCountSelector);

  return <PixelMap countries={countries} />;
};

const CheeringMap = () => {
  const [width] = useWindowDimensions();
  const isDesktop = width > sizes.desktop;

  return (
    <Layout>
      {!isDesktop && <CheeringMapTitle>Cheering Map</CheeringMapTitle>}
      <CheeringMapWrapper>
        <Suspense fallback={<div />}>
          <PixelMapWrapper isDesktop={isDesktop}>
            <AsyncPixelMap />
          </PixelMapWrapper>
        </Suspense>
        <Suspense fallback={<div />}>
          <AsyncCheerRank />
        </Suspense>
      </CheeringMapWrapper>
    </Layout>
  );
};

export default CheeringMap;
