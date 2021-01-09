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
  gap: 60px;

  ${({ theme }) => theme.media.desktop`
    grid-template-columns: 70% 310px;
  `};
  ${({ theme }) => theme.media.tablet`
  grid-template-rows: 400px auto;
`};
  ${({ theme }) => theme.media.mobile`
  grid-template-rows: 300px auto;
`};
`;

const PixelMapWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

// const data = [
//   {
//     country: {
//       id: 0,
//       code: 'US',
//       fullName: 'United States',
//       emojiUnicode: '🇺🇸',
//     },
//     messageCount: 2321,
//     likeCount: 0,
//     population: 0,
//     level: 1,
//   },
//   {
//     country: {
//       id: 0,
//       code: 'ES',
//       fullName: 'Spain',
//       emojiUnicode: '🇪🇸',
//     },
//     messageCount: 44242,
//     likeCount: 0,
//     population: 0,
//     level: 4,
//   },
//   {
//     country: {
//       id: 0,
//       code: 'KR',
//       fullName: 'South Korea',
//       emojiUnicode: '🇰🇷',
//     },
//     messageCount: 1231231,
//     likeCount: 0,
//     population: 0,
//     level: 5,
//   },
//   {
//     country: {
//       id: 0,
//       code: 'NZ',
//       fullName: 'New Zealand',
//       emojiUnicode: '🇳🇿',
//     },
//     messageCount: 344343,
//     likeCount: 0,
//     population: 0,
//     level: 3,
//   },
//   {
//     country: {
//       id: 0,
//       code: 'IN',
//       fullName: 'India',
//       emojiUnicode: '🇮🇳',
//     },
//     messageCount: 23231,
//     likeCount: 0,
//     population: 0,
//     level: 2,
//   },
//   {
//     country: {
//       id: 0,
//       code: 'RU',
//       fullName: 'Russian Federation',
//       emojiUnicode: '🇷🇺',
//     },
//     messageCount: 431,
//     likeCount: 0,
//     population: 0,
//     level: 1,
//   },
// ];

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
        <PixelMapWrapper>
          <Suspense fallback={<div />}>
            <AsyncPixelMap />
          </Suspense>
        </PixelMapWrapper>
        <Suspense fallback={<div />}>
          <AsyncCheerRank />
        </Suspense>
      </CheeringMapWrapper>
    </Layout>
  );
};

export default CheeringMap;
